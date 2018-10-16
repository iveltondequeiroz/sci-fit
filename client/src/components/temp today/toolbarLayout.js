import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Link, IndexLink } from 'react-router'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import Settings from 'material-ui/svg-icons/action/settings'
import SettingsPower from 'material-ui/svg-icons/action/settings-power'
import Home from 'material-ui/svg-icons/action/home'

import FitnessCenter from 'material-ui/svg-icons/places/fitness-center'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'

import Menu from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';


import { blue50 } from 'material-ui/styles/colors'


const menuTitleStyles = {
      		color: '#FFFFFF',
      		backgroundColor: '#283593',
      		marginLeft: 10,
    	};

const menuStyles = {
      		color: '#FFFFFF'
    	};

const toolbarStyles = {
	      margin: 10,
	      backgroundColor: '#283593'
    	};

export default class ToolbarLayout extends React.Component{

	constructor(props) {
    	super(props);
    	this.state = {
    		menuopen: false
    	};
  	}

  	handleToggle = () => this.setState({menuopen: !this.state.menuopen});

  	handleClose = () => this.setState({menuopen: false});

  	render() {
	    return (<div>
				<Toolbar style={toolbarStyles}>
			    
	        		<IconButton  onTouchTap={this.handleToggle}>
      					<Menu color={blue50}/>
    				</IconButton>

			        <Drawer
			          docked={false}
			          open={this.state.menuopen}
			        >
			        SCIFIT
			            	
			          <MenuItem containerElement={<Link to="/layout" />} leftIcon={<ContentPaste />} onTouchTap={this.handleClose}>Program Layout Maker</MenuItem>
			          <MenuItem containerElement={<Link to="/training" />} leftIcon={<FitnessCenter />} onTouchTap={this.handleClose}>Training Sheet Outcome</MenuItem>
			          <MenuItem containerElement={<Link to="/students" />} leftIcon={<AccountCircle />} onTouchTap={this.handleClose}>Users</MenuItem>
			          <MenuItem containerElement={<Link to="/" />} leftIcon={<Home />} onTouchTap={this.handleClose}>Home Page</MenuItem>
			          
	        		</Drawer>
	      
	      	        <ToolbarGroup firstChild={true} style={{color:blue50}}>
			          <ToolbarTitle text={this.props.title} style={menuTitleStyles} />
			        </ToolbarGroup>
			        
			       
			        <ToolbarGroup>
			          <ToolbarSeparator color={blue50}/>
			            <Chip>
			              <Avatar src="images/paul.png" />
			              Paul Attard (Coach)
			            </Chip>
			              <MenuItem style={menuStyles}
			              containerElement={<Link to="/" />}
			              leftIcon={<SettingsPower color={blue50}/>}
			            />
			        </ToolbarGroup>
		      	</Toolbar>
		    </div>
		   )
	}	   
} 
