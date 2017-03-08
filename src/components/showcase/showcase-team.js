import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowcaseTeam extends Component {
	renderUsers() {
		return this.props.currentProject.team.teamMembers.map(teamMember=>{
			return <div>
				<h4>{`${teamMember.name.first} ${teamMember.name.last}`}</h4>

				<img src={teamMember.picture.medium} className="c-image c-image--rounded" alt=""/>
			</div>
		})
	}
	render() {
		return <div className="c-showcase-ream">
			<h1>TEAM</h1>
			<div className="o-layout-one-half">
				{this.renderUsers()}
			</div>
		</div>
	}
}

function mapStateToProps({projects}){
	return {
		currentProject : projects.current
	}
}

export default connect(mapStateToProps)(ShowcaseTeam);