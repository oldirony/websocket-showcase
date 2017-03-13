import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';

import socket from '../../lib/socket';
import events from '../../lib/events';
import { routes } from '../../routes';
import { selectProject } from '../../actions';

import Loader from '../loader';

import Draggable from '../base/draggable';

class ControllerCard extends Draggable {

	static contextTypes = {
		router : routerShape
	};

	constructor(){
		super();
	}

	componentWillMount(){
		super.componentWillMount();

		socket.on(events.closeProjectClient, () => {
			setTimeout(()=>{this.translateTo({x:0, y:0}, 500)}, 700)
		});
	}

	render() {
		return <div className={"c-controller-card"
						+ (this.state.isActive ? ' is-active' : '' )}
					onTouchStart={this.handleDragStart.bind(this)}
					onTouchMove={this.handleDrag.bind(this)}
					onTouchEnd={this.handleDragEnd.bind(this)}
					ref={card=>this.cardElem = card}
					style={this.state.style}
		>
			<img src={this.props.project.coverImg} alt={this.props.project.title}/>
			<h3 className="c-controller-card__title">{this.props.project.title}</h3>
			<p className="c-controller-card__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
		</div>
	}

	preAction(){
		this.openProject();
	}

	openProject(){
		socket.emit(events.selectProject, this.props.project);
		this.props.selectProject(this.props.project);

		Loader.callLoader(()=>{
			this.context.router.push(routes.controllerProject);
		}, {
			circleCoordinates : {
				x : this.cardElem.offsetLeft + this.cardElem.scrollWidth / 2,
				y : -100
			}
		});
	}

	isNearDropZone(){
		return this.lastTouch ? this.lastTouch.clientY < window.innerHeight / 2 : false;
	}


}

export default connect(null, { selectProject })(ControllerCard);