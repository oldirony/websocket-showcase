import React, { Component } from 'react';

class ShowcaseProject extends Component {
	render() {
		return <article className="c-showcase-project">
				<h1>{this.props.title}</h1>
				<p>{this.props.description}</p>
		</article>
	}
}

export default ShowcaseProject;