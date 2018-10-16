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
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


import {red500, indigo500, indigoA400, blue50, lightBlue900} from 'material-ui/styles/colors'

import { Link, IndexLink } from 'react-router';

import Dialog from 'material-ui/Dialog';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import Divider from 'material-ui/Divider';
import Home from 'material-ui/svg-icons/action/home'
import Print from 'material-ui/svg-icons/action/print'
import Settings from 'material-ui/svg-icons/action/settings'
import SettingsPower from 'material-ui/svg-icons/action/settings-power'
import FitnessCenter from 'material-ui/svg-icons/places/fitness-center'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

import Chip from 'material-ui/Chip'


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Grid, Row, Col, Clearfix, Image} from 'react-bootstrap'

import {connect} from 'react-redux'
import {fetchExercises, fetchGroups} from '../actions/exercisesActions'
import {setDropGroup, setDropExercise} from '../actions/dropActions'
import {addSet, removeSet, setWeek, setUser} from '../actions/programActions'


@connect((store) => {
	return {
		exercises: store.exercises.exercises,
		groups: store.exercises.groups,
		drops:store.drops,
		exsets:store.program.exsets,
		program: store.program
	}
})	




class LayoutMaker extends Component {
	constructor() {
		super()
		this.firstExerciseId=0;
		this.updateExercise = true;
		this.state = {
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
			students:[
				{id:0, name:"Keren Suer", img:'images/c4.png'},
				{id:1, name:"Grace Ng", img:'images/c2.png'},
				{id:2, name:"Eric Hoffman", img:'images/c3.jpg'},
				{id:3, name:"Kerem Suer", img:'images/c4.png'},
				{id:4, name:"Raquel Parrado", img:'images/aisha.jpg'}
			]	
    	};
	}

		
	componentWillMount(){
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

	removeUser(){
		console.log("removeUser....")	
	}

	setUser1(){
		console.log("setUsr1")
		this.props.dispatch(setUser(1))
	}

	setUser2(){
		console.log("setUsr2")
		this.props.dispatch(setUser(2))
	}

	setUser3(){
		console.log("setUsr3")
		this.props.dispatch(setUser(3))
	}

	setUser4(){
		console.log("setUsr4")
		this.props.dispatch(setUser(4))
	}

	handleDelete(evt){
		console.log("handleDelete", evt)
	}

	OnRowSelection(key){
		console.log("OnRowSelection", key)
	}

	handleCellClick (rowNumber, columnNumber, evt) {
  		console.log(rowNumber,columnNumber, event.target.innerHTML);
  		if(columnNumber==5){
  			this.props.dispatch(removeSet(rowNumber))
  		}
	}

	
	fetchStudents(){
		console.log("FETCH Students server")
		fetch('/students')	
			.then(res => res.json())
            .then(data => {
              console.log(data);
        })
		console.log("after FETCH Students")
	}	

    render(){

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
		  marginTop: 20
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

		const toolbarStyles = {
	      margin: 10,
	      backgroundColor: '#283593'
    	};

    	const menuStyles = {
      		color: '#FFFFFF'
    	};

    	const menuTitleStyles = {
      		color: '#FFFFFF',
      		backgroundColor: '#283593',
      		marginLeft: 10,
    	};


		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Discard"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];


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
	
		let	filteredExercises = exercises.filter((el) => el.group==groupName)
		console.log("filteredExercises",filteredExercises)
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

		const mappedWeeks = this.state.weeks.map(
			week => 
				<MenuItem 
					value={week.id} 
					key={week.id}
					primaryText={week.name} 
				/>
		)

	


		let current_sets = this.props.exsets.map((exset,i) =>
				<TableRow>
			        <TableRowColumn style={{width:'46%'}}>{exset.ex}</TableRowColumn>
			        <TableRowColumn style={{width:'14%'}}>{exset.sets}</TableRowColumn>
			        <TableRowColumn style={{width:'14%'}}>{exset.reps}</TableRowColumn>
			        <TableRowColumn style={{width:'14%'}}>{exset.reps}</TableRowColumn>
			        <TableRowColumn key={i} style={{width:'14%'}}>
			        	<IconButton>
			        		<Delete />
			        	</IconButton >

      				</TableRowColumn>
			     </TableRow>     
		)



		return(
		<div>	
			<Toolbar style={toolbarStyles}>
		        <ToolbarGroup firstChild={true} style={{color:blue50}}>
		          <ToolbarTitle text="Program Layout Maker" style={menuTitleStyles} />
		        </ToolbarGroup>
		        
		        <ToolbarGroup>
		            <ToolbarSeparator />
		            <MenuItem style={menuStyles}
		              containerElement={<Link to="/training" />}
		              primaryText="Trainning Sheet Outcome"
		              leftIcon={<FitnessCenter color={blue50}/>}
		            />
		        </ToolbarGroup>
		        <ToolbarGroup>
		            <MenuItem style={menuStyles}
		              containerElement={<Link to="/admin" />}
		               primaryText="Admin Tools"
		              leftIcon={<Settings color={blue50}/>}
		            />

		        </ToolbarGroup>
		        
		        <ToolbarGroup>
		          <ToolbarSeparator color={blue50}/>
		            <Chip>
		              <Avatar src="images/c0.png" />
		              Chris Smith (Coach)
		            </Chip>
		              <MenuItem style={menuStyles}
		              containerElement={<Link to="/" />}
		              leftIcon={<SettingsPower color={blue50}/>}
		            />
		        </ToolbarGroup>
	      	</Toolbar>
			
			<Grid style={gridStyle}>
				<Row className="show-grid">
        			<Col xs={12} md={12} lg={12}>
        				<Card style={{marginBottom:20}}>
        					<CardHeader avatar={this.state.users[this.props.program.user].img} title={this.state.users[this.props.program.user].name}>
        						<table>
        							<tr>
        								<td>Program for</td>
        								<td>
        									<DropDownMenu ref="dropWeeks" value={this.props.program.week} onChange={this.onWeekChange.bind(this)}>
						   						{mappedWeeks}	
											</DropDownMenu>
        								</td>
        							</tr>
        						</table>	
							</CardHeader>		
        				</Card>
        			</Col>
        		</Row>
        		<Row className="show-grid">
	        		<Col xs={12} md={12} lg={12}>
	        			<RaisedButton onClick={this.fetchStudents}  label="Fetch Students" primary={true} labelPosition="before" icon={<DoneAll />}/>
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
        				<ExercisesList style="exercisesStyles" funcao={this.handleCellClick.bind(this)} lista={current_sets}  />
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
        			<Row className="show-grid">
        			<Col xs={12} md={12} lg={2}>
        			  <Paper style={studentsStyles} zDepth={2}>
			            
			          </Paper>
        			</Col>
					<Col xs={12} md={12} lg={10}>
        			</Col>
        		</Row>
        	</Grid>
        </div>		
		)	
	}
}

export default LayoutMaker;