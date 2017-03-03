import React, { Component } from 'react';
import { connect } from 'react-redux';

class ControllerProject extends Component {
	render() {
		if(!this.props.currentProject){return <div>no active project</div>;}
		return <div className="c-controller-project">
			<h1>{this.props.currentProject.title}</h1>
			<p>{this.props.currentProject.description}</p>
		</div>
	}
}

function mapStateToProps(state){
	return {
		currentProject: state.projects.current
	}
}

export default connect(mapStateToProps)(ControllerProject);