import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/layout';
import ShowcaseLanding from './components/showcase/showcase-landing';
import ControllerNavigation from './components/controller/controller-navigation';
import ControllerProject from './components/controller/controller-project';

export const routes = {
	root: '/',
	showcase : '/showcase',
	controller : '/controller',
	controllerCurrentProject : '/project',
};

export default (
	<Route path={routes.root} component={Layout}>
		<IndexRoute component={ShowcaseLanding}/>
		<Route path={routes.showcase}>
			<IndexRoute component={ShowcaseLanding}/>
		</Route>

		<Route path={routes.controller} component={ControllerNavigation}>
			<Route path={routes.controller + routes.controllerCurrentProject} component={ControllerProject} />
		</Route>
	</Route>
)