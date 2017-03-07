export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const SELECT_PROJECT = 'SELECT_PROJECTS';
export const CLOSE_PROJECT = 'CLOSE_PROJECTS';

const projects = [
	{
		title:'Suzuki website',
		id: 1,
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.',
		coverImg : 'http://www.foolproof.co.uk/media/574310/Suzuki_process.jpg',
		contents : [
			{
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.',
				coverImg : 'http://www.foolproof.co.uk/media/574310/Suzuki_process.jpg'
			},
			{
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.',
				coverImg : 'http://www.foolproof.co.uk/media/574310/Suzuki_process.jpg'
			},
			{
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.',
				coverImg : 'http://www.foolproof.co.uk/media/574310/Suzuki_process.jpg'
			}
		]
	},
	{
		title:'project2',
		id: 2,
		coverImg : 'http://www.foolproof.co.uk/media/574310/Suzuki_process.jpg',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.',
		contents : [
			{
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.',
				coverImg : 'http://www.foolproof.co.uk/media/574310/Suzuki_process.jpg'
			}
		]
	},
	{
		title:'project3',
		id: 3,
		coverImg : 'http://www.foolproof.co.uk/media/574310/Suzuki_process.jpg',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.',
		contents : [
			{
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum cursus neque. Curabitur maximus orci a tortor sagittis, in ornare erat interdum. In dolor tellus, venenatis.',
				coverImg : 'http://www.foolproof.co.uk/media/574310/Suzuki_process.jpg'
			}
		]
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