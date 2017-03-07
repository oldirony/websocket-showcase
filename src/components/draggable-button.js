import React, { Component } from 'react';
import {easing} from '../lib/positioning';

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
		event.preventDefault();

		this.isDragging = true;
		this.draggedDistance = this.draggedDistance || {x:0,y:0};
		this.previousTranslation = {...this.draggedDistance};
		this.initialDrag = {
			x: event.nativeEvent.touches[0].clientX,
			y: event.nativeEvent.touches[0].clientY
		};
		this.setState({isActive : true});
	}

	handleDrag(event){
		event.preventDefault();

		if(this.isDragging) {

			this.draggedDistance = {
				x: event.nativeEvent.touches[0].clientX - this.initialDrag.x + this.previousTranslation.x,
				y: event.nativeEvent.touches[0].clientY- this.initialDrag.y + this.previousTranslation.y
			};

			this.move(this.draggedDistance);

			this.lastTouch = event.nativeEvent.touches[0];
		}
	}


	handleDragEnd(event) {
		this.isDragging = false;

		if(!this.draggedDistance.x && !this.draggedDistance.y) {
			this.translateTo({x:-20, y:-50}, 150, () => {
				this.translateTo({x:0, y:0}, 150);
			});
		}

		if (this.isNearDropZone()){
			this.translateTo({x: this.draggedDistance.x*2, y: - window.innerHeight}, 500, this.props.action);

		} else {
			this.translateTo({x:0, y:0}, 300);
		}

		this.setState({isActive : false});
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
			return callback ? callback() : null;
		}

		window.requestAnimationFrame(this.translateTo.bind(this, {x, y}, duration, callback, initialTime))
	}

	isNearDropZone(){
		return this.lastTouch ? this.lastTouch.clientY < window.innerHeight / 3 : false;
	}
}

export default DraggableButton;