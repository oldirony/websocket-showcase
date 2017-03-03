import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/layout';
import Home from './components/home';
import ShowcaseLanding from './containers/showcase-landing';
import ControllerNavigation from './containers/controller-navigation';


export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home}/>

		<Route path="/showcase">
			<IndexRoute component={ShowcaseLanding}/>
		</Route>

		<Route path="/controller">
			<IndexRoute component={ControllerNavigation}/>
		</Route>
	</Route>
)