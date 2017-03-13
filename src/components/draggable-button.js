import React, { Component } from 'react';
import { routerShape } from 'react-router';

import Draggable from './base/draggable'


class DraggableButton extends Draggable {
	static contextTypes = {
		router : routerShape
	};

	render() {
		return  <button className={'c-button-icon o-controller-side-nav__button'
		+ (this.state.isActive ? ' is-active' : '' )
		+ (this.props.hideAt === this.context.router.getCurrentLocation().pathname ? ' u-hidden' : '' )
		}
					onTouchStart={this.handleDragStart.bind(this)}
					onTouchMove={this.handleDrag.bind(this)}
					onTouchEnd={this.handleDragEnd.bind(this)}
					style={this.state.style}>
				<svg className="o-icon">
					<use xlinkHref={this.props.icon}/>
				</svg>
			</button>
	}
}

export default DraggableButton;