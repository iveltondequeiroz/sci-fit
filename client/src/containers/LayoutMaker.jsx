import React, {Component} from 'react'

const moment = require('moment');


import ExercisesList from '../components/ExercisesList.jsx'


import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Snackbar from 'material-ui/Snackbar'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import {DropDownMenu, MenuItem} from 'material-ui'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import StrikethroughS from 'material-ui/svg-icons/editor/strikethrough-s'

import {lightBlueA100, lightBlueA200, red500, 	indigo500, indigoA400, blue50, lightBlue900} from 'material-ui/styles/colors'

import Dialog from 'material-ui/Dialog';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import Divider from 'material-ui/Divider';
import Home from 'material-ui/svg-icons/action/home'
import Print from 'material-ui/svg-icons/action/print'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'
import Save from 'material-ui/svg-icons/content/save'
import Delete from 'material-ui/svg-icons/action/delete';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Restore from 'material-ui/svg-icons/action/restore';
import SwapVert from 'material-ui/svg-icons/action/swap-vert'
import Assignment from 'material-ui/svg-icons/action/assignment'
import Visibility from 'material-ui/svg-icons/action/visibility'
import FitnessCenter from 'material-ui/svg-icons/places/fitness-center'



import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward'

import IconButton from 'material-ui/IconButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Grid, Row, Col, Clearfix, Image} from 'react-bootstrap'

import {connect} from 'react-redux'
import {fetchExercises, fetchGroups} from '../actions/exercisesActions'
import {setDropGroup, setDropExercise} from '../actions/dropActions'
import {addSet, removeset, setWeek, setUser} from '../actions/programActions'
import {fetchStudents} from '../actions/studentsActions'

import ToolbarLayout from '../components/ToolbarLayout'
import SetList from '../components/SetList'

/*
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

*/


class LayoutMaker extends Component {
	constructor() {
		super()
		this.firstExerciseId=0;
		this.updateExercise = true;
		this.state = {
			username:"Paul Attard",
			avatarimg:"paul.png",
			studentName:"none",
			programName:"none",
			templateName:"none",
			program:null,
			programs:[],  
			templates:[],
			students:[],
			dayItem:[],
			selectedStudent:0,
			numberOfSets:2,
			openTemplateSave: false,
			selWeek:0,
			programClean:true,
			howmanydays:1,
			howmanyweeks:1,
			zeroProgram:true,
			generateOk: false,
			grupo:[],
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
			defaultSet : {
				id:0,
				group:1, 
				order:'',
				exercise:1,
				manualex:'',
				fsidrop:1,
				fsival:0, 
				sets:1, reps:1, weight:1,
				w1:0, r1:0,
				w2:0, r2:0,
				w3:0, r3:0,
				w4:0, r4:0,
				w5:0, r5:0,
				w6:0, r6:0,
				note:'',
				amrap:false,
				amrapmsg:'n'
			},
			selectedDrop:null,
			prescribedSelect:null,
			chooseRIR:[
        		{id:0, name:"0 (Max effort)"},
        		{id:1, name:"0.5 (Maybe 1 more)"},
        		{id:2, name:"1 (Definitely 1 more)"},
        		{id:3, name:"1.5 (Maybe 2 more)"},
        		{id:4, name:"2 (Definitely 2 more)"},
        		{id:5, name:"2.5 (Maybe 3 more)"},
        		{id:6, name:"3 (Definitely 3 more)"},
        		{id:7, name:"3.5 (Maybe 4 more)"},
        		{id:8, name:"4 (Definitely 4 more)"}
      		],
	  		prescribedRIR:[
	        	{id:0, name:"0 Reps left - (Go To Failure)"},
	        	{id:1, name:"0.5 (Just shy of failure)"},
	        	{id:2, name:"1 (Stop 1 rep short of failure)"},
	        	{id:3, name:"1.5 (Stop 1.5 reps short of failure)"},
	        	{id:4, name:"2 (Stop 2 reps short of failure)"},
	        	{id:5, name:"2.5 (Stop 2.5 reps short of failure)"},
	        	{id:6, name:"3 (Stop 3 reps short of failure)"},
	        	{id:7, name:"3.5 (Stop 3.5 reps short of failure)"},
	        	{id:8, name:"4 (Stop 4 reps short of failure)"}
			],
			groups:[
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
				{id:18, name:'Bench Press'},
				{id:19, name:'Manual'}
			],
			exercises:[ 
				{id:1, group:"Triceps", name:"Tricep Straight Bar Pushdowns (Cable Machine)", progression:"double" },
				{id:2, group:"Triceps", name:"Tricep Rope Pulldowns (Cable Machine)", progression:"double"},
				{id:3, group:"Triceps", name:"Tricep Skull Crushers (Curl Bar)", progression:"double"},
				{id:4, group:"Triceps", name:"Tricep Close Grip Bench Press (Barbell)", progression:"linear"},
				{id:5, group:"Triceps", name:"Tricep Kickback (Dumbbell)", progression:"double"},
				{id:6, group:"Biceps", name:"Bicep Concentration Curl (Dumbbell)", progression:"double"},
				{id:7, group:"Biceps", name:"Bicep Seated Curl (Dumbbell)", progression:"double"},
				{id:8, group:"Biceps", name:"Bicep Preacher Curl (Curl Bar)", progression:"double"},
				{id:9, group:"Biceps", name:"Bicep Curl (Barbell)", progression:"double"},
				{id:10, group:"Quadricep Compound", name:"Hack Squat (Machine)", progression:"linear"},
				{id:11, group:"Quadricep Compound", name:"Front Squat (Barbell)", progression:"linear"},
				{id:12, group:"Quadricep Compound", name:"Leg Press", progression:"linear"},
				{id:13, group:"Quadricep Isolation", name:"Leg Extensions", progression:"double"},
				{id:14, group:"Quadricep Isolation", name:"Leg Extensions (Single Leg)", progression:"double"},
				{id:15, group:"Quadricep Isolation", name:"Static Lunge (Dumbbell)", progression:"double"},
				{id:16, group:"Quadricep Isolation", name:"Rear Foot Elevated Lunge", progression:"double"},
				{id:17, group:"Hamstring Compound", name:"Stiff Legged Deadlift (Barbell)", progression:"linear"},
				{id:18, group:"Hamstring Isolation", name:"Hamstring Curls (Machine)", progression:"double"},
				{id:19, group:"Hamstring Isolation", name:"Single Hamstring Curls (Machine)", progression:"double"},
				{id:20, group:"Glutes", name:"Glute Bridge (Barbell)", progression:"linear"},
				{id:21, group:"Calves", name:"Standing Calf Raise (Machine)", progression:"double"},
				{id:22, group:"Calves", name:"Seated Calf Raise (Machine)", progression:"double"},
				{id:23, group:"Chest Compound", name:"Decline Chest Press (Dumbbell)", progression:"double"},
				{id:24, group:"Chest Compound", name:"Decline Chest Press (Barbell)", progression:"linear"},
				{id:25, group:"Chest Compound", name:"Flat Chest Press (Dumbbell)", progression:"double"},
				{id:26, group:"Chest Compound", name:"Chest Press Machine", progression:"double"},
				{id:27, group:"Chest Isolation", name:"Chest Cable Fly (Machine)", progression:"double"},
				{id:28, group:"Chest Isolation", name:"Decline Fly (Dumbbell)", progression:"double"},
				{id:29, group:"Chest Isolation", name:"Flat Bench Fly (Dumbbell)", progression:"double"},
				{id:30, group:"Shoulder", name:"Standing Shoulder Press (Barbell)", progression:"linear"},
				{id:31, group:"Shoulder", name:"Seated Shoulder Press (Barbell)", progression:"linear"},
				{id:32, group:"Shoulder", name:"Seated Shoulder Press (Dumbbell)", progression:"double"},
				{id:33, group:"Shoulder", name:"Machine Shoulder Press", progression:"double"},
				{id:34, group:"Lateral Deltoid", name:"Shoulder Side Lateral Raise (Dumbbell)", progression:"double"},
				{id:35, group:"Lateral Deltoid", name:"Upright Row", progression:"double"},	
				{id:36, group:"Posterior Deltoid", name:"Shoulder Reverse Fly (Machine)", progression:"double"},
				{id:37, group:"Posterior Deltoid", name:"Shoulder Reverse Fly - Chest Supported (Dumbbell)", progression:"double"},	
				{id:38, group:"Back", name:"Lat Pulldown (Underhand + Narrow Grip)", progression:"double"},	
				{id:39, group:"Back", name:"Lat Pulldown (Regular Overhand Grip)", progression:"double"},	
				{id:40, group:"Back", name:"Single Arm Row (Dumbbell)", progression:"double"},	
				{id:41, group:"Back", name:"Bent Over Row (Barbell)", progression:"linear"},	
				{id:42, group:"Back", name:"Chin up (Underhand Grip)", progression:"double"},	
				{id:43, group:"Back", name:"Chin up (Overhand Grip)", progression:"double"},	
				{id:44, group:"Back", name:"Chest Supported Row (Dumbbell)", progression:"double"},	
				{id:45, group:"Back", name:"Seated Cable Row", progression:"double"},	
				{id:46, group:"Back", name:"Machine Back Row (Machine of choice with a chest support)", progression:"double"},	
				{id:47, group:"Back", name:"Close Grip Attachment Pulldown", progression:"double"},
				{id:48, group:"Abdominals", name:"Crunch With Arms Extended", progression:"double"},	
				{id:49, group:"Abdominals", name:"Hanging Leg Raises", progression:"double"},	
				{id:50, group:"Abdominals", name:"Lying Leg Raises", progression:"double"},	
				{id:51, group:"Abdominals", name:"Oblique Side Bends (Dumbbell)", progression:"double"},
				{id:52, group:"Squat", name:"Front Squat (Barbell)", progression:"linear"},  
				{id:53, group:"Squat", name:"Leg Press", progression:"linear"},  
				{id:54, group:"Squat", name:"Smith Machine Squat", progression:"linear"},
				{id:55, group:"Squat", name:"Hack Squat (Machine)", progression:"linear"},	  
				{id:56, group:"Dead Lift", name:"Rack Pulls (Barbell)", progression:"linear"},	  
				{id:57, group:"Dead Lift", name:"Sumo Dumbbell Dead Lift", progression:"linear"},	  
				{id:58, group:"Dead Lift", name:"Sitff Legged Dead Lift", progression:"linear"},	  
				{id:59, group:"Bench Press", name:"Decline Chest Press (Barbell)", progression:"linear"},
				{id:60, group:"Bench Press", name:"Flat Chest Press (Dumbbell)", progression:"double"},
				{id:61, group:"Bench Press", name:"Machine Chest Press", progression:"double"},
			]
    	}
	}

	getInitialState() {
     	return {info: "loading ..."};
  	}

  	componentWillMount(){

		this.groupsGet()
		this.exercisesGet()
  
		// build sets
		//this.fetchExercises()

		let programs_length=this.state.programs.length;
			
		console.log("PROGRAMA ZERADO")
		let prog = {
			id:0,
			name:"Program 1",
			weeks:[]
		}
		
			this.state.programs.push(prog)
			this.setState({
				zeroProgram:true,
				programName:"Program 1"
			})

			//console.log(this.state)

	}


  	componentDidMount(){

  		//console.log("this.state.info")
  		//console.log(this.state.info)

		let prescribedSets = this.state.prescribedRIR.map(
		    rir =>
		       <option value={rir.id} id={rir.id} key={rir.id}>{rir.name}</option> 
		)

		let prescribedSelect = (
			<select>
				{prescribedSets}
			</select>
		) 

		this.setState({
			selectedDrop:prescribedSelect,
			prescribedSelect:prescribedSelect
		})


  		let dbstudents = this.studentsGet()
		//console.log("DBSTUDENTS")
		//console.log(dbstudents)
	
	
  		let dbprograms = this.programsGet()
		//console.log("DBPROGRAMS")
		//console.log(dbprograms)

		let dbtemplates = this.templatesGet()
		//console.log("dbtemplates")
		//console.log(dbtemplates)

	
  	}


	studentsGet(){
		//console.log("studentsGet()")

		fetch('/getstudents')	
			.then(res => res.json())
            .then(data => {
            	if(data.length!=0) {
      				this.setState({
              			students:data
      				})

      				console.log("studentsGet() data")
      				console.log(data)
      			}
        })
   
	}


	programsGet(){
		console.log("programsGet()***************")
		console.log("this.state.selWeek>>>", this.state.selWeek)

// FIX FOR MORE THAN ONE PROGRAM
// FIX FOR MORE THAN ONE PROGRAM

		fetch('/getprograms')	
			.then(res => res.json())
            .then(data => {
              	console.log("FETCHING programsGet")
              	console.log("this.state.studentName", this.state.studentName)
              	//console.log(data.length)	
              	
      			if(data.length!=0) {
      				let student = this.state.studentName
      				let prog = 'none'
      				for(let p=0;p<data.length;p++){
      					prog = data[p]
      					if(prog.user==student) { break }
      				}
      				let weekzerodays = data[0].weeks[0].days.length
      				this.setState({
              			programs:data,
              			program:prog,
              			howmanydays: weekzerodays
      				}, function(){
      					//let sets =

      					console.log("after fetch programsGet()")
      					console.log(this.state.programs)
      					console.log(this.state.program)				
      				}
      				)
      			}
        })
	}	


	templatesGet(){
		//console.log("templatesGet()")
		
		fetch('/gettemplates')	
			.then(res => res.json())
            .then(data => {
              	//console.log("after FETCH templatesGet")
              	//console.log(data)
              	//console.log(data.length)
              	//this.setState({
      			//	info:"loaded"
      			//})
      			if(data.length!=0) {
      				//console.log("DATA !=0")
      				//console.log(data[0].weeks[0].days.length)
      				this.setState({
              			templates:data      				
              		})
      			}
        })
	}	


	groupsGet(){
		this.setGroups()
    /*console.log("groupsGet()")
    fetch('/getgroups') 
      .then(res => res.json())
            .then(data => {
                console.log("after FETCH groups")
                //console.log(data.length)
                //if(data.length!=0) {
                //let weekzerodays = data[0].weeks[0].days.length
                //console.log("groups,,,,,,,,,,,,,,,,,,,,,,,,,,,")
                //console.log(data)
                
              this.setState({
                groups: data   
              }, function(){
              	 this.setGroups()
                console.log("STATE OK")
              })
        })*/    
  	}

  exercisesGet(){
    /*console.log("exercisesGet()")
    fetch('/getexercises') 
      .then(res => res.json())
            .then(data => {
                console.log("after FETCH exercisesGet")
                //console.log(data.length)
                //if(data.length!=0) {
                //let weekzerodays = data[0].weeks[0].days.length
                //console.log("exercises,,,,,,,,,,,,,,,,,,,,,,,,,,,")
                //console.log(data)
                
              this.setState({
                    exercises: data   
              }, function(){
                console.log("STATE OK")
              })
        })*/
  	} 

	endOfCycle(){
		console.log("endOfCycle<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
		this.state.program.endcycle=true
		fetch('/upsertprogram', {
	            	method: 'POST',
			            headers: {
		              "Content-Type": "application/json"
		            },
	            	body: JSON.stringify(
	            		{program:this.state.program, user:this.state.studentName}
	            	)
	          	})

		
		console.log("endcycle update")
		this.setState({
				zeroProgram:true,
		})
		this.programsGet()
	}	


	generateProgram(){
		console.log("generateProgram")
		console.log(this.state.studentName)
		console.log(this.state.templateName)
		console.log(this.state.programName)

		let newprogram = {}

		if(this.state.templateName!='none') {		
			console.log("this.state.templateName")
			console.log(this.state.templateName)
			console.log(this.state.templates)
			let selectedTemplate = null;
			for(let t=0;t<this.state.templates.length;t++){
				if(this.state.templates[t].name==this.state.templateName) {
					selectedTemplate = this.state.templates[t]
					break
				}
			}
			console.log("selectedTemplate")
			console.log(selectedTemplate)
			let time = moment().format('DD/MMM/YY')
			newprogram  = {
				user: this.state.studentName,
				name: this.state.programName,
				weeks:selectedTemplate.weeks,
				endcycle:false,
				createdby:this.state.username+"-"+time
			}
			
			//JSON.parse(JSON.stringify(selectedTemplate)); 
			console.log("newprogram")
			console.log(newprogram)
			
			fetch('/upsertprogram', {
         	method: 'POST',
	            headers: {
              "Content-Type": "application/json"
            },
         	body: JSON.stringify(
         		{program:newprogram, user:this.state.studentName}
         	)
       	})

       	this.setState({
       		program:newprogram,
				zeroProgram:false,
				programClean:true
			})

		} else {			
			let days =  this.state.howmanydays
			console.log("GENERATE, NOPROG, this.state.howmanydays=",days)
			let weeks = 1 // this.state.howmanyweeks
			
			//this.fetchExercises()


			//console.log("before Program")
			let time = moment().format('DD/MMM/YY')
			
			let newid = this.state.programs.length
			newprogram = {
				id:newid,
				name:this.state.programName,
				user:this.state.studentName,
				weeks:[],
				endcycle:false,
				createdby:this.state.username+"-"+time
			}	

			let newweek={
				id:0,
				name:"Week 1",
				days:[]
			}

			for(let d=0;d<days;d++){
				let newday = {
					id:d,
					sets:[],
					workoutComplete:false,
					difficulty:'Hard'
				}

				let sets = []
				for(let s=0;s<this.state.numberOfSets;s++) {
					let setobj = Object.assign({}, this.state.defaultSet)
					setobj.id = "1-1"
					sets.push(setobj)
				}
				newday.sets = sets
				newweek.days.push(newday)
			}
			
			newprogram.weeks.push(newweek)

			fetch('/upsertprogram', {
	         	method: 'POST',
		            headers: {
	              "Content-Type": "application/json"
	            },
	         	body: JSON.stringify(
	         		{program:newprogram, user:this.state.studentName}
	         	)
	         })	
       	this.setState({
				program:newprogram,       		
				zeroProgram:false,
				programClean:true
			})
		}

		this.programsGet()
		console.log("after programsGet")
		console.log(this.state.program)
		console.log(this.state.programs)

	}


	setGroups(){
		
		let newgrupo = this.state.groups.map(
			group => 
				<option key={group.id} value={group.id}>
					{group.name}
				</option>
		)
		//console.log("newgrupo")
		//console.log(newgrupo)
		
		let grupo = this.state.grupo
		grupo.push(newgrupo)

		console.log("grupo")
		console.log(grupo)

		this.setState({
			grupo:grupo
		})
		
	}


	addDay(){
		// lembrar que funciona soh para um programa
		console.log("add day",)
		console.log(this.state.programs)
		for(let p=0;p<this.state.programs.length;p++){
			let prog = this.state.programs[p]
			console.log("prog")
			console.log(prog)
			
			if(prog.user==this.state.studentName && prog.endcycle==false) {
				console.log("FOUND FOUND FOUND")
				console.log("selWeek")
				console.log(this.state.selWeek)
				let program = prog
				let weeks = program.weeks[this.state.selWeek]
				
				let newid = weeks.days.length
				console.log("NEW ID")
				console.log(newid)
				
				if(newid==0){

					let newday = {
						id:0,
						sets:[],
						workoutComplete:false,
						difficulty:'Hard'
					}

					let sets = []
					for(let s=0;s<this.state.numberOfSets;s++) {
						let setobj = Object.assign({}, this.state.defaultSet)
						setobj.id = setobj.group+"-"+setobj.exercise
						sets.push(setobj)
					}
					newday.sets = sets
					weeks.days.push(newday)

				} else {
					let lastday = weeks.days[weeks.days.length-1]
					let newday = JSON.parse(JSON.stringify(lastday)); 
					newday.id = newid
					newday.workoutComplete = false
					weeks.days.push(newday)
				}


				
	console.log("adding day adding day adding day adding day adding day adding day")
	console.log("adding day adding day adding day adding day adding day adding day")
	console.log(program)
	console.log(prog)

				
				fetch('/upsertprogram', {
	            	method: 'POST',
			            headers: {
		              "Content-Type": "application/json"
		            },
	            	body: JSON.stringify(
	            		{	program:program, 
	            			user:this.state.studentName}
	            	)
	          	})



				let howmanydays = weeks.days.length;
				console.log("New howmanydays:",howmanydays) 
				this.setState({
					howmanydays:howmanydays,
					program:prog
				})

				break;
			}


		}
		/*let program = this.state.programs[0]
		let weeks = program.weeks[this.state.selWeek]
		let lastday = weeks.days[weeks.days.length-1]
		let newid = weeks.days.length

		//let newday = Object.assign({}, lastday)


		let newday = JSON.parse(JSON.stringify(lastday)); 
		newday.id = newid
		weeks.days.push(newday)

		let howmanydays = weeks.days.length;
		console.log("New howmanydays:",howmanydays) 
		this.setState({
			howmanydays:howmanydays,
			weeks
		})

		*/
		console.log(this.state)
	}



	deleteDay(row){
		console.log("Delete day")
		console.log("row", row)

		console.log(this.state.program._id)

		let prog = this.state.program
		let week = prog.weeks[this.state.selWeek]
		console.log(this.state.program)
		console.log(week.days.length)
		week.days.splice(row,1)
		console.log(week.days.length) 
				
		fetch('/upsertprogram', {
	            	method: 'POST',
			            headers: {
		              "Content-Type": "application/json"
		            },
	            	body: JSON.stringify(
	            		{	program:this.state.program, 
	            			user:this.state.studentName}
	            	)
	          	})

		
		console.log("day removed")
		this.setState({
			programClean:true
		})
		//this.programsGet()
	}


	deleteSet(day, set){
		console.log("Delete set")
		
		console.log(this.state.program._id)

		let prog = this.state.program
		let weeks = prog.weeks[this.state.selWeek] 
		let sets = weeks.days[day].sets
		console.log("sets.length before", sets.length)
		sets.splice(set,1)
		console.log("sets.length after",sets.length) 
		if(sets.length==0){
			weeks.days.splice(day,1)
		}

		console.log("weeks",weeks)
		console.log("this.state.selWeek",this.state.selWeek)
		console.log("day", day)
		console.log("set", set)

//		return
		//if(weeks.length==0){

		//}
				
		fetch('/upsertprogram', {
	            	method: 'POST',
			            headers: {
		              "Content-Type": "application/json"
		            },
	            	body: JSON.stringify(
	            		{	program:prog, 
	            			user:this.state.studentName}
	            	)
	          	})

		this.setState({
			program:prog
		})
		console.log("set removed")
	}


	addSet(day, set){
		console.log("add set")
		console.log("day", day)
		console.log("set", set)
		console.log(this.state.programs)
		console.log(this.state.program)
		console.log(this.state.program._id)

		let prog = this.state.program
		let weeks = prog.weeks[this.state.selWeek] 
		let sets = weeks.days[day].sets
		let noSets = sets.length
			
		let newset = Object.assign({}, this.state.defaultSet)
		newset.id = newset.group+"-"+newset.exercise 
		sets.push(newset)
		//console.log(this.state.program)
		//console.log(sets.length)
		//sets.splice(set,1)
		//console.log(sets.length) 
		//if(sets.length==0){
		//	weeks.days.splice(day,1)
		//}
		//if(weeks.length==0){

		//}
				
		fetch('/upsertprogram', {
	            	method: 'POST',
			            headers: {
		              "Content-Type": "application/json"
		            },
	            	body: JSON.stringify(
	            		{	program:prog, 
	            			user:this.state.studentName}
	            	)
	          	})

		this.setState({
			program:prog
		})
		console.log("set added")
		
	}

	moveSet(day, set){
		let prog = JSON.parse(JSON.stringify(this.state.program))
		let weeks = prog.weeks[this.state.selWeek] 
		let sets = weeks.days[day].sets
		let currentSet = sets[set]
		let previousSet = sets[set-1]
		let swapset = JSON.parse(JSON.stringify(previousSet))
		let swapset2 = JSON.parse(JSON.stringify(currentSet))
		
		previousSet = swapset2
		currentSet = swapset		
		prog.weeks[this.state.selWeek].days[day].sets[set-1]=previousSet
		prog.weeks[this.state.selWeek].days[day].sets[set]=currentSet
				
		fetch('/upsertprogram', {
	            	method: 'POST',
			            headers: {
		              "Content-Type": "application/json"
		            },
	            	body: JSON.stringify(
	            		{	program:prog, 
	            			user:this.state.studentName}
	            	)
	          	})

		this.setState({
			program:prog
		})
		
		console.log("set move")
		
	}

	addWeek(){
		// lembrar que funciona soh para um programa
		console.log("add newweek")

		for(let p=0;p<this.state.programs.length;p++){
			let prog = this.state.programs[p]

			if(prog.user==this.state.studentName && prog.endcycle==false) {
				let program = prog
				let weeks = program.weeks
				let noweeks = weeks.length 
				let newweek = JSON.parse(JSON.stringify(weeks[this.state.selWeek])); 
				newweek.id = noweeks
				newweek.name = "Week "+(noweeks+1)

				let nodays = newweek.days.length
				for(let i=0;i<nodays;i++){
					newweek.days[i].workoutComplete=false
					newweek.days[i].difficulty='Hard'
				} 

				console.log("<<<<<newweek>>>>>")
				console.log(newweek)
		
				weeks.push(newweek)
				this.setState({
					selWeek:noweeks,
					weeks
				})

				fetch('/upsertprogram', {
	            	method: 'POST',
			            headers: {
		              "Content-Type": "application/json"
		            },
	            	body: JSON.stringify(
	            		{	program:program, 
	            			user:this.state.studentName}
	            	)
				})


				// ?????????????????????????????????????
				let newgrupo = this.state.grupo[0]
				let grupo = this.state.grupo
				grupo.push(newgrupo) 			
				this.setState({
					grupo:grupo,
					program:program
				})

				console.log("after adding week")
				console.log(this.state)
				break;
			}		
		}
	}


	templatesSave(){
		console.log("SAVING templates")
		const tempName = this.refs.templateName.getValue()
		this.setState({
      		openTemplateSave: true,
    	});



		let newtemplate = JSON.parse(JSON.stringify(this.state.program)); 
		console.log("newtemplate")
		console.log("newtemplate before")
		console.log(newtemplate)
		let time = moment().format('DD/MMM/YY')
		newtemplate.name = tempName
		newtemplate.createdby = this.state.username+"-"+time
		console.log("newtemplate after")
		console.log("newtemplate after")
		console.log(newtemplate)

		// zero fields
		let templateWeeks = newtemplate.weeks
		//console.log("templateWeeks")
		//console.log(templateWeeks)
		for(let w=0;w<templateWeeks.length;w++){
			//console.log("loop weeks",w)

			let templateDays = newtemplate.weeks[w].days
			console.log(templateDays)
			for(let d=0;d<templateDays.length;d++){
				//console.log("loop day",d)
				let day = templateDays[d]
				day.workoutComplete=false
				day.difficulty="Hard"
				//console.log("day",day)
				
				let templateSets = templateDays[d].sets
				for(let s=0;s<templateSets.length;s++){
					//console.log("loop set",s)
					let set = templateSets[s]
					set.sets=1
					set.reps=1
					set.weight=1
					set.w1=0
					set.r1=0
					set.w2=0
					set.r2=0
					set.w3=0
					set.r3=0
					set.w4=0
					set.r4=0
					set.w5=0
					set.r5=0
					set.w6=0
					set.r6=0
					set.note=""
					set.amrapmsg="n"
				}
			}
		}
		 

		console.log("newtemplate")
		console.log(newtemplate)
		fetch('/inserttemplate', {
	            	method: 'POST',
			            headers: {
		              "Content-Type": "application/json"
		            },
	      	      	body: JSON.stringify(
	            		{template:newtemplate}
	            	)
	          	})

		this.templateSaveClose()
	}

	programsSave(){
		console.log("SAVING PROGRAM")
		console.log(this.state.programs)

		let filteredProgs = this.state.programs.filter((prog) => prog.user==this.state.studentName)
		console.log("filteredProgs")
		console.log(filteredProgs)

		console.log("this.state.program")
		console.log(this.state.program)
		
		
		
		this.state.program._id = filteredProgs[0]._id
		//console.log(this.state.program)
		
		
		fetch('/upsertprogram', {
	            	method: 'POST',
			            headers: {
		              "Content-Type": "application/json"
		            },
	            	body: JSON.stringify(
	            		{program:this.state.program, user:this.state.studentName}
	            	)
	          	})

		
		console.log("program added")
		this.setState({
			programClean:true
		})
		this.programsGet()

	}

	

	fetchExercises(){
		this.props.dispatch(fetchExercises())
	}	

	fetchGroups(){
		this.props.dispatch(fetchGroups())
	}


	createGroupSelect(){

	}

	handleCellClick (rowNumber, columnNumber, evt) {
		
	}

	selectStudent(){
		this.templatesGet()
		this.setState({
			studentName:"none",
			zeroProgram: true
		})	
	}

	setStudent(evt){
		console.log("setStudent")

		this.templatesGet()

		let val = evt.nativeEvent.target.value
		
		let studentname = evt.nativeEvent.target[val].text

		console.log("studentname", studentname)

		let genok = (studentname!='Select a Student')
		if(!genok) {
			this.setState({
				programName:"Program 1"
			})
		} 

		this.setState({
      		studentName:studentname,
      		selectedStudent:val,
      		selWeek:0,
      		generateOk:genok
    	}, function(){
    		console.log("STUDENT STUDENT STUDENT >", this.state.studentName) 
		
    		// if there is any program for this student....
    		let found=false
			for(let p=0;p<this.state.programs.length;p++) {
				let prog = this.state.programs[p] 
				if(prog.user==this.state.studentName && (prog.endcycle != true) ){
					this.setState(
						{
							program:this.state.programs[p]
						}
					)
					found=true
					break;
				}
			}
			this.setState({
				zeroProgram:!found
			})
    	});
	}

	setTemplate(evt){
		console.log("setTemplate")
		let val = evt.nativeEvent.target.value
		console.log("val")
		console.log(val)
		this.setState({
      		templateName:val
    	});
	}


	setGroup(evt){
		//console.log("setGroup")
		console.log("BEGIN SETGROUP")
		
		//console.log("index")
		//console.log(index)
		//console.log(value)
		//console.log("evt.target.dataset.tableday")
  		//console.log(evt.target.dataset.tableday)

  		let day = evt.target.dataset.tableday;
  		let row = evt.target.dataset.row;
  		let val = evt.nativeEvent.target.value
  		let grupotxt = evt.nativeEvent.target[val-1].text

  		//console.log("this.state.selWeek", this.state.selWeek)
		//console.log("this.state.program")
		//console.log(this.state.program)

		const items = this.state.program.weeks[this.state.selWeek].days;


				
//		console.log("Current key ", this.state.current_key)
		console.log("Value ", val)
		//console.log("Day ", day)
		//console.log("table row", row)
		//console.log("GRUPO", grupotxt)
		//console.log("SELWEEK", this.state.selWeek)

		items[day-1].sets[row].group=parseInt(val)	;


		let ex=1;
		let exercises = this.state.exercises
		for(let x=0;x<exercises.length;x++) {
			if(exercises[x].group==grupotxt) {
				ex = exercises[x].id
			 	break;
			}
		}
		
		if(grupotxt!="Manual") {
			items[day-1].sets[row].manualex='';
		}

		items[day-1].sets[row].exercise=ex;
		items[day-1].sets[row].id=parseInt(val)+"-"+ex

console.log("SETTIIIING ID:", items[day-1].sets[row].id )
		this.setState({
      		items,
      		programClean:false
    	});
	}

	setExercise(evt){
		let val = evt.nativeEvent.target.value
		let day = evt.target.dataset.tableday;
  		let row = evt.target.dataset.row;

		console.log("VAL",val)
		console.log("DAY",day)
		console.log("ROW",row)

  		//const items = this.state.dayItem;
 		//items[day-1].sets[row].exercise=val;

		const items = this.state.program.weeks[this.state.selWeek].days;
		console.log("items")
		console.log(items[0].sets)
		
 		items[day-1].sets[row].exercise=val;

		items[day-1].sets[row].id= items[day-1].sets[row].group +"-"+parseInt(val)
 		console.log("SET EX ID:", items[day-1].sets[row].id )

		if(items[day-1].sets[row].amrap==true){
			let progression = this.findProgressModel(items[day-1].sets[row].exercise)
			console.log("PROGRESSION", progression)
			if(progression=="linear") {
				items[day-1].sets[row].reps="As many as possible"
				items[day-1].sets[row].sets=1
			}
		}	

  		this.setState({
      		items,
      		programClean:false
    	});

    	console.log("NEW EXERCISE")
    	console.log(this.state.programs)
	
	}

	setManual(evt){
		let val = evt.nativeEvent.target.value
		let day = evt.target.dataset.tableday;
  		let row = evt.target.dataset.row;
		
		const items = this.state.program.weeks[this.state.selWeek].days;
		items[day-1].sets[row].manualex=val;
		this.setState({
      		items,
      		programClean:false
    	});
    	console.log("MANUAL Entered")
    	console.log(this.state.program)
  		
	}

	getExerciseName(index){
		return this.state.exercises[index-1].name
	}

	setRIR(evt){
		console.log("setRIR")

  		let val = evt.nativeEvent.target.value
  		let day = evt.target.dataset.tableday;
  		let row = evt.target.dataset.row;

  		let simpleSpan = <span></span>
  		if(val!=1) {
  			this.setState({
  				selectedDrop:simpleSpan,
  				fsidrop:0
  			})
  		} else {
  			this.setState({
  				selectedDrop:this.state.prescribedSelect,
  				fsidrop:val
  			})	
  		}


  		const items = this.state.program.weeks[this.state.selWeek].days;
  		items[day-1].sets[row].fsidrop=parseInt(val);
  		if(val!=1) {
  			items[day-1].sets[row].fsival=0;	
  		}
		this.setState({
  			items,
      		programClean:false
    	});		
	}

	setFSI(evt){
		console.log("setFIS")

  		let val = evt.nativeEvent.target.value
  		let day = evt.target.dataset.tableday;
  		let row = evt.target.dataset.row;

  		this.setState({
  			fsival:val
  		})
  		

  		const items = this.state.program.weeks[this.state.selWeek].days;
  		items[day-1].sets[row].fsival=parseInt(val);
		this.setState({
  			items,
      		programClean:false
    	});
    			
	}


	setOrder(evt){
		console.log("SET ORDER")
    		
		let val = evt.nativeEvent.target.value
		let day = evt.target.dataset.tableday;
  		let row = evt.target.dataset.row;

  		const items = this.state.program.weeks[this.state.selWeek].days;
		
		items[day-1].sets[row].order=val;
  		
  		this.setState({
  			items,
  			programClean:false
    	});
	}

	setSets(evt){
		let val = evt.nativeEvent.target.value
		let day = evt.target.dataset.tableday;
  		let row = evt.target.dataset.row;
		const items = this.state.program.weeks[this.state.selWeek].days;
		//console.log("ITEMS", items)
		//console.log("ITEMS[day-1]")
		//console.log(items[day-1].sets[row].sets)	
		items[day-1].sets[row].sets=val;
  		//console.log("ITEMS[day-1] after")
  		//console.log(items[day-1].sets[row].sets)	
		
  		this.setState({
  			items,
  			programClean:false
    	});
	}

	setReps(evt){
		let val = evt.nativeEvent.target.value
		let day = evt.target.dataset.tableday;
  		let row = evt.target.dataset.row;
  		console.log("VAL",val)
		console.log("DAY",day)
		console.log("ROW",row)

		
		const items = this.state.program.weeks[this.state.selWeek].days;
		items[day-1].sets[row].reps=val;
  		
  		this.setState({
  			items,
  			programClean:false
    	});

	}

	setWeight(evt){
		let val = evt.nativeEvent.target.value
		let day = evt.target.dataset.tableday;
  		let row = evt.target.dataset.row;
  		console.log("VAL",val)
		console.log("DAY",day)
		console.log("ROW",row)

		
		const items = this.state.program.weeks[this.state.selWeek].days;
		items[day-1].sets[row].weight=val;
  		
  		this.setState({
  			items,
  			programClean:false
    	});

	}

	weekChange(evt){
		console.log("weekChange......................")
		let val = evt.nativeEvent.target.value
		console.log("VAL",val)
		
		this.setState({
			selWeek:val
		})
	}

	setProgramName(evt){
		let val = evt.nativeEvent.target.value
		console.log("VAL",val)
  		this.setState({
      	programName:val
    	});
	}


	setDays(evt){
		let val = evt.nativeEvent.target.value
		console.log("VAL",val)
  		this.setState({
      		howmanydays:val
    	}, function(){
    		console.log("howmanydays", this.state.howmanydays)
    	});
	}

	setWeeks(evt){
		let val = evt.nativeEvent.target.value
		console.log("VAL",val)
  		this.setState({
      		howmanyweeks:val
    	});
	}


	_onRowSelection(key, day) {
  		
	}

	
	setDropExercise(evt, index, value){
		//this.refs.numSets.focus()
		this.props.dispatch(setDropExercise(value))
	}

	templateSaveOpen = () => {
		console.log("template save open")
    	this.setState({openTemplateSave: true});
  	};
	
	templateSaveClose = () => {
		console.log("template save close")
		this.setState({
      		openTemplateSave: false,
    	});
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

	

	
	createMappedExercises(grupo,i) {
		//console.log("CREATEMAPPEDEXERCISES")
		//console.log(grupo)
		//		console.log(i)
		
		
		let groupname = this.state.groups[grupo-1].name
		let filteredExercises = this.state.exercises.filter((el) => el.group==groupname)
		//console.log("filteredExercises",filteredExercises)
		let mappedExercises = filteredExercises.map(
			exercise => 
				<option value={exercise.id} key={exercise.id}>
					{exercise.name}
				</option>
		)
		return mappedExercises
	}

	handleOpen = () => {
    	this.setState({open: true});
  	};

  	handleClose = () => {
    	this.setState({open: false});
  	};




	fsiText(fsidrop, fsival) {
	    let fsitext='none'
	    if(fsidrop==1) {
	      fsitext=this.state.prescribedRIR[fsival].name
	    } else if(fsidrop==2) {
	      fsitext=this.state.chooseRIR[fsival].name
	    } else {
	      fsitext="Go to Failure On Final Set"
	    }
	    return fsitext
	}

	setAmrap(evt) {
		let val = evt.nativeEvent.target; //.value
		let day = evt.target.dataset.tableday;
  		let row = evt.target.dataset.row;
  		console.log("VAL",val.checked)
		console.log("DAY",day)
		console.log("ROW",row)
		const items = this.state.program.weeks[this.state.selWeek].days;
		
		let progression = this.findProgressModel(items[day-1].sets[row].exercise)
		console.log("PROGRESSION", progression)
		items[day-1].sets[row].amrap=val.checked
		if(val.checked){
			if(progression=="linear") {
				items[day-1].sets[row].reps="As many as possible"
				items[day-1].sets[row].sets=1
			}
		} else {
			items[day-1].sets[row].reps=0
		}

		this.setState({
			programClean:false,
			items
		}, function(){
			console.log("after setAmrap")
			console.log(this.state.program)
		})
			
	}

	findProgressModel(idex){
    	console.log("findProgressModel", this.state.exercises[idex-1].progression)
    	return this.state.exercises[idex-1].progression;
  	}


	prevDayVal(id, day, week){
		console.log("prevDayVal, id:"+id, "day:"+day, "week:"+week)

		if(day==0 && week==0){
			console.log("day==0, returning...")
		} else if(day!=0){
			console.log("SETSDAY ELSE")
			let setsWeeks = this.state.program.weeks
			console.log("setsWeeks", setsWeeks)
			let setsWeekDays = this.state.program.weeks[week].days
			console.log("setsWeek", setsWeekDays)  
			let setsDay = this.state.program.weeks[week].days[day-1].sets;
			console.log("SETSDAY day >",setsDay)

			for(let s=0;s<setsDay.length;s++){
				console.log("in loop, setsDay[s].id="+setsDay[s].id+" <> "+id)
				if(setsDay[s].id == id ) {
					console.log("ACHOU ACHOU prevDayVal, achou id >>>"+id, setsDay[s].id)
					let vals =  {
						w1: setsDay[s].w1,
						r1: setsDay[s].r1,
						w2: setsDay[s].w2,
						r2: setsDay[s].r2,
						w3: setsDay[s].w3,
						r3: setsDay[s].r3,
						w4: setsDay[s].w4,
						r4: setsDay[s].r4,
						w5: setsDay[s].w5,
						r5: setsDay[s].r5,
						w6: setsDay[s].w6,
						r6: setsDay[s].r6,
						fsidrop: setsDay[s].fsidrop,
						fsival: setsDay[s].fsival,
						note: setsDay[s].note
					}
					return vals
				} else {
					console.log("nao achou id >>>", id)
				}
			}	
		}
		return 'none' 	
	}

	prevFsidrop(id, day){
		let result='none'
		if(day==0){
			console.log("day==0, returning...")
		} else {
			let setsDay =  this.state.program.weeks[this.state.selWeek].days[day-1].sets;

		}	
		return result

	}	

	previousDayValues(id, day, week) {
		let result = 'none'
		console.log(">>>previousDayValues<<<")
		
		if(day==0 && week==0) {
			result = 'none'
			console.log(">>>day==0 && week==0<<<")

		} else if(day!=0) { // previous day value
			console.log(">>>day!=0<<<")
			let setsDay = this.state.program.weeks[week].days[day-1].sets;
			for(let s=0;s<setsDay.length;s++){
				if(setsDay[s].id == id ) {
					result =  {
						w1: setsDay[s].w1,
						r1: setsDay[s].r1,
						w2: setsDay[s].w2,
						r2: setsDay[s].r2,
						w3: setsDay[s].w3,
						r3: setsDay[s].r3,
						w4: setsDay[s].w4,
						r4: setsDay[s].r4,
						w5: setsDay[s].w5,
						r5: setsDay[s].r5,
						w6: setsDay[s].w6,
						r6: setsDay[s].r6,
						fsidrop: setsDay[s].fsidrop,
						fsival: setsDay[s].fsival,
						note: setsDay[s].note
					}
					break
				}

			}
			
		} else { // previous week last value
			console.log(">>>previous week last value<<<")
			console.log(">>>id:"+id+", day:"+day+", week:"+week)			
			let setsDay = this.state.program.weeks[week-1].days;
			console.log(">>>setsDay:", setsDay)			
			
			let lastDay = setsDay.length-1
			let sets = setsDay[lastDay].sets
			for(let s=0;s<sets.length;s++){
				console.log(">>>for:"+s)			
			
				if(sets[s].id == id ) {
					result =  {
						w1: sets[s].w1,
						r1: sets[s].r1,
						w2: sets[s].w2,
						r2: sets[s].r2,
						w3: sets[s].w3,
						r3: sets[s].r3,
						w4: sets[s].w4,
						r4: sets[s].r4,
						w5: sets[s].w5,
						r5: sets[s].r5,
						w6: sets[s].w6,
						r6: sets[s].r6,
						fsidrop: sets[s].fsidrop,
						fsival: sets[s].fsival,
						note: sets[s].note
					}
					console.log(">>>achou:", result)				
					break	
				}
			}	
		}

		console.log(">>>id:"+id+", day:"+day+", week:"+week+", RESULT:"+result+" <<<")
		return result
	}
	

    render(){
    	console.log("------------>RENDER<-------------")
  
  
    	if(this.state.info == "loading ...") {
    		return (
    			 <CircularProgress />  	
    		)
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
			marginLeft	: 1,
			marginRight	: 1,
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

		const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onTouchTap={this.templateSaveClose}
	      />,
	      <FlatButton
	        label="Save"
	        primary={true}
	        onTouchTap={this.templatesSave.bind(this)}
	      />,
	 	];


    	if(this.state.zeroProgram || this.state.studentName=="none"){
    	
    		console.log("this.state.zeroProgram || this.state.studentName==none")
    		//console.log(this.state.templates)
    		
    		let mappedStudents =  this.state.students.map(
					student => 
						<option value={student.id} key={student.id}>
							{student.name} 
						</option>
			)
    		let mappedTemplates =  this.state.templates.map(
					template => 
						<option value={template.id} key={template.id}>
							{template.name} 
						</option>
			)
			

			return(
			<div className="container-fluid">	
				<ToolbarLayout 
					title="Program Layout Maker" 
					username={this.state.username} 
					img={this.state.avatarimg=='none'?"images/avatar64m.png":"images/"+this.state.avatarimg}/>	
				<Grid fluid={true}>
					<Row className="show-grid">
        				<Col xs={12} md={12} lg={16}>
        					<Card style={{marginBottom:20}}>
        						<CardHeader title={(this.state.studentName=='none')? '': this.state.studentName.toUpperCase()}>
        							<Toolbar>
        								<ToolbarGroup>
										<span>
											Student
												<select value={this.state.selectedStudent} onChange={this.setStudent.bind(this)}>
						   						{mappedStudents}	
												</select>

											Program Name
		 										<input   
	        										value={this.state.programName}
	        										onChange={this.setProgramName.bind(this)}>
	        									</input>

										 	Days
										 		<input  type="number" min="1" max="7" 
	        										   value={this.state.howmanydays}
	        										   onChange={this.setDays.bind(this)}>
	        									</input>


										 Template
										 		<select default="0" onChange={this.setTemplate.bind(this)}>
						   							{mappedTemplates}	
												</select>
			

										<RaisedButton label="Generate Program" disabled={!this.state.generateOk} style={{marginLeft:30}, {marginRight:30}} primary={true}
        										onClick={this.generateProgram.bind(this)} 
        			
        										 />
	        						       										
        								</span>
        								</ToolbarGroup>
        							</Toolbar>	
								</CardHeader>		
        					</Card>
        				</Col>
        			</Row>				
        		</Grid>
        	</div>
			)

		} else {

			console.log("ELSE ELSE ELSE ELSE ELSE")

			let howmanyweeks = this.state.howmanyweeks;
			let howmanydays = this.state.howmanydays;

			let selectedStudent=0
			for(let s=0;s<this.state.students.length;s++){
				if(this.state.students[s].name==this.state.studentName) {
					selectedStudent = this.state.students[s].id
				}
			}


			let mappedStudents =  this.state.students.map(
					student => 
						<option value={student.id} key={student.id}>
							{student.name} 
						</option>
			)


			let filteredProgs = this.state.programs.filter((prog) => prog.user==this.state.studentName)
			let mappedPrograms = filteredProgs.map(
					program => 
						<option value={program.id} key={program.id}>
							{program.name} 
						</option>
			)

			

			let mappedTemplates = this.state.templates.map(
					template => 
						<option value={template.id} key={template.id}>
							{template.name} 
						</option>
			)


			let allWeeks = this.state.program.weeks

			let mappedWeeks = allWeeks.map(
					week => 
						<option value={week.id} key={week.id}>
							{week.name} 
						</option>
			)
			

		    let prescribedSets = this.state.prescribedRIR.map(
		      rir =>
		        <option value={rir.id} id={rir.id} key={rir.id}>{rir.name}</option> 
		    ) 


		    let chooseSets = this.state.chooseRIR.map(
		      rir =>
		        <option value={rir.id} id={rir.id} key={rir.id}>{rir.name}</option> 
		    ) 



    		const gotofailure ="Go to Failure On Final Set"
    
			const mappedExercises = []
		 	let mappedSets=[], mappedDifficulty=[]
		 	let previewSets=[]
		 	
		 	let programDays = this.state.program.weeks[this.state.selWeek].days.length
		 	
	    	for(let d=0;d<programDays;d++) {

				let complete = this.state.program.weeks[this.state.selWeek].days[d].workoutComplete
				mappedDifficulty[d]=(complete==true?"Completed - ":"")+this.state.program.weeks[this.state.selWeek].days[d].difficulty;

				let setsDay =  this.state.program.weeks[this.state.selWeek].days[d].sets;
				console.log("setsDay", setsDay)

				let fullSetsDay = []

				for(let s=0;s<setsDay.length;s++){
					let result='none'
					let pw1='',pw2='',pw3='',pw4='',pw5='',pw6=''
					let pr1='',pr2='',pr3='',pr4='',pr5='',pr6=''
					let pfsidrop='', pfsival='', pnote='', fsitext=''
				

					// find last day info
					result = this.previousDayValues(setsDay[s].id, d, this.state.selWeek)
					console.log("result", result)
					if(result!='none') {
						pw1 = result.w1
						pr1 = result.r1
						pw2 = result.w2
						pr2 = result.r2
						pw3 = result.w3
						pr3 = result.r3
						pw4 = result.w4
						pr4 = result.r4
						pw5 = result.w5
						pr5 = result.r5
						pw6 = result.w6
						pr6 = result.r6
						pfsidrop = result.fsidrop
						pfsival = result.fsival
						pnote = result.note
						fsitext = this.fsiText(pfsidrop, pfsival)
					}	

					let newobj = {
							id: setsDay[s].id,
							amrap: setsDay[s].amrap,
							group: setsDay[s].group,
							exercise: setsDay[s].exercise,
							manualex: setsDay[s].manualex,
							order: setsDay[s].order,
							sets: setsDay[s].sets,
							reps: setsDay[s].reps,
							weight: setsDay[s].weight,
							fsidrop: setsDay[s].fsidrop,
							fsival: setsDay[s].fsival,
							w1: pw1,
							r1: pr1,
							w2: pw2,
							r2: pr2,
							w3: pw3,
							r3: pr3,
							w4: pw4,
							r4: pr4,
							w5: pw5,
							r5: pr5,
							w6: pw6,
							r6: pr6,
							fsitext: pw1!=''?fsitext:'',
							note: pnote 
					}
					console.log(">>>newobj:", newobj)
					console.log(">>>program:", this.state.program)				
					fullSetsDay.push(newobj)			
				}	
	

				let noDays = this.state.program.weeks[this.state.selWeek].days.length
				mappedSets[d] = fullSetsDay.map(
					(set,i) => 
						<TableRow key={i+1}>
							<TableRowColumn width={100} key={i+1} >
								<Checkbox 
									data-row={i}
									data-tableday={d+1}
									checked={set.amrap}
									onCheck={this.setAmrap.bind(this)}	
								/>
							</TableRowColumn>

 
							<TableRowColumn width={100} key={i+1} >
								<select value={fullSetsDay[i].group} 
											key={i+1}
											data-row={i} data-tableday={d+1} 
											onChange={this.setGroup.bind(this)}>
											{this.state.grupo[0]}			
								</select>
							</TableRowColumn>

							<TableRowColumn >
								{ fullSetsDay[i].group == 19 ? 
									(
										<input value={fullSetsDay[i].manualex}
											data-tableday={d+1} 
											data-row={i} 
											onChange={this.setManual.bind(this)} 
										/>
									) 
									:
									(
										<select value={fullSetsDay[i].exercise}
											data-row={i} data-tableday={d+1} 
											onChange={this.setExercise.bind(this)}>
							   				{this.createMappedExercises(fullSetsDay[i].group,i)}	
										</select>
									)	
								}			
							</TableRowColumn>

							<TableRowColumn width={100}>
								<input 	value={fullSetsDay[i].order}
										size="1"
										data-tableday={d+1} 
										data-row={i} 
										onChange={this.setOrder.bind(this)} />
							   					
							</TableRowColumn>
							
							<TableRowColumn>
								<input size="2" 
	        							value={fullSetsDay[i].sets}
	        							data-row={i} data-tableday={d+1} 
	        							onChange={this.setSets.bind(this)}>
	        					</input>
							</TableRowColumn>
							<TableRowColumn>
								<input  size="2"
	        							value={fullSetsDay[i].reps}
	        							data-row={i} data-tableday={d+1} 
	        							onChange={this.setReps.bind(this)}>
	        					</input>
							</TableRowColumn>
							<TableRowColumn>
								<input 	size="2"
	        							value={fullSetsDay[i].weight}
	        							data-row={i} data-tableday={d+1} 
	        							onChange={this.setWeight.bind(this)}>
	        					</input>
								</TableRowColumn>
							<TableRowColumn>
								<select value={fullSetsDay[i].fsidrop}
	        							data-row={i} data-tableday={d+1}
										onChange={this.setRIR.bind(this)}>
					        		<option value="1" id="1" key="1">Prescribed RIR</option>
									<option value="2" id="2" key="2">Choose RIR</option>
									<option value="3" id="3" key="3">Go to Failure On Final Set</option>
								</select>

								{fullSetsDay[i].fsidrop==1?(
									<select value={fullSetsDay[i].fsival}
											data-row={i} 
											data-tableday={d+1} 
											onChange={this.setFSI.bind(this)}>
										{prescribedSets}
									</select>
								):<span></span>}

							</TableRowColumn>
								
							<TableRowColumn>
								<IconButton onClick={this.moveSet.bind(this, d, i)}> {i==0?null:<SwapVert />}</IconButton >
								<IconButton onClick={this.addSet.bind(this, d, i)} tooltip="Add Set"><ContentAdd /></IconButton >
								<IconButton onClick={this.deleteSet.bind(this, d, i)} tooltip="Delete Set"><Delete /></IconButton >
							</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].w1}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].r1}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].w2}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].r2}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].w3}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].r3}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].w4}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].r4}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].w5}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].r5}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].w6}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].r6}</TableRowColumn>		
							<TableRowColumn style={{backgroundColor:lightBlueA100}}>{fullSetsDay[i].fsitext}</TableRowColumn>
							<TableRowColumn style={{backgroundColor:lightBlueA200}}>{fullSetsDay[i].note}</TableRowColumn>
						</TableRow>
				)
			}
		
			let dayTable=[]
			for(let i=0;i<programDays;i++) {
				dayTable[i] =
				<div>
					<span className="dayTitle"> 
						Week {parseInt(this.state.selWeek)+1},  Day {i+1} ({mappedDifficulty[i]})
					</span>

					<Table selectable={false} ref="tester" onCellClick={this.handleCellClick}  fixedHeader={false} bodyStyle={{overflow:'visible'}}>
						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					      <TableRow displayBorder={false}>
					        <TableHeaderColumn style={{width:60}}>AMRAP</TableHeaderColumn>
					        <TableHeaderColumn style={{width:180}}>GROUP</TableHeaderColumn>
					        <TableHeaderColumn style={{width:330}}>EXERCISE</TableHeaderColumn>
					        <TableHeaderColumn style={{width:66}}>ORDER</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>SETS</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>REPS</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>WEIGHT</TableHeaderColumn>
					        <TableHeaderColumn style={{width:430}}>Final Set Intensity</TableHeaderColumn>
					        <TableHeaderColumn style={{width:160}}>ACTIONS</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Weight 1</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Rep 1 </TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Weight 2</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Rep 2</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Weight 3</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Rep 3</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Weight 4</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Rep 4</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Weight 5</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Rep 5</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Weight 6</TableHeaderColumn>
					        <TableHeaderColumn style={{width:70}}>Rep 6</TableHeaderColumn>
					        <TableHeaderColumn style={{width:250}}>Set Intensity</TableHeaderColumn>
					        <TableHeaderColumn style={{width:300}}>Note</TableHeaderColumn>
					      </TableRow>
				    	</TableHeader>
						<TableBody deselectOnClickaway={true} displayRowCheckbox={false}>
							{mappedSets[i]}
						</TableBody>	
					</Table>
					<div>
						<IconButton onClick={this.deleteDay.bind(this,i)} 
										data-row={i}
										tooltip="Delete Day"
										style={{marginBottom:20}}>
      					<Delete color={blue50}/>
    					</IconButton>
    				</div>	
				</div>
			}


			// preview sets
			for(let d=0;d<programDays;d++) {
				let setsDay =  this.state.program.weeks[this.state.selWeek].days[d].sets;
				previewSets[d] = setsDay.map(
					(set,i) => 
						<TableRow key={i+1}>
							<TableRowColumn>{set.manualex==''?this.getExerciseName(set.exercise)+(set.amrap?" AMRAP":""):set.manualex}</TableRowColumn>
							<TableRowColumn>{set.order}</TableRowColumn>
							<TableRowColumn>{set.sets}</TableRowColumn>
							<TableRowColumn>{set.reps}</TableRowColumn>
							<TableRowColumn>{set.weight}</TableRowColumn>
							<TableRowColumn>{this.fsiText(set.fsidrop, set.fsival)}</TableRowColumn>
						</TableRow>	
				)
		 	}

		 	let previewTable=[]
		 	for(let i=0;i<programDays;i++) {
				previewTable[i] =
				<div style={{backgroundColor:'#E3F2FD'}}>
					&ensp;Day {i+1}
	        		<Table selectable={false} fixedHeader={false}>
						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
							<TableRow>
						        <TableHeaderColumn style={{width:220}}>Exercise</TableHeaderColumn>
						  		<TableHeaderColumn style={{width:40}}>Order</TableHeaderColumn>
				      			<TableHeaderColumn style={{width:40}}>Sets</TableHeaderColumn>
						        <TableHeaderColumn style={{width:80}}>Reps</TableHeaderColumn>
						        <TableHeaderColumn style={{width:40}}>Weight</TableHeaderColumn>
						        <TableHeaderColumn style={{width:160}}>Final Set Intensity</TableHeaderColumn>
						    </TableRow>
						</TableHeader>
						<TableBody deselectOnClickaway={false} displayRowCheckbox={false}>
							{previewSets[i]}
						</TableBody>
					</Table>		    
        		</div>
			}
			
			
	    	
		return(

		<div className="container-fluid">	
			<ToolbarLayout username="Paul Attard (Coach)"/>
			<Tabs>
			<Tab icon={<Assignment/>}>	
			<Grid fluid={true}	>
				<Row className="show-grid">
        			<Col xs={12} md={12} lg={12}>
        				<Card style={{marginBottom:20}}>
        						<Toolbar>
        							<ToolbarGroup>
        								<select value={this.state.selectedStudent} onChange={this.setStudent.bind(this)}>
						   				{mappedStudents}	
										</select>

        								<select >
						   					{mappedPrograms}	
										</select>
										<select onChange={this.weekChange.bind(this)} value={this.state.selWeek}>
						   					{mappedWeeks}	
										</select>
										<span>
										<RaisedButton label="Add Week" hidden={true} style={{marginRight:10}} primary={true}
        										icon={<ContentAdd />}
        										onClick={this.addWeek.bind(this)} />
        								<RaisedButton label="Add Day" style={{marginRight:10}} primary={true}
        										icon={<ContentAdd />}
        										onClick={this.addDay.bind(this)} />			       										
        				
										<RaisedButton label="Save program" disabled={this.state.programClean} style={{marginRight:10}} primary={true} 
        										icon={<Save />}
        										onClick={this.programsSave.bind(this)} />	       										
        				
        								<RaisedButton label="End of Meso-cycle" secondary={true}
        										onClick={this.endOfCycle.bind(this)} 
        										 icon={<Restore />}
        										 />

        								<RaisedButton label="Save As Template" style={{marginLeft:30}} primary={true}
        										icon={<ContentPaste />}
        										onClick={this.templateSaveOpen} />
        										<Dialog
										          title="Save Template"
										          actions={actions}
										          modal={true}
										          open={this.state.openTemplateSave} >
          									<TextField ref="templateName"
      											floatingLabelText="Template Name"
    											/>
    											</Dialog>	       									
										</span>
        							</ToolbarGroup>
        						</Toolbar>			
        				</Card>
        			</Col>
        		</Row>
				<Row className="show-grid">
        			<Col xs={12} md={12} lg={12}>
						{dayTable}        			
        			</Col>
        		</Row>				
        	</Grid>
        	</Tab>

        	<Tab icon={<Visibility/>}>
        	<Grid fluid={true}>
				<Row className="show-grid">
        			<Col xs={9} md={9} lg={9}>
		        		<Card>
		        			<CardHeader title={this.state.studentName+" - "+this.state.programName+" - Preview week "+(parseInt(this.state.selWeek)+1)}>
		                  	</CardHeader>
		        			{previewTable}
		        		</Card>
		        	</Col>
		        </Row>
		    </Grid>    			
        	</Tab>
        	</Tabs>
        </div>		
		)	
		}
	}
}

export default LayoutMaker;