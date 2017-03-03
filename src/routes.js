import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/layout';
import Home from './components/home';
import Test from './components/test';
import ControllerNavigation from './containers/controller-navigation';


export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home}/>

		<Route path="/test" component={Test}/>

		<Route path="/controller">
			<IndexRoute component={ControllerNavigation}/>
		</Route>
	</Route>
)