import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectProject } from '../actions';
import socket from '../lib/socket';
import events from '../lib/events';


import ShowcaseProject from '../components/showcase-project';


class ShowcaseLanding extends Component {
	componentWillMount() {
		this.props.selectProject(null);

		socket.on(events.connect, function(data) {
			socket.emit('join', 'Showcase connected');
		});

		socket.on(events.selectProjectClient, (data) => {
			this.props.selectProject(data);
		});
	}

	renderCurrentProject(){
		if(!this.props.currentProject) return <div>Waiting for a project...</div>;

		return <ShowcaseProject {...this.props.currentProject} />;
	}

	render() {
		return <div className="c-showcase-landing">
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