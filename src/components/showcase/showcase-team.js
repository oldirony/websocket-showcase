import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTeamMember, unselectTeamMember } from '../../actions'
import { routerShape } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import socket from '../../lib/socket';
import events from '../../lib/events';
import { routes } from '../../routes';

class ShowcaseTeam extends Component {
	static contextTypes = {
		router : routerShape
	};

	constructor(){
		super();

		this.state = {
			activeMember: null
		}

	}

	componentDidMount(){
		socket.on(events.selectTeamMemberClient, this.selectMember.bind(this))
	}

	componentDidUpdate(){
		setTimeout(()=>{
			if(!this.props.teamMember) return;

			// TODO check if the url is already correct
			this.context.router.push(routes.showcaseProjectTeamMember(this.props.params.id, this.props.teamMember.indexId));
		}, 500);
	}


	componentWillUnmount(){
		socket.removeListener(events.selectTeamMemberClient, this.selectMember.bind(this))
	}

	render() {
		return <div className={"c-showcase-team" + ( this.props.teamMember ? ' no-page-transition' : '')}>
			<div className="o-section o-section--spaced-top">
				<h1>TEAM</h1>
			</div>
			<div className="o-layout-four-cols">
				{this.props.currentProject ? this.renderMembers() : <div></div>}
			</div>

			{this.props.children}
		</div>
	}

	selectMember({activeMember}){
		if(activeMember === null) return this.props.unselectTeamMember();

		let _index = null;
		const selectedTeamMember = this.props.currentProject.team.teamMembers.filter((teamMember, index)=>{
			if(activeMember === index){
				_index = index;
				return true;
			}
		})[0];

		selectedTeamMember.indexId = _index;
		this.props.selectTeamMember(selectedTeamMember);
	}

	renderMembers() {
		return this.props.currentProject.team.teamMembers.map((teamMember, index) =>{
			return <article
					className={"c-card c-card--with-single-image o-scalable" + (this.props.teamMember !== null && this.props.teamMember.id.value === teamMember.id.value ? ' is-active' : '')}
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

export default connect(mapStateToProps, { selectTeamMember, unselectTeamMember })(ShowcaseTeam);