import React, { Component } from 'react';
import {routerShape} from 'react-router';
import socket from '../../lib/socket';
import events from '../../lib/events';
import {routes} from '../../routes';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ShowcaseLanding extends Component {
	static contextTypes = {
		router : routerShape
	};

	componentWillMount() {
		socket.on(events.selectProjectClient, (data) => {
			this.context.router.push(routes.showcase + '/project/' + data.id);
		});
	}

	renderCurrentProject(){
		return <div>
			<ReactCSSTransitionGroup
				transitionName="o-ps-translate-vertical"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}>
				{
					 (this.props.children) ? React.cloneElement(this.props.children, {
						key: this.props.params.id
					}) : null
				}
			</ReactCSSTransitionGroup>
			<ReactCSSTransitionGroup
				transitionName="o-ps-translate-fade"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}>
				{
					<div key='waiting' className="c-showcase-landing__waiting-message">Waiting for a project...</div>
				}
			</ReactCSSTransitionGroup>
		</div>
	}

	render() {
		return <div className="c-showcase-landing">
			{this.renderCurrentProject()}
		</div>
	}
}


export default ShowcaseLanding;