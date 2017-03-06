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
			<header className="c-showcase-project__header">
				<h1 className="c-showcase-project__title">{this.props.title}</h1>
			</header>

			<div className="c-showcase-project__content">
				<div className="c-showcase-project__description">{this.props.description}</div>
				<div className="c-showcase-project__cover">
					<img src={this.props.coverImg} alt={this.props.title}/>
				</div>
			</div>
		</article>
	}
}

export default ShowcaseProject;