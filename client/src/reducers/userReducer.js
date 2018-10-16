export default function reducer(state = {
		user : {
			name:"jg",
			age:9
		}	
	}, 
	action) {
		switch(action.type) {
			case "SET_USER_NAME": {
				return {
					...state,
					user: {...state.user, name: action.payload }
				}
			}
			case "SET_USER_AGE": {
				return {
					...state,
					user: {...state.user, age: action.payload }
				}
			}	
			case "FETCH_USER_FULLFILED": {
				return { ...state, user: action.payload}	
			}
		}
		return state		
}