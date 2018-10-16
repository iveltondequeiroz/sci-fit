import React, {Component} from 'react'
import ExercisesList from '../components/ExercisesList.jsx'
import SelectFieldWrapper from '../components/SelectFieldWrapper.jsx'
import ContactForm from '../components/ContactForm.jsx'
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import {DropDownMenu, MenuItem} from 'material-ui'
import {fetchExercises, fetchGroups} from '../actions/exercisesActions'
import {setDropGroup, setDropExercise} from '../actions/dropActions'
import {addSet} from '../actions/programActions'

@connect((store) => {
	return {
		exercises: store.exercises.exercises,
		groups: store.exercises.groups,
		drops:store.drops,
		exsets:store.program.exsets,
		program: store.program
	}
})	


class ExercisesPage extends Component {
	constructor() {
		super()
		this.firstExerciseId=0;
		this.updateExercise = true;
		this.state = {
      		open: false,
    	};


	}
	componentWillMount(){
		//this.props.dispatch(fetchStudents())
		//this.props.dispatch(fetchUser())
		//this.props.dispatch(setUserName('ivelton de queiroz'))	
		//this.props.dispatch(setUserAge(47))
		this.props.dispatch(fetchExercises())
		this.props.dispatch(fetchGroups())
	}

	fetchExercises(){
		this.props.dispatch(fetchExercises())
	}	

	fetchGroups(){
		this.props.dispatch(fetchGroups())
	}

	setDropGroup(evt, index, value){
		this.props.dispatch(setDropGroup(value))
		this.updateExercise = true;
	}

	setExercise(value){
		//console.log("set dropexercise=", value)
		this.props.dispatch(setDropExercise(value))
		
	}

	setDropExercise(evt, index, value){
		this.props.dispatch(setDropExercise(value))
		console.log("set dropexercise=", value)
	}


	handleToggle() {
		window.console.log("Click!");
	}

	addSet(){
		console.log("add click")

		let allgroups = this.props.groups
		let groupname = allgroups[this.props.drops.drop_group-1].name
		const numsets = this.refs.numSets.getValue();
		const numreps = this.refs.numReps.getValue();

		let allexercises = this.props.exercises
		const exercisename = allexercises[this.props.drops.drop_exercise-1].name
 		console.log("exercisename", exercisename) 
		
		let newSet = {key:3, group:groupname, ex:exercisename, sets:numsets, reps:numreps }
		this.props.dispatch(addSet(newSet))
		console.log("newSet>",newSet)
		this.refs.numSets.getInputNode().value = ''
		this.refs.numReps.getInputNode().value = ''	
		
		this.setState({
      		open: true,
    	});
		//this.refs.dropGrupo.focus()
	}

	handleRequestClose = () => {
		console.log("handleRequestClose")
		this.setState({
      		open: false,
    	});
  	}
    
    render(){	
		const style = {
  			marginLeft	: 20
		};	

		const styleSets = {
  			marginLeft	: 20,
  			width: 70,
		};	

		const {groups} = this.props
		const mappedGroups = groups.map(
			group => 
				<MenuItem 
					value={group.id} 
					key={group.id}
					primaryText={group.name} 
				/>
		)

		const {drops} = this.props
		const selectedGroup = drops.drop_group
		const allGroups = this.props.groups
		//console.log("selectedGroup>"+selectedGroup)
		const grupo = allGroups[selectedGroup-1]
		let groupName = "none"
		if(typeof grupo !='undefined'){
			groupName=grupo.name
		}
		//console.log("groupName ", groupName)


		const {exercises} = this.props
		//let filteredExercises = exercises;
		//if(!firstTime) {
		let	filteredExercises = exercises.filter((el) => el.group==groupName)
		console.log("filteredExercises",filteredExercises)
		if(filteredExercises.length>0 && this.updateExercise) {
		 	this.firstExerciseId = filteredExercises[0].id;
		 	//console.log("FIRST EXERCISE ID",this.firstExerciseId)
		

			console.log("this.props.dispatch(setDropExercise(this.firstExerciseId))", this.firstExerciseId)
			this.props.dispatch(setDropExercise(this.firstExerciseId))
			this.updateExercise = false;

		}


		const mappedExercises = filteredExercises.map(
			exercise => 
				<MenuItem 
					value={exercise.id} 
					key={exercise.id}
					primaryText={exercise.name} 
				/>
		)

		let current_sets = this.props.exsets.map(
			exset =>
				<TableRow>
			        <TableRowColumn>{exset.ex}</TableRowColumn>
			        <TableRowColumn>{exset.sets}</TableRowColumn>
			        <TableRowColumn>{exset.reps}</TableRowColumn>
			        <TableRowColumn>Del</TableRowColumn>
			     </TableRow>  
		)
		console.log("CURRENT SETS:", current_sets)

		return(
			<div>
				<h1>Layout Maker</h1>	
				<DropDownMenu  value={this.props.drops.drop_group} onChange={this.setDropGroup.bind(this)}>
				   {mappedGroups}
				</DropDownMenu>

				<DropDownMenu ref="dropEx" value={this.props.drops.drop_exercise} onChange={this.setDropExercise.bind(this)}>
				   {mappedExercises}
				</DropDownMenu>
				<br />
				<TextField ref="numSets"  floatingLabelText="# of sets"  defaultValue="0" floatingLabelFixed={true} style={styleSets}/>
				<TextField ref="numReps"  floatingLabelText="# of reps"  defaultValue="0" floatingLabelFixed={true} style={styleSets}/>
				<br />
				<br />
				<FloatingActionButton onClick={this.addSet.bind(this)} disabled={false} style={style}>
      				<ContentAdd />
    			</FloatingActionButton>
    			
    			<ExercisesList lista={current_sets}  />

    			<Snackbar
          			open={this.state.open}
          			message="Set added to the Program"
          			autoHideDuration={2000}
          			onRequestClose={this.handleRequestClose}
          			bodyStyle={{ textAlign: 'center'}}
        		/>
    		
			</div>	
		)	
	}
}

export default ExercisesPage;