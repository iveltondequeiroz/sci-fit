export default function reducer( state = { students:[] }, action ) {
	switch(action.type) {
		case "FETCH_STUDENTS_FULLFILED": {
			return {
				...state,
				students: action.payload
			}
		}		
	}
	return state
}

