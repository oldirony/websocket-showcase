import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';

class Main extends Component {
	render() {
		return <div className="c-app">
			<Header />
			{this.props.children}
		</div>
	}
}

export default Main;
