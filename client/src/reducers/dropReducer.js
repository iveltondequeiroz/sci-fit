export default function reducer( state = { drop_group:1, drop_exercise:1 }, action ) {
	switch(action.type) {
		case "DROP_GROUP_CHANGE": {
			return {
				...state,
				drop_group: action.payload
			}
		}
		case "DROP_EXERCISE_CHANGE": {
			return {
				...state,
				drop_exercise: action.payload
			}
		}				
	}
	return state
}
