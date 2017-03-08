import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowcaseTeam extends Component {
	renderUsers() {
		return this.props.currentProject.team.teamMembers.map((teamMember, index) =>{
			return <article className="o-layout-one-half o-section" key={index}>
				<header>
					<img src={teamMember.picture.large} className="c-image c-image--rounded" alt=""/>
					<h3>{`${teamMember.name.first} ${teamMember.name.last}`}</h3>
					<h4>{teamMember.email}</h4>

				</header>

				<div>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur cumque debitis dolorem dolores error eveniet, expedita facilis ipsam mollitia nisi omnis praesentium quaerat quos repellat rerum saepe sequi vel.</p></div>
				</article>
		})
	}
	render() {
		return <div className="c-showcase-team">
			<div className="o-section o-section--spaced-top">
				<h1>TEAM</h1>
			</div>
			<div>
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