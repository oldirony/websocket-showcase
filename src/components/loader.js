import React, { Component } from 'react';
import socket from '../lib/socket';
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

class Loader extends Component {
	componentDidMount() {
		this.svg = Snap(this.loaderElem);
	}

	render() {
		return <div className="c-loader o-top-element">
			<svg id="loader" ref={loaderElem => this.loaderElem = loaderElem}/>
		</div>
	}

	openCircle(callback) {
		const bigCircle = this.svg.circle(0, 0, 0);
		bigCircle.attr({
			fill: "#fff",
			cx: window.innerWidth / 2
		});
		this.loaderElem.style.height = window.innerHeight;
		this.loaderElem.style.width = window.innerWidth;


		bigCircle.animate(
			{
				r: window.innerWidth
			},
			800,
			(callback || function(){})()
		)
	}
}

export default Loader;