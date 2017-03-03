import React, { Component } from 'react';

class Controller extends Component {
	render() {
		return <div className="c-controller">{this.props.children}</div>
	}
}

export default Controller;