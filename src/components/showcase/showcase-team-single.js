import React, { Component } from 'react';
import { routerShape } from 'react-router';
import { connect } from 'react-redux';

import { routes } from '../../routes';

class ShowcaseTeamSingle extends Component {
	static contextTypes = {
		router : routerShape
	};

	componentWillMount(){
		if(!this.props.teamMember) return this.goToTeamView();
	}

	componentDidUpdate(){
		if(!this.props.teamMember) return this.goToTeamView();
	}

	render() {
		if(!this.props.teamMember) return <div></div>;

		return (
			<div className="o-fullscreen o-section c-animation-fade-in">
				<article className="o-layout-one-half">
					<div>
						<img src={this.props.teamMember.picture.large} className="c-image c-image--rounded" alt=""/>
						<h1>{this.props.teamMember.name.first} {this.props.teamMember.name.last}</h1>
					</div>
					<div>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae cum eius eveniet harum incidunt nihil optio! Aliquam aliquid dicta impedit iusto nam quo ratione reprehenderit sint, temporibus veniam voluptatem?</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae cum eius eveniet harum incidunt nihil optio! Aliquam aliquid dicta impedit iusto nam quo ratione reprehenderit sint, temporibus veniam voluptatem?</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae cum eius eveniet harum incidunt nihil optio! Aliquam aliquid dicta impedit iusto nam quo ratione reprehenderit sint, temporibus veniam voluptatem?</p>
					</div>
				</article>
			</div>
		)
	}

	goToTeamView(){
		this.context.router.push(routes.showcaseProjectTeam(this.props.params.id));
	}
}

function mapStateToProps({teamMember}){
	return {
		teamMember
	}
}

export default connect(mapStateToProps)(ShowcaseTeamSingle);