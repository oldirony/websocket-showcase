import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowcaseTeam extends Component {
	renderUsers() {
		return this.props.currentProject.team.teamMembers.map((teamMember, index) =>{
			return <article className="c-card c-card--with-single-image" key={index}>
				<header>
					<img src={teamMember.picture.large} className="c-image c-image--rounded c-card__single-image" alt=""/>
					<h3 className="c-card__title">{`${teamMember.name.first} ${teamMember.name.last}`}</h3>
					{/*<h4>{teamMember.email}</h4>*/}

				</header>

				<div className="c-card__description">
					{/*<h3>Intro</h3>*/}
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur cumque debitis dolorem dolores error eveniet, expedita facilis ipsam mollitia nisi omnis praesentium quaerat quos repellat rerum saepe sequi vel.</p></div>
				</article>
		})
	}
	render() {
		return <div className="c-showcase-team">
			<div className="o-section o-section--spaced-top">
				<h1>TEAM</h1>
			</div>
			<div className="o-layout-four-cols">
				{this.props.currentProject ? this.renderUsers() : <div></div>}
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