import React, { Component } from 'react';
import socket from '../../lib/socket';
import events from '../../lib/events';
import { calculateScrollPosTop, scroll } from '../../lib/positioning';

class ShowcaseProject extends Component {
	constructor() {
		super();

		this.state = {};
	}

	componentWillMount(){
		socket.once(events.closeProjectClient, () => {
			this.setState({
				isClosing : true,
				selectedSection: 1
			})
		});

		socket.on(events.changeSectionClient, ({sectionId}) => {
			this.setState({
				selectedSection: sectionId
			});
		});
	}

	componentDidUpdate() {
		const target = this.projectElem.querySelector('.c-showcase-project__content.is-active');
		scroll(target.offsetTop, 500, this.scrollElem);
	}

	componentWillUnmount(){
		socket.off(events.changeSectionClient);
	}

	renderExtraSections(){
		const description = (section) => <div className="c-showcase-project__description">
			<h3>{section.title}</h3>
			<p>{section.description}</p>
		</div>;

		return this.props.contents.map((section, index) => {
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

	render() {
		return <article
			className={'c-showcase-project' + (this.state.isClosing ? ' c-showcase-project--is-closing' : '')}
			ref={(projectElem) => { this.projectElem = projectElem; }} >
			<div className="c-showcase-project__inner" ref={(scrollElem) => { this.scrollElem = scrollElem; }}>
				<header className="c-showcase-project__header">
					<h1 className="c-showcase-project__title">{this.props.title}</h1>
				</header>

				<div className={'c-showcase-project__content o-section--full-height' + (!this.state.selectedSection ? ' is-active' : '')}>
					<div className="c-showcase-project__description">{this.props.description}</div>
					<div className="c-showcase-project__cover">
						<img src={this.props.coverImg} alt={this.props.title}/>
					</div>
				</div>

				{this.renderExtraSections()}
			</div>
		</article>
	}
}

export default ShowcaseProject;