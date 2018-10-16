import React from 'react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';


const btn ={
	backgroundColor: '#283593',
	color: '#FFC107'
};

const FitMenu = () => (
	<Navbar collapseOnSelect bsStyle='inverse' style={btn}>
    <Navbar.Header>
      <Navbar.Brand>
      		Sci-Lift	
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight >
      	<LinkContainer to="/layout">
        	<NavItem eventKey={1}>Layout Program Maker</NavItem>
        </LinkContainer>
        <LinkContainer to="/training">
        	<NavItem eventKey={1}>Training Sheet Outcome</NavItem>
        </LinkContainer>
        <LinkContainer to="/admin">
        	<NavItem eventKey={1}>Admin Tools</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
        	<NavItem eventKey={1}>Log in</NavItem>
        </LinkContainer>
        <LinkContainer to="/signup">
        	<NavItem eventKey={2} href="/signup">Sign Up</NavItem>	
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default FitMenu;
