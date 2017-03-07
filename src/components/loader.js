import React, { Component } from 'react';
import socket from '../lib/socket';
import events from '../lib/events';
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

class Loader extends Component {
	componentDidMount() {
		this.svg = Snap(this.loaderElem);

		socket.on(events.loadingClient, this.openCircle.bind(this));
	}

	render() {
		return <div className="c-loader o-top-element">
			<svg id="loader" ref={loaderElem => this.loaderElem = loaderElem}/>
		</div>
	}

	openCircle({id}) {
		this.circle = this.svg.circle(0, 0, 0);
		this.circle.attr({
			fill: "#fff",
			cx: window.innerWidth / 2
		});
		this.loaderElem.style.height = window.innerHeight;
		this.loaderElem.style.width = window.innerWidth;


		this.circle.animate(
			{
				r: window.innerWidth
			},
			300,
			() => {
				socket.emit(events.loadingComplete, {id});
				this.closeCircle();
			}
		)
	}


	closeCircle() {
		this.circle.animate({
			opacity: 0
		}, 300, ()=> {
			this.circle.attr({r: 0});
			this.loaderElem.style.height = this.loaderElem.style.width = 0
		})
	}

	static callLoader(callback, extraData = {}){
		const id = Math.random();
		socket.emit(events.loading, {id, ...extraData});

		socket.on(events.loadingCompleteClient, (data)=>{
			if(data.id === id) {
				callback();
				socket.off(events.loading);
			}
		});
	}
}

export default Loader;