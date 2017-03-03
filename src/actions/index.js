export const FETCH_PROJECTS = 'FETCH_PROJECTS';

export function fetchProjects(state = {}){
	return {
		type: FETCH_PROJECTS,
		payload : [{
			title:'project1',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.'
		},{
			title:'project2',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.'
		},{
			title:'project3',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.'
		}]
	}
}