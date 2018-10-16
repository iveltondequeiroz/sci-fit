import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import FitnessCenter from 'material-ui/svg-icons/places/fitness-center'
import Home from 'material-ui/svg-icons/action/home'
import SettingsPower from 'material-ui/svg-icons/action/settings-power'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'
import Settings from 'material-ui/svg-icons/action/settings'
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {red500, indigo500, indigoA400, blue50, lightBlue900} from 'material-ui/styles/colors'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AdminForm from '../components/AdminForm.jsx';
import ToolbarLayout from '../components/ToolbarLayout'


class AdminPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {

    };

  }





  render() {
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


    return (
    <div className="container-fluid"> 
      <ToolbarLayout title="Admin Tools"/>  
        <Tabs>
          <Tab
            icon={<AccountCircle/>}
            label="Students"
          >
          <Card>
            <CardTitle title="Students content here" subtitle="list of students" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>   
          </Card>
          </Tab>
          
          <Tab
            icon={<FitnessCenter/>}
            label="Coaches"
          >
          <Card>
            <CardTitle title="Coaches content here" subtitle="list of students" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              
            </CardText>   
          </Card>

          </Tab>
          <Tab
            icon={<Settings />}
            label="Settings"
          />
        </Tabs>
      </div>  
    );
  


  }

}

export default AdminPage;