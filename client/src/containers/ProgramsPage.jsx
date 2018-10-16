import React, {Component} from 'react'
import { Link, IndexLink } from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap'

import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {blue50} from 'material-ui/styles/colors'

import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import FitnessCenter from 'material-ui/svg-icons/places/fitness-center'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import Home from 'material-ui/svg-icons/action/home'
import Settings from 'material-ui/svg-icons/action/settings'
import SettingsPower from 'material-ui/svg-icons/action/settings-power'
import ViewList from 'material-ui/svg-icons/action/view-list'
import ViewModule from 'material-ui/svg-icons/action/view-module'
import Delete from 'material-ui/svg-icons/action/delete';

import ToolbarLayout from '../components/ToolbarLayout'


class ProgramsPage extends Component {

	constructor(){
		super()

		this.state = {
			menuopen: false,
			programsLoaded: false,
			programs:'none', 
			username:'none',
			avatarimg:'none',
			deletedok:false
		}
	}

	handleToggle = () => this.setState({menuopen: !this.state.menuopen});

  	handleClose = () => this.setState({menuopen: false});

  	componentWillMount(){
    	this.programsGet()
    	this.setState({
    		username:"Nigel"
    	})
    	console.log("END DIDMOUNT")    
  	}  

  	programsGet(){
    	console.log("programsGet()")
	    fetch('/getprograms') 
	      .then(res => res.json())
	            .then(data => {
	                let programs = data
	                this.setState({
                      programs: programs,
                      programsLoaded:true
                    })            
	        })
    }

    deleteProgram(id){
    	console.log("Delete Program", id)
    	fetch('/removeprogram', {
	            	method: 'POST',
			            headers: {
		              "Content-Type": "application/json"
		            },
	            	body: JSON.stringify(
	            		{	program_id:id  }
	            	)
	          	})

    	console.log("program removed")
    	this.programsGet()
    }        
		
	render(){
		console.log("RENDER")

		const toolbarStyles = {
      		margin: 10,
      		backgroundColor: '#283593'
    	}

    	const menuStyles = {
      		color: '#FFFFFF'
    	}

    	const menuTitleStyles = {
      		color: '#FFFFFF',
      		backgroundColor: '#283593',
      		marginLeft: 10,
    	};

		if(!this.state.programsLoaded) {
  			console.log("not loaded >>>>>>>>>>>>>>");
  			return(<span></span>)
		}


    	let progs = this.state.programs.map(
      		prog =>
        		<TableRow striped={true}>
        			<TableRowColumn>{prog.name}</TableRowColumn>
          			<TableRowColumn>{prog.user}</TableRowColumn>
          			<TableRowColumn>{prog.weeks.length}</TableRowColumn>
          			<TableRowColumn>{prog.endcycle==true?'finished':'active'}</TableRowColumn>
          			<TableRowColumn>{prog.createdby}</TableRowColumn>
          			<TableRowColumn>
        				<IconButton onClick={this.deleteProgram.bind(this, prog._id)} tooltip="Delete Program"><Delete /></IconButton>
        			</TableRowColumn>	
          		</TableRow>    
    	)
		
		return(
			<div>
		        <ToolbarLayout 
					title="Programs" 
					username={this.state.username} 
					img={this.state.avatarimg=='none'?"images/avatar64m.png":"images/"+this.state.avatarimg}
				/>	

		        <div className="container-fluid"> 
         			<Grid fluid={true}>
            			<Row className="show-grid">
                  			<Col xs={12} md={12} lg={16}>
	                  			<Table selectable={false}>
	                    			<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
	                        			<TableRow>
	                          				<TableHeaderColumn >PROGRAM</TableHeaderColumn>
	                          				<TableHeaderColumn >USER</TableHeaderColumn>
	                          				<TableHeaderColumn >WEEKS</TableHeaderColumn>
											<TableHeaderColumn >CYCLE</TableHeaderColumn>
											<TableHeaderColumn >CREATED BY</TableHeaderColumn>
											<TableHeaderColumn >ACTION</TableHeaderColumn>
	                          			</TableRow>
	                          		</TableHeader>
	                          		<TableBody stripedRows={true} displayRowCheckbox={false}>
                      					{progs}
                    				</TableBody>  
	                          	</Table>	
                  			</Col>
                  		</Row>
                  	</Grid>
               	</div>   			
	        </div>
		)
	}
} 

export default ProgramsPage