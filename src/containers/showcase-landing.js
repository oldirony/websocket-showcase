import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectProject } from '../actions';
import socket from '../lib/socket';
import events from '../lib/events';


class ShowcaseLanding extends Component {
	componentWillMount() {
		socket.on(events.connect, function(data) {
			socket.emit('join', 'Showcase connected');
		});

		socket.on(events.selectProjectClient, (data) => {
			this.props.selectProject(data);
		});
	}

	renderCurrentProject(){
		if(!this.props.currentProject) return <div>no project specified</div>;

		return <div>
			<h1>{this.props.currentProject.title}</h1>
			<p>{this.props.currentProject.description}</p>
		</div>
	}

	render() {
		return <div className="c-showcase-landing">
			<h1>Showcase landing</h1>

			{this.renderCurrentProject()}
		</div>
	}
}

function mapStateToProps(state){
	return {
		currentProject : state.projects.current,
	}
}

export default connect(mapStateToProps, {selectProject})(ShowcaseLanding);