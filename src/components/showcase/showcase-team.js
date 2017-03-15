import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTeamMember } from '../../actions'

import socket from '../../lib/socket';
import events from '../../lib/events';

class ShowcaseTeam extends Component {
	constructor(){
		super();

		this.state = {
			activeMember: null
		}

	}

	componentDidMount(){
		socket.on(events.selectTeamMemberClient, this.selectMember.bind(this))
	}

	componentWillUnmount(){
		socket.removeListener(events.selectTeamMemberClient, this.selectMember.bind(this))
	}

	render() {
		return <div className="c-showcase-team">
			<div className="o-section o-section--spaced-top">
				<h1>TEAM</h1>
			</div>
			<div className="o-layout-four-cols">
				{this.props.currentProject ? this.renderMembers() : <div></div>}
			</div>
		</div>
	}

	selectMember({activeMember}){
		console.log(activeMember);
		this.props.selectTeamMember(activeMember);
	}

	renderMembers() {
		return this.props.currentProject.team.teamMembers.map((teamMember, index) =>{
			return <article
					className={"c-card c-card--with-single-image o-scalable" + (this.props.teamMember === index ? ' is-active' : '')}
					key={index}>
				<header>
					<img src={teamMember.picture.large} className="c-image c-image--rounded c-card__single-image" alt=""/>
					<h3 className="c-card__title">{`${teamMember.name.first} ${teamMember.name.last}`}</h3>
				</header>

				<div className="c-card__description">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur cumque debitis dolorem dolores error eveniet, expedita facilis ipsam mollitia nisi omnis praesentium quaerat quos repellat rerum saepe sequi vel.</p>
				</div>
			</article>
		})
	}
}

function mapStateToProps({projects, teamMember}){
	return {
		currentProject : projects.current,
		teamMember : teamMember,
	}
}

export default connect(mapStateToProps, { selectTeamMember })(ShowcaseTeam);