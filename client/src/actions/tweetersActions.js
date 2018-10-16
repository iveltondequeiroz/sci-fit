export function addTweet(id, text) {
	return {
		type: 'ADD_TWEET',
		payload: {
			id, 
			text
		}	
	}
}

export function updateTweet(id, text) {
	return {
		type: 'UPDATE_TWEET',
		payload: {
			id, 
			text
		}
	}
}
