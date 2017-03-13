import React, { Component } from 'react';

import clientEvents from '../lib/client-events';
import mediator from '../lib/mediator';

import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

class Dropper extends Component {
	componentDidMount() {
		this.svg = Snap(this.dropperElem);

		mediator.on(clientEvents.dragging, this.showDropper.bind(this));
		mediator.on(clientEvents.draggingComplete, this.hideDropper.bind(this));
	}

	render() {
		return <div className="c-dropper o-top-element o-top-element--low-level">
			<svg id="dropper" ref={dropperElem => this.dropperElem = dropperElem}/>
		</div>
	}


	showDropper(cx, cy, r) {
		if(!this.dropperElem) return;

		cx = cx || window.innerWidth * 8/9;
		cy = cy || -window.innerWidth / 12;
		r =  r || window.innerWidth / 6;

		this.circle = this.svg.circle(0, 0, 0);
		this.circle.attr({
			fill: "rgba(0,0,0,0.5)",
			cx,
			cy
		});
		this.dropperElem.style.height = window.innerWidth / 2;
		this.dropperElem.style.width = window.innerWidth;

		this.circle.animate(
			{ r },
			200,
			mina['easeinout']
		)
	}

	hideDropper(){
		if(!this.dropperElem) return;


		this.circle.animate(
			{r: 0},
			200,
			mina['easeinout'],
			()=>{
				this.dropperElem.style.height =0;
				this.dropperElem.style.width =0;
			}
		)
	}
}

export default Dropper;