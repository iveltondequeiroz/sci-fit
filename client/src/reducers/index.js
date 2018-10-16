import { combineReducers } from 'redux'

import app from './appReducer'
import user from './userReducer'
import students from './studentsReducer'
import exercises from './exercisesReducer'
import drops from './dropReducer'
import program from './programReducer'



import { reducer as form } from 'redux-form'
export default combineReducers({
	app,
	user,
	students,
	exercises,
	drops, 
	program
})
