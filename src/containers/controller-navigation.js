import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions';
import ControllerCard from './controller-card';

class ControllerNavigation extends Component {
	componentWillMount() {
		this.props.fetchProjects();
	}

	render() {

		const projectsList = (this.props.projects || []).map((project, index) => {
			return <ControllerCard key={index} project={project} />
		});
		return <div className="c-controller-navigation">
			{projectsList}
		</div>
	}
}


function mapStateToProps(state){
	return {projects: state.projects.all}
}

export default connect(mapStateToProps, { fetchProjects })(ControllerNavigation);