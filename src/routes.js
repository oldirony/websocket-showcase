import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/layout';
import Home from './components/home';
import Controller from './components/controller';
import ShowcaseLanding from './containers/showcase-landing';
import ControllerNavigation from './containers/controller-navigation';
import ControllerProject from './containers/controller-project';

export const routes = {
	root: '/',
	showcase : '/showcase',
	controller : '/controller',
	controllerCurrentProject : '/project',
};

export default (
	<Route path={routes.root} component={Layout}>
		<IndexRoute component={Home}/>

		<Route path={routes.showcase}>
			<IndexRoute component={ShowcaseLanding}/>
		</Route>

		<Route path={routes.controller} component={ControllerNavigation}>
			<Route path={routes.controller + routes.controllerCurrentProject} component={ControllerProject} />
		</Route>
	</Route>
)