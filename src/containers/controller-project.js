import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../lib/socket';
import events from '../lib/events';
import { routes } from '../routes';
import { routerShape } from 'react-router';

class ControllerProject extends Component {
	static contextTypes = {
		router : routerShape
	};

	componentWillMount() {
		if(!this.props.currentProject){
			this.context.router.push(routes.controller);
		}
	}

	render() {
		if(!this.props.currentProject){ return <div></div>; }

		return <div className="c-controller-project">
			<h1>{this.props.currentProject.title}</h1>
			<button className="c-button-icon" onClick={this.handleCloseClick.bind(this)}><svg className="o-icon"><use xlinkHref="#icon-close"/></svg></button>
		</div>
	}

	handleCloseClick() {
		socket.emit(events.closeProject, 123);
		this.context.router.push(routes.controller);
	}
}

function mapStateToProps(state){
	return {
		currentProject: state.projects.current
	}
}

export default connect(mapStateToProps)(ControllerProject);