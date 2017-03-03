import React, { Component } from 'react';

class ControllerCard extends Component {
	render() {
		return <div className="c-controller-card">
			<h3 className="c-controller-card__title">{this.props.title}</h3>
			<div className="c-controller-card__description">{this.props.description}</div>
		</div>
	}
}

export default ControllerCard;