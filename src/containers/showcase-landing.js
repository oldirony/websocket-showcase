import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects, selectProject } from '../actions';
import io from 'socket.io-client';

const socket = io.connect('http://192.168.10.109:8080');

class ShowcaseLanding extends Component {
	componentWillMount() {
		var self = this;

		socket.on('connect', function(data) {
			socket.emit('join', 'Hello World from client 2');
		});

		socket.on('selectProjectClient', function(data) {
			console.log('gned');
			self.props.selectProject();
		});
	}

	renderCurrentProject(){
		if(!this.props.currentProject) return <div>no project specified</div>;

		return <div>
			<h1>{this.props.currentProject.title}</h1>
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
		projects : state.projects.all
	}
}

export default connect(mapStateToProps, {selectProject})(ShowcaseLanding);