import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/layout';
import ShowcaseLanding from './components/showcase/showcase-landing';
import ShowcaseTeam from './components/showcase/showcase-team';
import ControllerNavigation from './components/controller/controller-navigation';
import ControllerProject from './components/controller/controller-project';
import ControllerTeam from './components/controller/controller-team';

export const routes = {
	root: '/',
	showcase : '/showcase',
	showcaseTeam : '/showcase/team',
	controller : '/controller',
	controllerCurrentProject : '/controller/project',
	controllerCurrentProjectTeam : '/controller/project/team',
};

export default (
	<Route path={routes.root} component={Layout}>
		<Route path={routes.showcase} component={ShowcaseLanding}>
			<Route path={routes.showcaseTeam} component={ShowcaseTeam} />
		</Route>

		<Route path={routes.controller} component={ControllerNavigation}>
			<Route path={routes.controllerCurrentProject} component={ControllerProject}>
				<Route path={routes.controllerCurrentProjectTeam} component={ControllerTeam} />
			</Route>
		</Route>
	</Route>
)