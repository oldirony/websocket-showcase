import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scrollable from '../scrollable';

class ControllerTeam extends Component {
	componentWillMount(){
		this.props.updateSectionTitle('Team');
	}

	componentWillUnmount(){
		this.props.updateSectionTitle();
	}

	renderUsers() {
		return this.props.currentProject.team.teamMembers.map((teamMember, index)=>{
			return <div key={index} className="u-text-centered">
				<h4 className="u-vertically-centered">{`${teamMember.name.first} ${teamMember.name.last}`}</h4>
				<img src={teamMember.picture.medium} className="c-image c-image--rounded" alt=""/>
			</div>
		})
	}
	render() {
		return <div className="c-app"><Scrollable contents={this.renderUsers()}/></div>
	}
}


function mapStateToProps(state){
	return {
		currentProject : state.projects.current,
	}
}


export default connect(mapStateToProps)(ControllerTeam);