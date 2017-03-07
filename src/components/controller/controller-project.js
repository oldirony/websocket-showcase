import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../../lib/socket';
import events from '../../lib/events';
import { routes } from '../../routes';
import { routerShape } from 'react-router';

import VerticalSelector from '../vertical-selector';
import DraggableButton from '../draggable-button';

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
		const options = ['Intro'].concat(this.props.currentProject.contents.map(content => content.title));
		return	<VerticalSelector handleSlideChange={this.handleSlideChange} options={options} />
	}

	render() {
		if(!this.props.currentProject){ return <div></div>; }

		return <div className="c-controller-project o-controller-project">
			<header className="c-controller-project__header
			o-controller-project__header">
				<h1>{this.props.currentProject.title}</h1>
			</header>
			<div className="o-controller-project__views">
				{this.props.children || this.renderMainView()}
			</div>
			<nav className="o-controller-side-nav o-controller-project__side-buttons">
				<DraggableButton icon="#icon-close" action={this.handleCloseClick.bind(this)}/>
				<DraggableButton icon="#icon-people"/>
				<DraggableButton icon="#icon-timeline"/>
			</nav>
		</div>
	}


	handleCloseClick() {
		socket.emit(events.closeProject, 123);
		this.context.router.push(routes.controller);
	}

	handleSlideChange(currentSlide){
		socket.emit(events.changeSection, {sectionId : currentSlide});
	}
}

function mapStateToProps(state){
	return {
		currentProject: state.projects.current
	}
}

export default connect(mapStateToProps)(ControllerProject);