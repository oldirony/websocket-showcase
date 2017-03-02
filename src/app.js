import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class App extends Component {
	render() {
		return <div className="c-app">test</div>
	}
}


ReactDOM.render(<App />, document.querySelector('.content'));