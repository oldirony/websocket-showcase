import React, { Component, Prop } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../../actions';
import ControllerCard from './controller-card';

class ControllerNavigation extends Component {
	componentWillMount() {
		this.props.fetchProjects();
	}

	render() {
		const projectsList = (this.props.projects || []).map((project, index) => {
			return <ControllerCard key={index} project={project} onlyVertical={true} />
		});
		return <div className="c-controller-navigation">
			<header className="c-controller-navigation__header">
				<img className="c-controller-navigation__logo" src="/assets/fp-logo.svg" alt=""/>
				Foolproof
			</header>
			<div className="o-layout-two-cols">
				{projectsList}
			</div>

			{this.props.children}
		</div>
	}
}


function mapStateToProps(state){
	return {projects: state.projects.all}
}

export default connect(mapStateToProps, { fetchProjects })(ControllerNavigation);