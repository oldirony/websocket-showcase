import React, { Component } from 'react';
import { connect } from 'react-redux';
import VerticalSelector from '../vertical-selector';

class ControllerTeam extends Component {
	componentWillMount(){
	}

	renderUsers() {
		return this.props.currentProject.team.teamMembers.map((teamMember, index)=>{
			return <div key={index} className="o-layout-two-cols">
				<h4 className="u-vertically-centered">{`${teamMember.name.first} ${teamMember.name.last}`}</h4>
				<div>
					<img src={teamMember.picture.medium} className="c-image c-image--rounded" alt=""/>
				</div>
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