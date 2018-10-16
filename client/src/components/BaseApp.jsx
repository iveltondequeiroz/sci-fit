import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import FitMenu from "./FitMenu";



const BaseApp = ({ children }) => (
  <div>
    
    {children}

  </div>
);

BaseApp.propTypes = {
  children: PropTypes.object.isRequired
};

export default BaseApp;