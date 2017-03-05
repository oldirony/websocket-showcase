export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const SELECT_PROJECT = 'SELECT_PROJECTS';
export const CLOSE_PROJECT = 'CLOSE_PROJECTS';

const projects = [
	{
		title:'project1',
		id: 1,
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.'
	},
	{
		title:'project2',
		id: 2,
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.'
	},
	{
		title:'project3',
		id: 3,
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.'
	}
];

export function fetchProjects(){
	return {
		type: FETCH_PROJECTS,
		payload : projects
	}
}


export function selectProject(data){
	return {
		type: SELECT_PROJECT,
		payload : data
	};


	// return {
	// 	type: SELECT_PROJECT,
	// 	payload : {
	// 		title:'project1',
	// 		id: 1,
	// 		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.'
	// 	}
	// }
}

export function closeProject(data) {
	return {
		type: CLOSE_PROJECT,
		payload: data
	};
}