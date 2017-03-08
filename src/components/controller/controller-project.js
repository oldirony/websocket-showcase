import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../../lib/socket';
import events from '../../lib/events';
import { routes } from '../../routes';
import { routerShape } from 'react-router';

import VerticalSelector from '../vertical-selector';
import DraggableButton from '../draggable-button';
import Dropper from '../dropper';

class ControllerProject extends Component {
	static contextTypes = {
		router : routerShape
	};

	componentWillMount() {
		if(!this.props.currentProject){
			return this.context.router.push(routes.controller);
		}

		this.props.currentProject.team.teamMembers.forEach(teamMember=>{
			new Image().src = teamMember.picture.medium
		});
	}

	renderMainView(){
		const options = ['Intro'].concat(this.props.currentProject.contents.map(content => content.title));
		return	<VerticalSelector handleSlideChange={this.handleSlideChange} options={options} />
	}

	render() {
		if(!this.props.currentProject){ return <div></div>; }

		return <div className="c-controller-project o-controller-project">
			<Dropper/>
			<header className="c-controller-project__header
			o-controller-project__header">
				<h1>{this.props.currentProject.title}</h1>
			</header>
			<div className="o-controller-project__views">
				{this.props.children || this.renderMainView()}
			</div>
			<nav className="o-controller-side-nav o-controller-project__side-buttons">
				<DraggableButton icon="#icon-close" action={this.handleCloseAction.bind(this)}/>
				<DraggableButton icon="#icon-people" action={this.handleTeamAction.bind(this)} keepView={true}/>
				<DraggableButton icon="#icon-timeline" keepView={true}/>
			</nav>
		</div>
	}


	handleCloseAction() {
		socket.emit(events.closeProject, 123);
		this.context.router.push(routes.controller);
	}

	handleTeamAction() {
		socket.emit(events.showTeam, 123);
		this.context.router.push(routes.controllerCurrentProjectTeam);
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