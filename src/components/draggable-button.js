import React, { Component } from 'react';
import {easing} from '../lib/positioning';
import Loader from './loader';

import clientEvents from '../lib/client-events';
import mediator from '../lib/mediator';


class DraggableButton extends Component {
	constructor() {
		super();
		this.state = {
			style: {}
		}
	}
	render() {
		return  <button className={'c-button-icon o-controller-side-nav__button' + (this.state.isActive ? ' is-active' : '' )}
					onTouchStart={this.handleDragStart.bind(this)}
					onTouchMove={this.handleDrag.bind(this)}
					onTouchEnd={this.handleDragEnd.bind(this)}
					style={this.state.style}>
				<svg className="o-icon">
					<use xlinkHref={this.props.icon}/>
				</svg>
			</button>
	}

	handleDragStart(event){
		this.isDragging = true;
		this.draggedDistance = this.draggedDistance || {x:0,y:0};
		this.previousTranslation = {...this.draggedDistance};
		this.initialDrag = {
			x: event.nativeEvent.touches[0].clientX,
			y: event.nativeEvent.touches[0].clientY
		};
		mediator.emit(clientEvents.dragging);
		this.setState({isActive : true});
	}

	handleDrag(event){
		if(this.isDragging) {

			this.draggedDistance = {
				x: event.nativeEvent.touches[0].clientX - 16 - this.initialDrag.x + this.previousTranslation.x,
				y: event.nativeEvent.touches[0].clientY - 16 - this.initialDrag.y + this.previousTranslation.y
			};

			this.move(this.draggedDistance);

			this.lastTouch = event.nativeEvent.touches[0];
		}
	}


	handleDragEnd() {
		this.isDragging = false;

		if(!this.draggedDistance.x && !this.draggedDistance.y) {
			this.translateTo({x:-20, y:-50}, 150, () => {
				this.translateTo({x:0, y:0}, 150);
			});
		}

		if (this.isNearDropZone()){

			const circleCoordinates = {
				x : window.innerWidth + (this.draggedDistance.x),
				y: -100
			};
			this.translateTo(
				{x: this.draggedDistance.x , y: -window.innerHeight},
				500,
				this.preAction.bind(this, {circleCoordinates})
			);
			mediator.emit(clientEvents.draggingComplete);


		} else {
			this.translateTo({x:0, y:0}, 200, ()=>{	mediator.emit(clientEvents.draggingComplete);});
		}

		this.setState({isActive : false});
	}


	preAction(extraData){
		Loader.callLoader(this.props.action, extraData);
	}

	move({x, y}){
		this.setState({style : {
			transform: `translate(${x}px,${y}px)`
		}});
	}

	translateTo({x, y}, duration, callback, initialTime = new Date().getTime()){
		const now = new Date().getTime();

		const timeDiff = now - initialTime;

		const easedValues = {
			x: easing(timeDiff / duration) * (x - this.draggedDistance.x),
			y: easing(timeDiff / duration) * (y - this.draggedDistance.y)
		};

		this.draggedDistance.x += easedValues.x;
		this.draggedDistance.y += easedValues.y;

		this.move(this.draggedDistance);

		if(timeDiff >= duration) {
			this.draggedDistance.y = this.draggedDistance.x = 0;
			return callback ? callback.call(this) : null;
		}

		window.requestAnimationFrame(this.translateTo.bind(this, {x, y}, duration, callback, initialTime))
	}

	isNearDropZone(){
		return this.lastTouch ? this.lastTouch.clientY < window.innerHeight / 3 : false;
	}
}

export default DraggableButton;