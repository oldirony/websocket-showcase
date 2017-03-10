import React, { Component, addons } from 'react';
import socket from '../../lib/socket';
import events from '../../lib/events';
import {routerShape} from 'react-router';
import {routes} from '../../routes';
import { connect } from 'react-redux';
import { selectProject, closeProject } from '../../actions';
import { scroll } from '../../lib/positioning';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class ShowcaseProject extends Component {
	static contextTypes = {
		router : routerShape
	};

	constructor() {
		super();

		this.state = {};
	}

	componentWillMount(){
		this.props.selectProject({id:this.props.params.id});

		socket.on(events.changeSectionClient, ({sectionId}) => {
			this.setState({
				selectedSection: sectionId
			});
		});

		socket.on(events.showHomeClient, ()=>{
			this.context.router.push(routes.showcaseProject(this.props.params.id))
		});

		socket.on(events.showTeamClient, ()=>{
			this.context.router.push(routes.showcaseProjectTeam(this.props.params.id))
		});

		socket.on(events.closeProjectClient, () => {
			this.props.closeProject();
			this.context.router.push(routes.showcase);
		});
	}

	componentDidUpdate() {
		if(!this.props.children){
			const target = this.projectElem.querySelector('.c-showcase-project__content.is-active');
			scroll(target.offsetTop, 500, this.scrollElem);
		} else {
			scroll(0, 10, this.scrollElem);
		}
	}

	componentWillUnmount(){
		socket.off(events.changeSectionClient);
	}

	renderExtraSections(){
		const description = (section) => <div className="c-showcase-project__description">
			<h3>{section.title}</h3>
			<p>{section.description}</p>
		</div>;

		return this.props.currentProject.contents.map((section, index) => {
			return <div key={index}
						className={'c-showcase-project__content o-section--full-height'
							+ (index % 2 ? '' : ' c-showcase-project__content--alt-bg')
							+ (this.state.selectedSection === index+1 ? ' is-active' : '')
						}>
				{ index % 2 ? description(section) : ''}
				<div className="c-showcase-project__cover">
					<img src={section.coverImg} alt={section.title}/>
				</div>
				{ index % 2 ? '' : description(section)}
			</div>
		})
	}
	renderContent(){
		if(!this.props.currentProject) return;

		return <div key="base">
			<div className={'c-showcase-project__content o-section--full-height' + (!this.state.selectedSection ? ' is-active' : '')}>
				<div className="c-showcase-project__description">{this.props.currentProject.description}</div>
				<div className="c-showcase-project__cover">
					<img src={this.props.currentProject.coverImg} alt={this.props.currentProject.title}/>
				</div>
			</div>

			{this.renderExtraSections()};
		</div>
	}

	renderChild(){
		if(this.props.children){
			return React.cloneElement(this.props.children, {
				key: location.pathname
			})
		} else {
			return this.renderContent();
		}
	}

	render() {
		return <article
			className={'c-showcase-project'}
			ref={(projectElem) => { this.projectElem = projectElem; }} >
			<div className="c-showcase-project__inner" ref={(scrollElem) => { this.scrollElem = scrollElem; }}>
				<header className="c-showcase-project__header">
					<h1 className="c-showcase-project__title">{
						this.props.currentProject ? this.props.currentProject.title : ''
					}</h1>
				</header>
				<ReactCSSTransitionGroup
					transitionName="o-ps-translate-fade"
					transitionLeave={true}
					transitionAppear={false}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}>

					{this.renderChild()}
				</ReactCSSTransitionGroup>
			</div>
		</article>
	}
}

function mapStateToProps(state){
	return {
		projects : state.projects.all,
		currentProject : state.projects.current
	}
}

export default connect(mapStateToProps, { selectProject, closeProject })(ShowcaseProject);