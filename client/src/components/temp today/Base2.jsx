import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import FitMenu from "./FitMenu";



const Base2 = ({ children }) => (
  <div>
    
    {children}

  </div>
);

Base2.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base2;