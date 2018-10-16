import React, {Component} from 'react'
import ExercisesList from '../components/ExercisesList.jsx'

import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import {DropDownMenu, MenuItem} from 'material-ui'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'


import {lightBlueA100, lightBlueA200, red500, 	indigo500, indigoA400, blue50, lightBlue900} from 'material-ui/styles/colors'



import Dialog from 'material-ui/Dialog';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import Divider from 'material-ui/Divider';
import Home from 'material-ui/svg-icons/action/home'
import Print from 'material-ui/svg-icons/action/print'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Grid, Row, Col, Clearfix, Image} from 'react-bootstrap'

import {connect} from 'react-redux'
import {fetchExercises, fetchGroups} from '../actions/exercisesActions'
import {setDropGroup, setDropExercise} from '../actions/dropActions'
import {addSet, removeset, setWeek, setUser} from '../actions/programActions'
import {fetchStudents} from '../actions/studentsActions'

import ToolbarLayout from '../components/ToolbarLayout'
import SetList from '../components/SetList'


@connect((store) => {
	return {
		exercises: store.exercises.exercises,
		groups: store.exercises.groups,
		drops:store.drops,
		exsets:store.program.exsets,
		program: store.program,
		students: store.students
	}
})	




class LayoutMaker extends Component {
	constructor() {
		super()
		this.firstExerciseId=0;
		this.updateExercise = true;
		this.state = {
			howmanydays:2,
			grupos:[],
			current_key:0,
			current_day:1,
      		open: false,
      		open2:false,
      		openSave:false,
      		saveDisabled:true,
      		buttonStyles: {
				marginTop: 10,
				display:'none'
			},
			weeks:[
				{id:1, name:"week 1", wdate:''},
				{id:2, name:"week 2", wdate:''},
				{id:3, name:"week 3", wdate:''},
				{id:4, name:"week 4", wdate:''}
			], 
			users:[
				{id:0, name:"Keren Suer", img:'images/c4.png'},
				{id:1, name:"Grace Ng", img:'images/c2.png'},
				{id:2, name:"Eric Hoffman", img:'images/c3.jpg'},
				{id:3, name:"Kerem Suer", img:'images/c4.png'},
				{id:4, name:"Raquel Parrado", img:'images/aisha.jpg'}
			],

			dayItem:[
				{ 
					day:1,
					sets: [
						{
							id:1,
							group:1, exercise:1, 
							sets:1, reps:1, weight:1,
							w1:0, r1:0,
							w2:0, r2:0,
							w3:0, r3:0,
							w4:0, r4:0,
							w5:0, r5:0,
							w6:0, r6:0,
							w7:0, r7:0,
							w8:0, r8:0,
							w9:0, r9:0,
							w10:0, r10:0
						},
						{
							id:2,
							group:2, exercise:2, 
							sets:1, reps:1, weight:1,
							w1:0, r1:0,
							w2:0, r2:0,
							w3:0, r3:0,
							w4:0, r4:0,
							w5:0, r5:0,
							w6:0, r6:0,
							w7:0, r7:0,
							w8:0, r8:0,
							w9:0, r9:0,
							w10:0, r10:0
						},
						{
							id:3,
							group:3, exercise:3, 
							sets:3, reps:3, weight:3,
							w1:3, r1:0,
							w2:3, r2:0,
							w3:3, r3:0,
							w4:3, r4:3,
							w5:0, r5:3,
							w6:0, r6:3,
							w7:0, r7:3,
							w8:0, r8:0,
							w9:0, r9:0,
							w10:0, r10:0
						}
					]	
				},
				{ 
					day:2,
					sets: [
						{
							id:1,
							group:4, exercise:1, 
							sets:1, reps:1, weight:1,
							w1:0, r1:0,
							w2:0, r2:0,
							w3:0, r3:0,
							w4:0, r4:0,
							w5:0, r5:0,
							w6:0, r6:0,
							w7:0, r7:0,
							w8:0, r8:0,
							w9:0, r9:0,
							w10:0, r10:0
						},
						{
							id:2,
							group:1, exercise:1, 
							sets:1, reps:1, weight:1,
							w1:0, r1:0,
							w2:0, r2:0,
							w3:0, r3:0,
							w4:0, r4:0,
							w5:0, r5:0,
							w6:0, r6:0,
							w7:0, r7:0,
							w8:0, r8:0,
							w9:0, r9:0,
							w10:0, r10:0
						}
					]	
				},
			]	
    	}
	}

		
	componentWillMount(){
		
		const groups = [
				{id:1, name:'Triceps'},
				{id:2, name:'Biceps'},
				{id:3, name:'Quadricep Compound'},
				{id:4, name:'Quadricep Isolation'},
				{id:5, name:'Hamstring Compound'},
				{id:6, name:'Hamstring Isolation'},
				{id:7, name:'Glutes'},
				{id:8, name:'Calves'},
				{id:9, name:'Chest Compound'},
				{id:10, name:'Chest Isolation'},
				{id:11, name:'Shoulder'},
				{id:12, name:'Lateral Deltoid'},
				{id:13, name:'Posterior Deltoid'},
				{id:14, name:'Back'},
				{id:15, name:'Abdominals'},
				{id:16, name:'Squat'},
				{id:17, name:'Dead Lift'},
				{id:18, name:'Bench Press'}
		]

		for(let d=0;d<this.state.howmanydays;d++) {
			this.state.grupos[d]  = groups.map(
				group => 
					<option value={group.id}>
						{group.name}
					</option>
			)
  		}

  		console.log("GRUPOSSSSSSSSSSSSS")
		console.log(this.state.grupos)


		//this.props.dispatch(setUserName('ivelton de queiroz'))	
		//this.props.dispatch(setUserAge(47))
		fetch('/getstudents')	
			.then(res => res.json())
            .then(data => {
              this.props.dispatch(fetchStudents(data));
              //console.log("after FETCH Students")
        })
		

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

	createGroupSelect(){

	}

	handleCellClick (rowNumber, columnNumber, evt) {
		//console.log("handleCellClick")
		//console.log("rowNumber", rowNumber)
		//console.log("columnNumber", columnNumber)
		
  		//console.log("evt.target.dataset.tableday")
  		//console.log(evt.target.dataset.tableday)
  		//console.log("evt.target.className")
  		//console.log(evt.target.className)

  		

  		//var currentTarget = evt.currentTarget.dataset;
  		//console.log("ev.currenttarget", currentTarget)
        //console.log('Selected Value: ' + currentTarget.options[currentTarget.selectedIndex].value);
        //console.log('Selected data: ' + currentTarget.options[currentTarget.selectedIndex].dataset.id);
	}

	setGroup(evt){
		console.log("setGroup")
		//console.log("index")
		//console.log(index)
		//console.log(value)
		//console.log("evt.target.dataset.tableday")
  		//console.log(evt.target.dataset.tableday)

  		let day = evt.target.dataset.tableday;
  		let row = evt.target.dataset.row;
  		let val = evt.nativeEvent.target.value
  		let grupo = evt.nativeEvent.target[val-1].text

		const items = this.state.dayItem;
		console.log("Current key ", this.state.current_key)
		console.log("Value ", val)
		console.log("Day ", day)
		console.log("table row", row)
		console.log("GRUPO", grupo)

		const exercises = this.props.exercises
		
		let	filteredExercises = exercises.filter((el) => el.group==grupo)
		console.log("filteredExercises",filteredExercises)
		

		//if(filteredExercises.length>0 && this.updateExercise) {
		 //	this.firstExerciseId = filteredExercises[0].id;
			//this.props.dispatch(setDropExercise(this.firstExerciseId))
			//this.updateExercise = false;
			//this.refs.numSets.focus()

		//}


		items[day-1].sets[row].group= val;
		items[day-1].sets[row].exercise=1;
		
		
		//let item = this.state.dayItem[1].sets[0].group;

		this.setState({
      		items
    	});

		console.log("itemitemitemitemitemitem")
		console.log(this.state.dayItem)
	}

	_onRowSelection(key, day) {
  		//console.log("dayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
  		//console.log(day)
  		//this.setState({
  		//	current_key:key
  		//})
  		//console.log("key changing")

  		//console.log(key)
  		//console.log("deselect")
  		
	}

	setExercise(value){
		//console.log("set dropexercise=", value)
		//this.refs.numSets.focus()
		this.props.dispatch(setDropExercise(value))
	}

	setDropExercise(evt, index, value){
		//this.refs.numSets.focus()
		this.props.dispatch(setDropExercise(value))
	}

	
	handleRequestClose = () => {
		console.log("handleRequestClose")
		this.setState({
      		open: false,
    	});
  	}
    
    handleClose = () => {
		console.log("handle Close")
		this.setState({
      		open2: false,
    	});
  	}

  	handleSave = () => {
		console.log("handle save")
		this.setState({
      		openSave: false,
    	});
  	}

  	handleSaveClick = () => {
		console.log("handle save click")
		this.setState({
      		openSave: true
    	});
  	}

  	onWeekChange(evt, index, value){
  		console.log("onWeekChange...");
  		this.props.dispatch(setWeek(value))
  		this.setState({
      		saveDisabled:true	
    	});
    	
  	}
     
	addSet(){

		const numsets = this.refs.numSets.getValue();
		const numreps = this.refs.numReps.getValue();
		console.log("numsets",numsets)
		if(isNaN(parseInt(numsets)) || isNaN(parseInt(numreps))) {
			console.log("invalid")
			this.setState({
      			open2: true,
    		});
			this.refs.numSets.getInputNode().value = ''
			this.refs.numReps.getInputNode().value = ''
			//this.refs.numSets.focus()
			return
		} 

		let allgroups = this.props.groups
		let groupname = allgroups[this.props.drops.drop_group-1].name

		let allexercises = this.props.exercises
		const exercisename = allexercises[this.props.drops.drop_exercise-1].name
 		console.log("exercisename", exercisename) 
		
		let current_week = this.state.cur_week
		console.log("************* current_week:"+current_week)

		let newSet = {key:1, week:1, group:groupname, ex:exercisename, sets:numsets, reps:numreps }
		this.props.dispatch(addSet(newSet))
		console.log("newSet>",newSet)
		this.refs.numSets.getInputNode().value = ''
		this.refs.numReps.getInputNode().value = ''
		this.refs.prescWeight.getInputNode().value = ''
		this.setState({
      		open: true,
      		saveDisabled:false,
      		buttonStyles: {
				marginTop: 10,
				display:'block'
			}
    	});
    	console.log("disabled true")
    	//this.refs.saveProgram.setDisabled(true);
		//this.refs.dropGrupo.focus()
	}

	setUser1(){
		console.log("setUsr1")
		this.props.dispatch(setUser(1))
	}

	
	handleDelete(){
		console.log("handleDelete")
	}

	OnRowSelection(key){
		console.log("OnRowSelection", key)
	}

	/*handleCellClick (rowNumber, columnNumber, evt) {
  		console.log(rowNumber,columnNumber, event.target.innerHTML);
  		if(columnNumber==5){
  			this.props.dispatch(removeSet(rowNumber))
  		}
	}
*/

	fetchStudentsServer(){
		//console.log("FETCH Students server")
		fetch('/students')	
			.then(res => res.json())
            .then(data => {
              console.log(data);
        })
		//console.log("after FETCH Students")
	}

	generateSlots(){
		console.log("generateSlots")
	}	


    render(){

		let howmanydays = this.state.howmanydays

		
		this.props.dispatch(fetchGroups())
		this.props.dispatch(fetchExercises())
		



		const {drops} = this.props
		const selectedGroup = drops.drop_group
		const allGroups = this.props.groups
		const grupo = allGroups[selectedGroup-1]
		let groupName = "none"
		if(typeof grupo !='undefined'){
			groupName=grupo.name
		}


		const {groups} = this.props
		const mappedGroups = groups.map(
			group => 
				<MenuItem className="table1" 	data-my="day 11"
					value={group.id} 
					key={group.id}
					primaryText={group.name}
					day="day1"

				/>
		)


		const mappedGroups2 = groups.map(
			group => 
				<option value={group.id}>
					{group.name}
				</option>
		)



		const {exercises} = this.props
		//console.log("GROUP NAME")
		//console.log(groupName)


		let	filteredExercises = exercises.filter((el) => el.group==groupName[0])
		//console.log("filteredExercises",filteredExercises)
		if(filteredExercises.length>0 && this.updateExercise) {
		 	this.firstExerciseId = filteredExercises[0].id;
			this.props.dispatch(setDropExercise(this.firstExerciseId))
			this.updateExercise = false;
			//this.refs.numSets.focus()

		}

		const mappedExercises = filteredExercises.map(
			exercise => 
				<MenuItem 
					value={exercise.id} 
					key={exercise.id}
					primaryText={exercise.name} 
				/>
		)

		const mappedExercises2 = filteredExercises.map(
			exercise => 
				<option value={exercise.id}>
					{exercise.name}
				</option>
		)


//value={this.state.dayItem[d].sets[i].exercise}
    	const mappedSets = []

		for(let d=0;d<howmanydays;d++) {
			let setsDay =  this.state.dayItem[d].sets;
			mappedSets[d] = setsDay.map(
				(set,i) => 
					<TableRow key={i+1} day={d}>
						<TableRowColumn key={i+1} data-my="day 1">
							<select  
									data-row={i} data-tableday={d+1} 
									onChange={this.setGroup.bind(this)}>
						   		{this.state.grupos[i]}	
							</select>
						</TableRowColumn>
						<TableRowColumn >
							<select>
						   		{mappedExercises2}	
							</select>
							
						</TableRowColumn>
						<TableRowColumn data-my="day 2">{set.sets}</TableRowColumn>
						<TableRowColumn data-my="day 3">{set.reps}</TableRowColumn>
						<TableRowColumn data-my="day 4">{set.weight}</TableRowColumn>
						<TableRowColumn data-my="day 5">
							<IconButton onClick={this.handleDelete}><Delete /></IconButton >
						</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA100}}>{set.w1}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA100}}>{set.r1}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA200}}>{set.w2}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA200}}>{set.r2}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA100}}>{set.w3}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA100}}>{set.r3}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA200}}>{set.w4}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA200}}>{set.r4}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA100}}>{set.w5}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA100}}>{set.r5}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA200}}>{set.w6}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA200}}>{set.r6}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA100}}>{set.w7}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA100}}>{set.r7}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA200}}>{set.w8}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA200}}>{set.r8}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA100}}>{set.w9}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA100}}>{set.r9}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA200}}>{set.w10}</TableRowColumn>
						<TableRowColumn style={{backgroundColor:lightBlueA200}}>{set.r10}</TableRowColumn>
						
					</TableRow>
			) 
		}
	
		
		let dayTable=[]
		for(let i=0;i<howmanydays;i++) {
			dayTable[i] =
			<div>
				<h2>Day {i+1}</h2> 
				<Table ref="tester" data-my-row-identifier="aaaa" onCellClick={this.handleCellClick}  fixedHeader={false} style={{tableLayout: 'auto'}} bodyStyle={{overflow:'visible'}}>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
				      <TableRow>
				        <TableHeaderColumn >GROUP</TableHeaderColumn>
				        <TableHeaderColumn >EXERCISE</TableHeaderColumn>
				        <TableHeaderColumn >SETS</TableHeaderColumn>
				        <TableHeaderColumn >REPS</TableHeaderColumn>
				        <TableHeaderColumn >WEIGHT</TableHeaderColumn>
				        <TableHeaderColumn >DEL</TableHeaderColumn>
				        <TableHeaderColumn >Weight 1</TableHeaderColumn>
				        <TableHeaderColumn >Rep 1 </TableHeaderColumn>
				        <TableHeaderColumn >Weight 2</TableHeaderColumn>
				        <TableHeaderColumn >Rep 2</TableHeaderColumn>
				        <TableHeaderColumn >Weight 3</TableHeaderColumn>
				        <TableHeaderColumn >Rep 3</TableHeaderColumn>
				        <TableHeaderColumn >Weight 4</TableHeaderColumn>
				        <TableHeaderColumn >Rep 4</TableHeaderColumn>
				        <TableHeaderColumn >Weight 5</TableHeaderColumn>
				        <TableHeaderColumn >Rep 5</TableHeaderColumn>
				        <TableHeaderColumn >Weight 6</TableHeaderColumn>
				        <TableHeaderColumn >Rep 6</TableHeaderColumn>
				        <TableHeaderColumn >Weight 7</TableHeaderColumn>
				        <TableHeaderColumn >Rep 7</TableHeaderColumn>
				        <TableHeaderColumn >Weight 8</TableHeaderColumn>
				        <TableHeaderColumn >Rep 8</TableHeaderColumn>
				        <TableHeaderColumn >Weight 9</TableHeaderColumn>
				        <TableHeaderColumn >Rep 9</TableHeaderColumn>
				        <TableHeaderColumn >Weight 10</TableHeaderColumn>
				        <TableHeaderColumn >Rep 10</TableHeaderColumn>
				      </TableRow>
			    	</TableHeader>
					<TableBody deselectOnClickaway={false} displayRowCheckbox={false}>
						{mappedSets[i]}
					</TableBody>	
				</Table>
			</div>
		}
		
    	const style = {
			marginLeft	: 20,
			marginRight	: 20,
		};	

		const setsStyles = {
  			marginLeft	: 20,
  			width: 70
		};

		const dropsStyles = {
  			marginLeft	: 20,
  			width: 70
		};	
	

		const studentsStyles = {
		  height: 340,
		  width: 380,
		  textAlign: 'left',
		  marginLeft: 0,
		};

		const layoutStyles = {
		  height: 240,
		  width: 380,
		  textAlign: 'left',
		  marginLeft: 0,
		  marginBottom: 20
		};
		
		const exercisesStyles = {
		  	marginTop: 100
		};

		const gridStyle = {
			marginLeft	: 10,
			marginRight	: 10,
		};


		const redStyles = {
			textAlign: 'center',
			backgroundColor: '#FF1744'
		};

		const greenStyles = {
			textAlign: 'center',
			backgroundColor: '#388E3C'
		};

		const blueStyles = {
			textAlign: 'center',
			backgroundColor: '#0D47A1'
		};

   


		

		
		const mappedStudents = this.props.students.students.map(
			student => 
				<ListItem
					key = {student.id}
			       	primaryText={student.name}
			        leftAvatar={<Avatar src={student.img} />}
			    />
		)

	
		/*const mappedDays = this.state.days.map(
			day => 
				<MenuItem 
					value={week.id} 
					key={week.id}
					primaryText={week.name} 
				/>
		)	
	*/

		const mappedWeeks = this.state.weeks.map(
			week => 
				<MenuItem 
					value={week.id} 
					key={week.id}
					primaryText={week.name} 
				/>
		)
		
		let current_sets = this.props.exsets.map(
			exset =>
				<TableRow>
			        <TableRowColumn style={{width:'46%'}}>{exset.ex}</TableRowColumn>
			        <TableRowColumn style={{width:'14%'}}>{exset.sets}</TableRowColumn>
			        <TableRowColumn style={{width:'14%'}}>{exset.reps}</TableRowColumn>
			        <TableRowColumn style={{width:'14%'}}>{exset.reps}</TableRowColumn>
			        <TableRowColumn style={{width:'14%'}}>
			        	<IconButton onClick={this.handleDelete}>
			        		<Delete />
			        	</IconButton >

      				</TableRowColumn>
			     </TableRow>  
		)
	
		const programDays = [
			{ day:1 },
			{ day:2 },
			{ day:3 },
			{ day:4 }
		]

		const mappedDays = programDays.map(
			day =>
			<div>
				<h3>Day {day.day}</h3>
				<Table  fixedHeader={false} style={{tableLayout: 'auto'}} bodyStyle={{overflow:'visible'}}>

				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
			      <TableRow>
			        <TableHeaderColumn >GROUP</TableHeaderColumn>
			        <TableHeaderColumn >EXERCISE</TableHeaderColumn>
			        <TableHeaderColumn >SETS</TableHeaderColumn>
			        <TableHeaderColumn >REPS</TableHeaderColumn>
			        <TableHeaderColumn >WEIGHT</TableHeaderColumn>
			        <TableHeaderColumn >DEL</TableHeaderColumn>
			        <TableHeaderColumn >Weight 1</TableHeaderColumn>
			        <TableHeaderColumn >Rep 1 </TableHeaderColumn>
			        <TableHeaderColumn >Weight 2</TableHeaderColumn>
			        <TableHeaderColumn >Rep 2</TableHeaderColumn>
			        <TableHeaderColumn >Weight 3</TableHeaderColumn>
			        <TableHeaderColumn >Rep 3</TableHeaderColumn>
			        <TableHeaderColumn >Weight 4</TableHeaderColumn>
			        <TableHeaderColumn >Rep 4</TableHeaderColumn>
			        <TableHeaderColumn >Weight 5</TableHeaderColumn>
			        <TableHeaderColumn >Rep 5</TableHeaderColumn>
			        <TableHeaderColumn >Weight 6</TableHeaderColumn>
			        <TableHeaderColumn >Rep 6</TableHeaderColumn>
			        <TableHeaderColumn >Weight 7</TableHeaderColumn>
			        <TableHeaderColumn >Rep 7</TableHeaderColumn>
			        <TableHeaderColumn >Weight 8</TableHeaderColumn>
			        <TableHeaderColumn >Rep 8</TableHeaderColumn>
			        <TableHeaderColumn >Weight 9</TableHeaderColumn>
			        <TableHeaderColumn >Rep 9</TableHeaderColumn>
			        <TableHeaderColumn >Weight 10</TableHeaderColumn>
			        <TableHeaderColumn >Rep 10</TableHeaderColumn>

			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			    	<SetList mappedGroups={mappedGroups} mappedExercises={mappedExercises}/>

			    	<TableRow>
        				<TableRowColumn >
        					<DropDownMenu  value={this.props.drops.drop_group} onChange={this.setDropGroup.bind(this)}>
						   		{mappedGroups}	
							</DropDownMenu>
						</TableRowColumn>
        				
        				<TableRowColumn >
        					<DropDownMenu ref="dropEx" value={this.props.drops.drop_exercise} onChange={this.setDropExercise.bind(this)}>
						   		{mappedExercises}
							</DropDownMenu>
        				</TableRowColumn>

        				<TableRowColumn >
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>

        				<TableRowColumn >
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
						
						<TableRowColumn >
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				
        				<TableRowColumn >
        					<IconButton onClick={this.handleDelete}>
			        			<Delete />
			        		</IconButton >
        				</TableRowColumn>


        				<TableRowColumn style={{backgroundColor:lightBlueA100}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA100}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				
        				<TableRowColumn style={{backgroundColor:lightBlueA200}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA200}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				
        				<TableRowColumn style={{backgroundColor:lightBlueA100}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA100}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				
        				<TableRowColumn style={{backgroundColor:lightBlueA200}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA200}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				
        				<TableRowColumn style={{backgroundColor:lightBlueA100}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA100}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA200}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA200}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA100}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA100}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA200}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA200}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA100}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA100}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA200}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
        				<TableRowColumn style={{backgroundColor:lightBlueA200}}>
        					<input type="number" min="1" max="10"></input>
        				</TableRowColumn>
      				</TableRow>
			    </TableBody>
			</Table>    
			</div>	
		)

		return(
		<div>	
			<ToolbarLayout/>	
			<Grid style={gridStyle}>
				<Row className="show-grid">
        			<Col xs={12} md={12} lg={12}>
						{dayTable}        			
        			</Col>
        		</Row>	
        		
				<Row className="show-grid">
        			<Col xs={12} md={12} lg={12}>
        				<Card style={{marginBottom:20}}>
        					<CardHeader title={this.state.users[this.props.program.user].name}>
        						<table>
        							<tr>
        								<td>Program for</td>
        								<td>
        									<DropDownMenu ref="dropWeeks" value={this.props.program.week} onChange={this.onWeekChange.bind(this)}>
						   						{mappedWeeks}	
											</DropDownMenu>
        								</td>
        								<td>Days</td>
        								<td>
        									<input type="number" min="1" max="10"></input>
        								</td>
        								<td>
        									<FlatButton label="Generate Program" primary={true}
        										onClick={this.generateSlots} />
        								</td>
        							</tr>
        						</table>	
							</CardHeader>		
        				</Card>
        			</Col>
        		</Row>
        		<Row className="show-grid">
        			<Col xs={12} md={12} lg={12}>
        				{mappedDays}
        			</Col>
        		</Row>			
        		<Row className="show-grid">
        			<Col xs={12} md={12} lg={12}>
        			  <Card style={{marginBottom:20}}>
        			  	<div>
        			  		&nbsp;&nbsp;Add Group/Exercises:
        			  		<Divider/>
        			  	</div>	
        			  	<table>
						<tr>
						<td>
						<DropDownMenu  value={this.props.drops.drop_group} onChange={this.setDropGroup.bind(this)}>
						   {mappedGroups}	
						</DropDownMenu>
						</td>
						<td>
						<DropDownMenu ref="dropEx" value={this.props.drops.drop_exercise} onChange={this.setDropExercise.bind(this)}>
						   {mappedExercises}
						</DropDownMenu>
						</td>
						<td>
						<TextField ref="numSets"   floatingLabelText="# of Sets"    style={setsStyles}/>
						</td>
						<td>
						<TextField ref="numReps"   floatingLabelText="# of Reps"    style={setsStyles}/>
						</td>
						<td>
						<TextField ref="prescWeight"   floatingLabelText="Weight"    style={setsStyles}/>
						</td>
						<td>
						<FloatingActionButton mini={true} onClick={this.addSet.bind(this)} disabled={false} style={style}>
		      				<ContentAdd />
		    			</FloatingActionButton>
		    			</td>
						</tr>
						</table>			
					  </Card>
        			</Col>
        		</Row>	
        		<Row className="show-grid">
        			<Col xs={12} md={12} lg={12}>
        				<ExercisesList style="exercisesStyles"  lista={current_sets}  />
		    			<Snackbar
		          			open={this.state.open}
		          			message="Set added to the Program"
		          			autoHideDuration={2000}
		          			onRequestClose={this.handleRequestClose}
		          			bodyStyle={blueStyles}
		        		/>
		        		<div>
		    			<Divider/>
            				<RaisedButton onClick={this.handleSaveClick} ref="saveProgram" style={this.state.buttonStyles} label="SAVE PROGRAM" primary={true} labelPosition="before" disabled={this.state.saveDisabled} icon={<DoneAll />}/>
		    			</div>


						<Snackbar
		          			open={this.state.open2}
		          			message="Please Inform Valid Sets/Reps"
		          			autoHideDuration={2000}
		          			onRequestClose={this.handleClose}
		          			bodyStyle={redStyles}
		        		/>

		        		<Snackbar
		          			open={this.state.openSave}
		          			message="Program Saved"
		          			autoHideDuration={2000}
		          			onRequestClose={this.handleSave}
		          			bodyStyle={greenStyles}
		        		/>

        			</Col>
        		</Row>			
        	</Grid>
        </div>		
		)	
	}
}

export default LayoutMaker;