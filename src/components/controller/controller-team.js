import React, { Component } from 'react';
import { connect } from 'react-redux';

import socket from '../../lib/socket';
import events from '../../lib/events';

class ControllerTeam extends Component {
	constructor(){
		super();

		this.state = {
			activeMember: null
		}
	}

	componentWillMount(){
		this.props.updateSectionTitle('Team');
	}

	componentWillUnmount(){
		this.props.updateSectionTitle();
	}

	render() {
		return <div>
			{/*<Scrollable contents={this.renderMembers()}/>*/}
			<div className="o-layout-four-cols">
				{this.renderMembers()}
			</div>
		</div>
	}

	renderMembers() {
		return this.props.currentProject.team.teamMembers.map((teamMember, index)=>{
			return <div
				key={index}
				data-id={index}
				className={'c-people-card' + (this.state.activeMember === index ? ' is-active' : '')}
				onClick={this.toggleMemberActivation.bind(this)}>
				<img src={teamMember.picture.medium} className="c-image c-image--rounded c-people-card__image" alt=""/>
				<h4 className="c-people-card__title">{`${teamMember.name.first} ${teamMember.name.last}`}</h4>
				<h5 className="c-people-card__subtitle">{teamMember.role}</h5>
			</div>
		})
	}

	toggleMemberActivation(event){
		const memberId = parseInt(event.nativeEvent.target.dataset.id || event.nativeEvent.target.parentNode.dataset.id);

		this.setState(
			{activeMember : (memberId === this.state.activeMember ? null : memberId)},
			()=>{
				socket.emit(events.selectTeamMember, {activeMember: this.state.activeMember})
			}
		);
	}
}


function mapStateToProps(state){
	return {
		currentProject : state.projects.current,
	}
}


export default connect(mapStateToProps, {})(ControllerTeam);