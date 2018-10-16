import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import {Grid, Row, Col, Clearfix, Image} from 'react-bootstrap'
import { Link, IndexLink } from 'react-router';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'

import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';



import {blue50, red500, red700, red900, redA400, indigo500, indigoA400, green500} from 'material-ui/styles/colors';

const paper1 = {
  height: 540,
  width: 900,
  marginTop: 10,
  textAlign: 'center',
  display: 'inline-block',
};

const paper2 = {
  width: "100%",
  height: 260,
  marginTop: 10,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: "#1A237E"
};

const paper3 = {
  width: "100%",
  height: 200,
  textAlign: 'center',
  marginTop: 10,
  marginTop: 10,
  
  display: 'inline-block',
  backgroundColor: "#E3F2FD"
};

const paper4 = {
  width: "100%",
  height: 160,
  marginTop: 30,
  marginBottom: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: "#1A237E"
};

const textStyles = {
  marginLeft: 24,
  marginTop: 14
};

const buttonStyles = {
  marginLeft: 150,
  marginTop: 14
};

const toolbarStyles = {
      margin: 10,
      backgroundColor: '#283593'
    };

const menuTitleStyles = {
      color: '#FFFFFF',
      backgroundColor: '#283593',
      marginLeft: 10,
    };

const imgUrl = 'images/sci-landing-blue.png';
const highlights = 'images/highlights.png';
const socialicons = 'images/icons.png';

const menuStyles = {
  color: '#FFFFFF'
};



const SciliftLanding = () => (

<div>
    <Toolbar style={toolbarStyles}>
        <ToolbarGroup firstChild={true} style={{color:blue50}}>
          <ToolbarTitle text="Welcome to Sci-Lift" style={menuTitleStyles} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator color={blue50}/>
            <MenuItem style={menuStyles}
              containerElement={<Link to="/login" />}
              primaryText="Login"
              rightIcon={<ExitToApp color={blue50} style={{marginRight:5}}/>}
            />
        </ToolbarGroup>
      </Toolbar> 

   <Grid fluid style={{
          marginRight: 0,
          marginLeft: 0,
                          
        }} >
              
    <Row>
      <Col xs={12} md={12} lg={12}>
        <Image src={imgUrl} responsive  />
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} lg={12}>
        <Paper style={paper2} zDepth={3}>
             <Image src={highlights} responsive  />
          </Paper>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} lg={12}>
        <Paper style={paper3} zDepth={2}>
            <h1>The Team</h1>
            <Card>
              <CardHeader
                title="Paul Attard"
                subtitle="Health & Fitness Coach"
                avatar="images/paulavatar.PNG"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true} style={{textAlign: 'left'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardMedia expandable={true} >
                <img src="images/attard.jpg" />
            </CardMedia>

            </Card> 
            <Card>
              <CardHeader
                title="Nigel Morgan"
                subtitle="Health & Fitness Coach"
                avatar="images/default.png"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
            </Card>

          </Paper>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12} lg={12}>
        <Paper style={paper4} zDepth={3}>
          <br/>
          <Image src={socialicons} responsive  />
        </Paper>
      </Col>
    </Row>
  </Grid>
</div>  
);

export default SciliftLanding;

