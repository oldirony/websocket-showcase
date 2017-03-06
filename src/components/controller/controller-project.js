import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../../lib/socket';
import events from '../../lib/events';
import { routes } from '../../routes';
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

	renderMainView(){
		return	<div options>main view</div>
	}

	render() {
		if(!this.props.currentProject){ return <div></div>; }

		return <div className="c-controller-project o-controller-project">
			<header className="c-controller-project__header">
				<h1>{this.props.currentProject.title}</h1>
			</header>
			<div className="c-controller-project__views">
				{this.props.children || this.renderMainView()}
			</div>
			<nav className="o-controller-side-nav o-controller-project__side-buttons">
				<button className="c-button-icon o-controller-side-nav__button" onClick={this.handleCloseClick.bind(this)}><svg className="o-icon"><use xlinkHref="#icon-close"/></svg></button>
				<button className="c-button-icon o-controller-side-nav__button" onClick={this.handleCloseClick.bind(this)}><svg className="o-icon"><use xlinkHref="#icon-people"/></svg></button>
				<button className="c-button-icon o-controller-side-nav__button" onClick={this.handleCloseClick.bind(this)}><svg className="o-icon"><use xlinkHref="#icon-timeline"/></svg></button>
			</nav>
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