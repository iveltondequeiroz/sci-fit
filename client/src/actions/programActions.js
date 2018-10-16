export function addSet(newSet){
	return {
		type: "ADD_PROGRAM_SET",
		payload : newSet,
	}
}

export function removeSet(key){
	return {
		type: "REMOVE_PROGRAM_SET",
		payload : key,
	}
}


export function setWeek(value){
	return {
		type: "SET_WEEK",
		payload : value,
	}
}

export function setUser(value){
	return {
		type: "SET_USER",
		payload : value,
	}
}