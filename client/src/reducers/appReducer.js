export default function reducer( state = { isEditing:true }, action ) {
	switch(action.type) {
		case "IS_EDITING_CHANGE": {
			return {
				...state,
				isEditing: action.payload
			}
		}				
	}
	return state
}
