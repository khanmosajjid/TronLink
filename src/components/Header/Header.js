import React, { Component } from "react";
import { useState } from "react";
import "./Header.scss";
import { Container, Row, Col, Label, Input } from "reactstrap";
import logo from "../../assets/logo.png";
import { Icon } from "semantic-ui-react";
import tron from '../../assets/tron.jpeg'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const Header = (props) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar dark expand="md" fluid={true} className="header" style={{backgroundColor:""+props.background}}>
      <NavbarBrand className="header__logo">
        <img className="logo" src={logo} alt="compony-logo"></img>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
        <Row className="header__containt-report">
  <Col lg={3} className="header__containt-dailyreport">
    <Icon name="clock" style={{ color: "#0d64b1" }}></Icon>
    <p>Daily Trading reports</p>
  </Col>
  <Col lg={4} className="header__containt-weeklyreport">
    <Icon name="calendar" style={{ color: "#eb475b" }}></Icon>
    <p>Weekly Trading reports</p>
  </Col>
  <Col
    lg={3}
    className="header__containt-dailyreport"
    style={{ marginRight: "0px !important" }}
  >
    <img src={tron} className="tron-logo"/>
    <p>Connect Wallet</p>
  </Col>
</Row>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
export default Header;


