import React, { Component } from 'react';
import socket from '../lib/socket';
import events from '../lib/events';

class ShowcaseProject extends Component {
	constructor() {
		super();

		this.state = {};
	}

	componentWillMount(){
		socket.once(events.closeProjectClient, (data) => {
			this.setState({
				isClosing : true
			})
		});
	}

	render() {
		return <article className={'c-showcase-project' + (this.state.isClosing ? ' c-showcase-project--is-closing' : '')}>
				<h1>{this.props.title}</h1>
				<p>{this.props.description}</p>
		</article>
	}
}

export default ShowcaseProject;