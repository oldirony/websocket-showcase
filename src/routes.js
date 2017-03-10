import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/layout';
import ShowcaseLanding from './components/showcase/showcase-landing';
import ShowcaseProject from './components/showcase/showcase-project';
import ShowcaseTeam from './components/showcase/showcase-team';
import ControllerNavigation from './components/controller/controller-navigation';
import ControllerProject from './components/controller/controller-project';
import ControllerTeam from './components/controller/controller-team';

class Routes {
	constructor(){
		this.root =  '/';
		this.showcase  =  '/showcase';
		this.showcaseProject  =  (id=':id')=>`${this.showcase}/project/${id}`;
		this.showcaseProjectTeam  =  (id=':id')=>this.showcaseProject(id)+'/team';
		this.controller  =  '/controller';
		this.controllerCurrentProject  =  `${this.controller}/project`;
		this.controllerCurrentProjectTeam  =  `${this.controllerCurrentProject}/team`;
	}
}

export const routes = new Routes();

export default (
	<Route path={routes.root} component={Layout}>
		<Route path={routes.showcase} component={ShowcaseLanding}>
			<Route path={routes.showcaseProject()} component={ShowcaseProject}>
				<Route path={routes.showcaseProjectTeam()} component={ShowcaseTeam} />
			</Route>
		</Route>

		<Route path={routes.controller} component={ControllerNavigation}>
			<Route path={routes.controllerCurrentProject} component={ControllerProject}>
				<Route path={routes.controllerCurrentProjectTeam} component={ControllerTeam} />
			</Route>
		</Route>
	</Route>
)