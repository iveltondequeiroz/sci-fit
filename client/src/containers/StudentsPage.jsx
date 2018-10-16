import React, {Component} from 'react'
import StudentsList from '../components/StudentsList.jsx'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'		
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import {Grid, Row, Col } from 'react-bootstrap'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';
import Snackbar from 'material-ui/Snackbar';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <ContentAdd />;
const favoritesIcon = <Remove />;
const nearbyIcon = <ModeEdit />;

import RaisedButton from 'material-ui/RaisedButton'

import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import ToolbarLayout from '../components/ToolbarLayout'


import {fetchUser, setUserName, setUserAge} from '../actions/userActions'
import {fetchStudents} from '../actions/studentsActions'

@connect((store) => {
	return {
		app: store.app,
		students: store.students,
	}
})	




class StudentsPage extends Component {

	constructor() {
		super()
		this.state = {
			username:'none',
			avatarimg:'none',
			cardTitle:'SELECT/ADD AN USER',
			cardAvatar: 'images/avatar64m.png',
			isEditing: false,
			editOn: false,
      		snackFail: false,
      		snackOk: false,
      		sgender: 'm',
      		sname:'',
      		sage:'',
      		sweight:'',
      		isCoach:false,
      		isAdmin:false,
      		actionType:'insert',
      		selectedIndex: 0
      	}	
	}	


	select = (index) => this.setState({selectedIndex: index});
	
	studentSelect(item){
		console.log(item)
		this.refs.studentname.focus()
		this.setState({
			cardTitle:item.name.toUpperCase(),
			sid: item._id,
			sname:item.name,
			sage:item.age,
			sweight:item.weight,
			sgender:item.gender,
			isCoach:item.isCoach,
			isAdmin:item.isAdmin,
			editOn: true
		})
	}

	studentDelete(){
		console.log("before student delete")
		console.log(this.state.sid)
		fetch('/deletestudent', {
        	method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
        	body: JSON.stringify( 
        		{	
        			"id":this.state.sid          		
        		}
        	)
      	})
		console.log("after student delete")
		
		this.studentsGet()
	}

	studentUpdate(){
		console.log("before student update")
		console.log(this.state.sid)
		fetch('/updatestudent', {
        	method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
        	body: JSON.stringify( 
        		{	
        			"id":this.state.sid,
        			"name": this.state.sname,
        			"weight":this.state.sweight,
					"gender":this.state.sgender,
					"isCoach":item.isCoach,
					"isAdmin":item.isAdmin
        		}
        	)
      	})
		console.log("after student update")
		this.studentsGet()
	}


	studentAdd(){
		this.setState({
			isEditing: true,
			actionType:'insert'
		})
	}

	studentEdit(){
		this.setState({
			isEditing: true,
			actionType:'update',
			editOn: false
		})
	}


	studentsGet(){
		fetch('/getstudents')	
			.then(res => res.json())
            .then(data => {
              this.props.dispatch(fetchStudents(data));
              console.log("after FETCH Students")
        })
	}

		
	
	doSave = function (e) {
		e.preventDefault()

		
		let name = this.refs.studentname.getValue()
		if(name=='') {
			this.setState({
      			snackFail: true,
    		});
    		this.refs.studentname.focus()
			return false
		} else {
			if(this.state.actionType=='insert') {

				let noStudents = this.props.students.students.length
				console.log(noStudents)



		
	    		fetch('/insertstudent', {
	            	method: 'POST',
		            headers: {
		              "Content-Type": "application/json"
		            },
	            	body: JSON.stringify( 
	            		{	
		        			"id": noStudents, 
		        			"name": this.state.sname,
		        			"age": this.state.sage,
		        			"weight":this.state.sweight,
							"gender":this.state.sgender,
							"isCoach":this.state.isCoach,
							"isAdmin":this.state.isAdmin            		
	            		}
	            	)
	          	})
			} else {
				console.log("before student update")
				console.log(this.state.sid)
				console.log("this.state.isCoach")
				console.log(this.state.isCoach)
				
				fetch('/updatestudent', {
		        	method: 'POST',
		            headers: {
		              "Content-Type": "application/json"
		            },
		        	body: JSON.stringify( 
		        		{	
		        			"id":this.state.sid,
		        			"name": this.state.sname,
		        			"age": this.state.sage,
		        			"weight":this.state.sweight,
							"gender":this.state.sgender,
							"isCoach":this.state.isCoach,
							"isAdmin":this.state.isAdmin

		        		}
		        	)
		      	})
				console.log("after student update")
			}

          	this.setState({
				isEditing: false,
				snackOk: true
			})
			
			console.log("studentsGet()")
			this.studentsGet()

    		return true	
		}
	}

	doCancel(){
		this.setState({
			isEditing: false
		})
	}

	closeSnackFail(){
		this.setState({
      		snackFail: false
    	});
	}

	closeSnackOk(){
		this.setState({
      		snackOk: false
    	});
	}

	
	componentWillMount(){
		this.studentsGet()
	}

	handleRadioChange (e) {
		this.setState({
      		sgender: e.target.value
    	});	
	}

	nameChange(e){
		this.setState({
			sname:e.target.value
		})
	}

	ageChange(e){
		this.setState({
			sage:e.target.value
		})
	}

	weightChange(e){
		this.setState({
			sweight:e.target.value
		})
	}

	isCoachChange(e){
		this.setState({
			isCoach:e.target.checked
		})
	}

	isAdminChange(e){
		this.setState({
			isAdmin:e.target.checked
		})
	}



	render(){
		
		const studentsStyles = {
		  height: '100%',
		  width: 300,
		  textAlign: 'left',
		  marginLeft: 0,
		};

		const cardStyle = {
		  	textAlign: 'left'
		};

		const sectionStyle = {
		  	backgroundColor: '#E1F5FE',
		  	display: 'flex',
		  	width: 'auto'
		};

		const centeredStyle = {
			textAlign: 'center'
		};

		const redStyles = {
			textAlign: 'center',
			backgroundColor: '#FF1744'
		};

		const greenStyles = {
			textAlign: 'center',
			backgroundColor: '#388E3C'
		};


		const numberStyle = {
  			marginRight	: 20,
  			width: 60,
  			marginBottom: 10
			
		};

		const radioStyle = {
  			width: 100,
  			display: 'flex'
		};

		const buttonStyle = {
			marginLeft	: 5,
			marginRight	: 5,
			marginTop: 10,
			marginBottom: 10,
			backgroundColor:"#80D8FF"
		};

		const gridStyle = {
			marginLeft	: 10,
			marginRight	: 10,
			marginTop: 10
		};
	
		const styles = {
  			imageInput: {
			    cursor: 'pointer',
			    position: 'absolute',
			    top: 0,
			    bottom: 0,
			    right: 0,
			    left: 0,
			    width: '100%',
			    opacity: 0,
			},
		};
	
		const {students} = this.props;

		const filteredStudents = students.students.filter((student) => student.name!="Select a Student")
		const mappedStudents = filteredStudents.map(
			student => 
				<ListItem
					key = {student._id}
					id = {student._id}
			       	primaryText={student.name}
			        onClick={() => this.studentSelect(student)}
			    />
		)

		return(
		<div className="container-fluid">	
			<ToolbarLayout 
				title="Users"
				username={this.state.username} 
					img={this.state.avatarimg=='none'?"images/avatar64m.png":"images/"+this.state.avatarimg} 
			/>	
			<Grid style={gridStyle}>
				<Row>
        			<Col xs={12} md={12} lg={4}>	
        				<Paper style={studentsStyles} zDepth={4}>
							<List>
								<Subheader style={sectionStyle}>
									USERS
								</Subheader>
								{mappedStudents}
							</List>
						</Paper>
					</Col>
					<Col xs={12} md={12} lg={6}>	
					<form action="/insertstudent" method="POST" onSubmit={this.doSave.bind(this)}>	
    					<Card >
							<CardHeader title={this.state.cardTitle} avatar={this.state.cardAvatar} style={sectionStyle}/>
   							<CardText>
								<div>
									<TextField ref="studentname" value={this.state.sname} onChange={this.nameChange.bind(this)} disabled={!this.state.isEditing}  floatingLabelText="name" id="name" name="name"/>
								</div>
								<div>
									<TextField ref="age" type="number"  value={this.state.sage} onChange={this.ageChange.bind(this)} disabled={!this.state.isEditing} style={numberStyle} floatingLabelText="Age" name="age"/>
						
									<TextField ref="weight" type="number" value={this.state.sweight} onChange={this.weightChange.bind(this)} disabled={!this.state.isEditing} style={numberStyle} floatingLabelText="Weight" name="weight"/>
								</div>
								<div>
								<Checkbox checked={this.state.isCoach} onCheck={this.isCoachChange.bind(this)} disabled={!this.state.isEditing} label="Coach"/>
								<Checkbox checked={this.state.isAdmin} onCheck={this.isAdminChange.bind(this)} disabled={!this.state.isEditing} label="Admin"/>
								
								</div>					
    						</CardText>
    						<Divider/>
    						<div style={centeredStyle}>
    						<RaisedButton type="submit" ref="saveStudent"  disabled={!this.state.isEditing} style={buttonStyle}   label="SAVE"  labelPosition="before"  icon={<Check />}/>
							<RaisedButton type="cancel" ref="cancel" onClick={this.doCancel.bind(this)} disabled={!this.state.isEditing} style={buttonStyle}  label="CANCEL"  labelPosition="before"  icon={<Close />}/>
							</div>
							<CardActions style={sectionStyle}>
								<FloatingActionButton type="submit" disabled={this.state.isEditing} onClick={this.studentAdd.bind(this)} mini={true} >
	  								<ContentAdd />
								</FloatingActionButton>

								<FloatingActionButton mini={true} disabled={this.state.isEditing} onClick={this.studentDelete.bind(this)}>
	  								<Remove />
								</FloatingActionButton>
								
								<FloatingActionButton mini={true} disabled={!this.state.editOn}  onClick={this.studentEdit.bind(this)}>
	  								<ModeEdit />
								</FloatingActionButton>
							</CardActions>
							<Snackbar
		          				open={this.state.snackFail}
		          				message="Please Inform Student's Name"
		          				autoHideDuration={2000}
		          				onRequestClose={this.closeSnackFail.bind(this)}
		          				bodyStyle={redStyles}
		        			/>
		        			<Snackbar
		          				open={this.state.snackOk}
		          				message="User Saved"
		          				autoHideDuration={2000}
		          				onRequestClose={this.closeSnackOk.bind(this)}
		          				bodyStyle={greenStyles}
		        			/>	
						</Card>
					</form>	
					</Col>
				</Row>
			</Grid>
		</div>					
		)	
	}
}

export default StudentsPage;
