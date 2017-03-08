import React, { Component } from 'react';
import { connect } from 'react-redux';
import VerticalSelector from '../vertical-selector';

class ControllerTeam extends Component {
	componentWillMount(){
	}

	renderUsers() {
		return this.props.currentProject.team.teamMembers.map((teamMember, index)=>{
			return <div key={index}>
				<h4>{`${teamMember.name.first} ${teamMember.name.last}`}</h4>

				<img src={teamMember.picture.medium} className="c-image c-image--rounded" alt=""/>
			</div>
		})
	}
	render() {
		return <div className="c-app"><VerticalSelector options={this.renderUsers()}/></div>
	}
}


function mapStateToProps(state){
	return {
		currentProject : state.projects.current,
	}
}


export default connect(mapStateToProps)(ControllerTeam);