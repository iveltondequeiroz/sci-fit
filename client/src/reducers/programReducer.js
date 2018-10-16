export default function reducer( state = { user:0, week:1, exsets:[] } , action ) {
	switch(action.type) {
		case "ADD_PROGRAM_SET": {
			return {
				...state,
				exsets: [ ...state.exsets, action.payload ]
			}
		}
		case "REMOVE_PROGRAM_SET": {
			console.log("payload")
			console.log(action.payload)
			for(let c=0;c<state.exsets.length;c++){
				if(c==action.payload) {
					state.exsets.splice(c,1);
				}
			}

			return {
				...state,
				exsets: state.exsets
			}
		}
		
		case "SET_WEEK": {
			return {
				...state,
				week:  action.payload,
				exsets:[]
			}
		}
		case "SET_USER": {
			return {
				...state,
				user:  action.payload,
				exsets:[]
			}
		}
	}
	return state
}
