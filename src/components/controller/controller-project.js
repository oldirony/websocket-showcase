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

	constructor() {
		super();
		this.state = {
			section: 'Home'
		}
	}

	componentWillMount() {
		if(!this.props.currentProject){
			return this.context.router.push(routes.controller);
		}

		this.props.currentProject.team.teamMembers.forEach(teamMember=>{
			new Image().src = teamMember.picture.medium
		});
	}

	renderMainView(){
		const options = ['1. Intro'].concat(this.props.currentProject.contents.map((content, index) => `${index+2}. ${content.title}`));
		return <VerticalSelector handleSlideChange={this.handleSlideChange} options={options} />

	}

	render() {
		if(!this.props.currentProject){ return <div></div>; }

		return <div className="c-controller-project o-controller-project">
			<Dropper/>
			<header className="c-controller-project__header
			o-controller-project__header">
				<h1 className="c-controller-project__title">
					{this.props.currentProject.title}
					<span className="c-controller-project__section-title"> / {this.state.section}</span>
				</h1>
			</header>
			<div className="o-controller-project__views">
				{this.props.children
					? React.cloneElement(this.props.children, {
						updateSectionTitle: this.updateSectionTitle.bind(this)
					})
					: this.renderMainView()}
			</div>
			<nav className="o-controller-side-nav o-controller-project__side-buttons">
				{this.renderNav()}
			</nav>
		</div>
	}


	renderNav(){
		const navItems = [
			{
				icon: "#icon-close",
				action: this.handleCloseAction
			},
			{
				icon: "#icon-home",
				action: this.handleHomeAction,
				keepView: true,
				hideAt: routes.controllerProject
			},
			{
				icon: "#icon-people",
				action: this.handleTeamAction,
				keepView: true,
				hideAt: routes.controllerProjectTeam
			},
			{
				icon: "#icon-timeline",
				action: this.handleCloseAction,
				keepView: true
			}
		];

		return navItems.map(({icon, action, keepView, hideAt}, index) =>  {
			return <DraggableButton
				key={index}
				icon={icon}
				action={action.bind(this)}
				hideAt={hideAt}
				keepView={keepView} />
		});
	}


	handleCloseAction() {
		socket.emit(events.closeProject);
		this.context.router.push(routes.controller);
	}

	handleTeamAction() {
		socket.emit(events.showTeam);
		this.context.router.push(routes.controllerProjectTeam);
	}

	handleHomeAction() {
		socket.emit(events.showHome);
		this.context.router.push(routes.controllerProject);
	}

	handleSlideChange(currentSlide){
		socket.emit(events.changeSection, {sectionId : currentSlide});
	}

	updateSectionTitle(newSectionTitle = 'Intro'){
		this.setState({
			section: newSectionTitle
		});
	}

}

function mapStateToProps(state){
	return {
		currentProject: state.projects.current
	}
}

export default connect(mapStateToProps)(ControllerProject);