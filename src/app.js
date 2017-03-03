import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

ReactDOM.render(
	<Provider store={createStore(reducers)}>
		<Router routes={routes} history={browserHistory}/>
	</Provider>,
	document.querySelector('.content')
);