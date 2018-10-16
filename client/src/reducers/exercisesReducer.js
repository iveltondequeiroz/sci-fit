export default function reducer( state = { exercises:[{ex:"aaaaa",sets:2,reps:1}], groups:[], dropvalue:2 }, action ) {
	switch(action.type) {
		case "FETCH_EXERCISES_FULLFILED": {
			return {
				...state,
				exercises: action.payload,
			}
		}
		case "FETCH_GROUPS_FULLFILED": {
			return {
				...state,
				groups: action.payload,
			}
		}		
	}
	return state
}


