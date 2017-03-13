import React, { Component } from 'react';

class Scrollable extends Component {
	render() {
		return <div className="o-scrollable">
			{this.props.contents.map(content => content)}
		</div>
	}
}

export default Scrollable;