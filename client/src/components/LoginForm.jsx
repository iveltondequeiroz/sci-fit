import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Home from 'material-ui/svg-icons/action/home'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';

import {indigo500, indigoA400, blue50, lightBlue900} from 'material-ui/styles/colors';

const loginStyle = {
  width: 340,
  marginTop:100
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

const menuStyles = {
  color: '#FFFFFF'
};

const LoginForm = ({
  onSubmit,
  onChange,
  onLoginClick,
  errors,
  user
}) => (
<div>
    <Toolbar style={toolbarStyles}>
        <ToolbarGroup firstChild={true} style={{color:blue50}}>
          <ToolbarTitle text="Welcome to Sci-Lift" style={menuTitleStyles} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator color={blue50}/>
              <MenuItem style={menuStyles}
              containerElement={<Link to="/home" />}
              primaryText="Home"
              rightIcon={<Home color={blue50} style={{marginRight:5}}/>}
            />
        </ToolbarGroup>
      </Toolbar> 
  <Paper className="container" style={loginStyle} zDepth={5}>
    
      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" onClick={onLoginClick}label="Log in" primary />
      </div>

      <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
  </Paper>
</div>  
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;