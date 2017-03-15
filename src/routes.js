import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/layout';
import ShowcaseIndex from './components/showcase/showcase-index';
import ShowcaseProject from './components/showcase/showcase-project';
import ShowcaseTeam from './components/showcase/showcase-team';
import ShowcaseTeamSingle from './components/showcase/showcase-team-single';
import ControllerIndex from './components/controller/controller-index';
import ControllerProject from './components/controller/controller-project';
import ControllerTeam from './components/controller/controller-team';

class Routes {
	constructor(){
		this.root =  '/';
		this.showcase  =  '/showcase';
		this.showcaseProject  =  (id=':id')=>`${this.showcase}/project/${id}`;
		this.showcaseProjectTeam  =  (id=':id')=>this.showcaseProject(id)+'/team';
		this.showcaseProjectTeamMember = (id=':id', memberId=':memberId')=> this.showcaseProjectTeam(id)+`/${memberId}`;
		this.controller  =  '/controller';
		this.controllerProject  =  `${this.controller}/project`;
		this.controllerProjectTeam  =  `${this.controllerProject}/team`;
	}
}

export const routes = new Routes();

export default (
	<Route path={routes.root} component={Layout}>
		<Route path={routes.showcase} component={ShowcaseIndex}>
			<Route path={routes.showcaseProject()} component={ShowcaseProject}>
				<Route path={routes.showcaseProjectTeam()} component={ShowcaseTeam} >
					<Route path={routes.showcaseProjectTeamMember()} component={ShowcaseTeamSingle} />
				</Route>
			</Route>
		</Route>

		<Route path={routes.controller} component={ControllerIndex}>
			<Route path={routes.controllerProject} component={ControllerProject}>
				<Route path={routes.controllerProjectTeam} component={ControllerTeam} />
			</Route>
		</Route>
	</Route>
)