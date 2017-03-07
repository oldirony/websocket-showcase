import React, { Component } from 'react';
import Loader from './loader';
import Footer from './footer';

class Main extends Component {
	render() {
		return <div className="c-app" onDoubleClick={this.refresh}>
			<Loader />
			{this.props.children}
		</div>
	}
	refresh() {
		window.location.reload();
	}
}


export default Main;
