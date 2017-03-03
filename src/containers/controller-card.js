import React, { Component } from 'react';
import socket from '../lib/socket';
import events from '../lib/events';

import { connect } from 'react-redux';

import { routerShape } from 'react-router';
import { routes } from '../routes';

import { selectProject } from '../actions';


class ControllerCard extends Component {

	static contextTypes = {
		router : routerShape
	};

	constructor(){
		super();

		this.state = {
			style: null
		}
	}

	componentWillMount(){
		socket.on(events.connect, (data) => {
			socket.emit(events.join, 'card connected');
		});
	}

	render() {
		return <div className="c-controller-card"
					onTouchStart={this.handleDragStart.bind(this)}
					onTouchMove={this.handleDrag.bind(this)}
					onTouchEnd={this.handleDragEnd.bind(this)}
					style={this.state.style}
		>
			<h3 className="c-controller-card__title">{this.props.project.title}</h3>
			<p className="c-controller-card__description">{this.props.project.description}</p>
		</div>
	}

	handleDragStart(event){
		this.isDragging = true;
		this.initialDrag = event.nativeEvent.touches[0].clientY;
	}

	handleDrag(event){
		if(this.isDragging) {
			this.draggedDistance = event.nativeEvent.touches[0].clientY - this.initialDrag;
			this.draggedDistance = this.draggedDistance < 0 ? this.draggedDistance : 0;
			this.move(this.draggedDistance)
		}
	}


	handleDragEnd(event) {
		this.isDragging = false;

		if (ControllerCard.hasGotScrollThreshold(this.draggedDistance, event)){
			this.translateUp(event)
		} else {
			this.translateDown(event)
		}
	}

	translateUp(event){
		event.persist();
		if(Math.abs(this.draggedDistance) >= window.innerHeight) {
			socket.emit(events.selectProject, this.props.project);
			this.props.selectProject(this.props.project);
			this.context.router.push(routes.controller + routes.controllerCurrentProject);
			return;
		}

		this.draggedDistance = this.draggedDistance - 10;
		this.move(this.draggedDistance);

		window.requestAnimationFrame(this.translateUp.bind(this, event))

	}

	translateDown(event){
		event.persist();
		if(Math.abs(this.draggedDistance) <= 0) return;

		this.draggedDistance = this.draggedDistance + 3 < 0 ? this.draggedDistance + 3 : 0 ;
		this.move(this.draggedDistance);

		window.requestAnimationFrame(this.translateDown.bind(this, event))

	}

	move(newPosition){
		this.setState({style : {
			transform: `translateY(${newPosition}px)`
		}});
	}

	static hasGotScrollThreshold(draggedDistance, event){
		return Math.abs(draggedDistance) > event.nativeEvent.target.closest('.c-controller-card').scrollHeight / 4
	}


}

export default connect(null, { selectProject })(ControllerCard);