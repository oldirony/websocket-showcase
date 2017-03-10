import React, { Component } from 'react';
import {routerShape} from 'react-router';
import socket from '../../lib/socket';
import events from '../../lib/events';
import {routes} from '../../routes';


import ShowcaseProject from './showcase-project';

console.log();

class ShowcaseLanding extends Component {
	static contextTypes = {
		router : routerShape
	};

	componentWillMount() {
		// this.props.selectProject(null);

		socket.on(events.connect, function(data) {
			socket.emit('join', 'Showcase connected');
		});

		socket.on(events.selectProjectClient, (data) => {

			this.context.router.push(routes.showcase + '/project/' + data.id);
			// this.props.selectProject(data);
			// console.log('can');
		});

	}

	renderCurrentProject(){
		if(!this.props.children) return <div className="c-showcase-landing__waiting-message">Waiting for a project...</div>;

		return this.props.children;
	}

	render() {
		return <div className="c-showcase-landing">
			{this.renderCurrentProject()}
		</div>
	}
}


export default ShowcaseLanding;