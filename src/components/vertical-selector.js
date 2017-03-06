import React, { Component } from 'react';

class VerticalSelector extends Component {
	componentWillMount(){

	}

	renderOptions() {
		return this.props.options.map(option => {
			return <div dataVal={option.value}>{option.label}</div>
		})
	}

	render() {
		return <nav className="c-vertical-selector">{this.renderOptions()}</nav>
	}
}

export default VerticalSelector;