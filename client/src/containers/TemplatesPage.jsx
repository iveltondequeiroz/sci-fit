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


class TemplatesPage extends Component {

	constructor(){
		super()

		this.state = {
			menuopen: false,
			templatesLoaded: false,
			templates:'none', 
			username:'none',
			avatarimg:'none',
			deletedok:false
		}
	}

	handleToggle = () => this.setState({menuopen: !this.state.menuopen});

  	handleClose = () => this.setState({menuopen: false});

  	componentWillMount(){
    	this.templatesGet()
    	this.setState({
    		username:"Nigel"
    	})
    	console.log("END DIDMOUNT")    
  	}  

  	templatesGet(){
		console.log("templatesGet()")
		
		fetch('/gettemplates')	
			.then(res => res.json())
            .then(data => {        		
  				this.setState({
          			templates:data,
          			templatesLoaded:true      				
          		})
        })
	}	

    deleteTemplate(id){
    	console.log("Delete template", id)
    	fetch('/removetemplate', {
	            	method: 'POST',
			            headers: {
		              "Content-Type": "application/json"
		            },
	            	body: JSON.stringify(
	            		{	template_id:id  }
	            	)
	          	})
    	
    	this.setState({
          	templatesLoaded:false      				
		}, function(){
			this.templatesGet()
			console.log("template removed")
		})
    	
    }        
		
	render(){
		console.log("RENDER template")

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

		if(!this.state.templatesLoaded) {
  			console.log("not loaded >>>>>>>>>>>>>>");
  			return(
  				<div>
	  				<ToolbarLayout 
						title="Templates" 
						username={this.state.username} 
						img={this.state.avatarimg=='none'?"images/avatar64m.png":"images/"+this.state.avatarimg}
					/>	
  					<h3>No Templates Available</h3>
  				</div>
  				)
		} else {
			console.log("loaded >>>>>>>>>>>>>>");
		}

		let filteredTempls = this.state.templates.filter((templ) => templ.name!='none')
		
    	let templs = filteredTempls.map(
      		templ =>
        		<TableRow striped={true}>
        			<TableRowColumn>{templ.name}</TableRowColumn>
          			<TableRowColumn>{templ.weeks.length}</TableRowColumn>
          			<TableRowColumn>{templ.createdby}</TableRowColumn>
          			<TableRowColumn>
        				<IconButton onClick={this.deleteTemplate.bind(this, templ._id)} tooltip="Delete Template"><Delete /></IconButton>
        			</TableRowColumn>	
          		</TableRow>    
    	)
		
		return(
			<div>
		        <ToolbarLayout 
					title="Templates" 
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
	                          				<TableHeaderColumn >TEMPLATE</TableHeaderColumn>
	                          				<TableHeaderColumn >WEEKS</TableHeaderColumn>
	                						<TableHeaderColumn >CREATED BY</TableHeaderColumn>
											<TableHeaderColumn >ACTION</TableHeaderColumn>
	                          			</TableRow>
	                          		</TableHeader>
	                          		<TableBody stripedRows={true} displayRowCheckbox={false}>
                      					{templs}
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

export default TemplatesPage