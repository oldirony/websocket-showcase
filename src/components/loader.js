import React, { Component } from 'react';

import clientEvents from '../lib/client-events';
import mediator from '../lib/mediator';

import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

class Loader extends Component {
	componentDidMount() {
		this.svg = Snap(this.loaderElem);

		mediator.on(clientEvents.loading, this.openCircle.bind(this));
	}

	render() {
		return <div className="c-loader o-top-element">
			<svg id="loader" ref={loaderElem => this.loaderElem = loaderElem}/>
		</div>
	}

	openCircle({id, circleCoordinates}) {
		this.circle = this.svg.circle(window.innerWidth, 0, 0);
		this.circle.attr({
			fill: "#fff",
			cx: circleCoordinates ? circleCoordinates.x : window.innerWidth,
			cy: circleCoordinates ? circleCoordinates.y : 0
		});
		this.loaderElem.style.height = window.innerHeight;
		this.loaderElem.style.width = window.innerWidth;

		this.circle.animate(
			{
				r: window.innerWidth * 1.5
			},
			300,
			() => {
				mediator.emit(clientEvents.loadingComplete, {id});
				setTimeout(this.closeCircle.bind(this, id), 150);
			}
		)
	}

	closeCircle(id) {
		this.circle.animate({
			opacity: 0
		}, 150, ()=> {
			this.circle.attr({r: 0});
			this.loaderElem.style.height = this.loaderElem.style.width = 0;
			mediator.emit(clientEvents.loadingAnimationComplete, {id});
		})
	}

	static callLoader(extraData = {}, callback, endCallback){
		const id = Math.random();

		mediator.emit(clientEvents.loading, {id, ...extraData});

		mediator.on(clientEvents.loadingComplete, (data)=>{
			if(data.id === id && callback) callback();
		});

		mediator.on(clientEvents.loadingAnimationComplete, (data)=>{
			if(data.id === id && endCallback) endCallback();
		});
	}
}

export default Loader;