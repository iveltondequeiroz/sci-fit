export default function reducer(state={
		tweets:["aaa","bbb","ccc"],
		fetching:false,
		error:null,
	}, action) {
		switch(action.type) {
			case "FETCH_TWEETS":{
				return{...state, fetching:true}
				break
			}
		}
		return state
	}	
