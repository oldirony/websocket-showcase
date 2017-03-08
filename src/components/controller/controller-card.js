import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';

import socket from '../../lib/socket';
import events from '../../lib/events';
import { routes } from '../../routes';
import { selectProject } from '../../actions';

import Loader from '../loader';

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


		socket.on(events.closeProjectClient, (data) => {
			this.translateDown();
		});
	}

	render() {
		return <div className="c-controller-card"
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

	translateUp(event, i = 1){
		event.persist();
		if(Math.abs(this.draggedDistance) >= window.innerHeight) {
			return this.openProject();
		}
		this.draggedDistance = this.draggedDistance - (10 + i > 1 ? 10 + i : 1);
		i++;

		this.move(this.draggedDistance);

		window.requestAnimationFrame(this.translateUp.bind(this, event, i))

	}

	translateDown(event, i = 1){
		event ? event.persist() : null;
		if(Math.abs(this.draggedDistance) <= 0) return;

		this.draggedDistance = (this.draggedDistance + i) < 0 ? this.draggedDistance + i : 0 ;
		i++;

		this.move(this.draggedDistance);

		window.requestAnimationFrame(this.translateDown.bind(this, event, i))

	}

	move(newPosition){
		this.setState({style : {
			transform: `translateY(${newPosition}px)`
		}});
	}

	openProject(){
		socket.emit(events.selectProject, this.props.project);
		this.props.selectProject(this.props.project);

		Loader.callLoader(()=>{
			this.context.router.push(routes.controllerCurrentProject);
		}, {
			circleCoordinates : {
				x : this.cardElem.offsetLeft + this.cardElem.scrollWidth / 2,
				y : -100
			}
		});
	}

	static hasGotScrollThreshold(draggedDistance, event){
		return Math.abs(draggedDistance) > event.nativeEvent.target.closest('.c-controller-card').scrollHeight / 4
	}


}

export default connect(null, { selectProject })(ControllerCard);