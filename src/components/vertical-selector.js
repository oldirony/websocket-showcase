import React, { Component } from 'react';
import Slick from 'react-slick';

class VerticalSelector extends Component {
	static settings = {
		dots: false,
		infinite: false,
		arrows: false,
		speed: 500,
		slidesToShow: 1,
		vertical: true,
		centerMode: true,
		verticalSwiping: true,
		slidesToScroll: 1,
		edgeFriction: 1,
		focusOnSelect: true
		// swipeToSlide : true
	};

	constructor(){
		super();

		this.state = {
			style: null
		}
	}

	componentWillMount(){

	}

	renderOptions() {
		return this.props.options.map((option, index) => {
			return <div className={'c-vertical-selector__option' + (index ? '' : ' is-active')} data-val={index} key={index}>{option}</div>
		})
	}

	render() {
		return <nav className="c-vertical-selector"
					onTouchStart={this.handleTouchStart.bind(this)}
					onTouchMove={this.handleTouch.bind(this)}
					onTouchEnd={this.handleTouchEnd.bind(this)}>
			<Slick {...VerticalSelector.settings}>
				{this.renderOptions()}
			</Slick>
		</nav>
	}

	handleTouchStart(event){
		this.isDragging = true;
	}

	handleTouch(event){
		if(event && this.isDragging) event.preventDefault();
	}

	handleTouchEnd(){
		this.isDragging = false;
	}


}

export default VerticalSelector;