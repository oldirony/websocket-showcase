import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';

class Main extends Component {
	render() {
		return <div className="c-app" onDoubleClick={this.refresh}>
			<Header />
			{this.props.children}
		</div>
	}
	refresh() {
		window.location.reload();
	}
}

export default Main;
