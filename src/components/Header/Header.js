import React, { Component, useEffect } from "react";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import "./Header.scss";
import { Container, Row, Col, Label, Input } from "reactstrap";
import logo from "../../assets/logo.png";
import { Icon } from "semantic-ui-react";
import "react-flags-select/scss/react-flags-select.scss";
import tron from "../../assets/tron.jpeg";
import india from "../../assets/india.png"
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
  FormGroup,
} from "reactstrap";

const Header = (props) => {
  const [isWalletConnected, setWalletConected] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    var obj = setInterval(async () => {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        clearInterval(obj);

        let rawAdd = window.tronWeb.defaultAddress.base58;
        let address =
          rawAdd.substring(0, 6) + "..." + rawAdd.substr(rawAdd.length - 6);
        setWalletAddress(rawAdd);
        setWalletConected(true);
      }
    }, 10);
  }, []);

  return (
    <Navbar
      dark
      expand="md"
      fluid={true}
      className="header"
      style={{ backgroundColor: "" + props.background }}
    >
      <NavbarBrand className="header__logo" href="/">
        <img className="logo" src={logo} alt="compony-logo"></img>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <Row className="header__containt-report" noGutters>
            <Col lg={3} className="header__containt-weeklyreport">
              <Icon
                name="calendar"
                style={{ color: "#eb475b" }}
                size={20}
              ></Icon>
              <p>Weekly Trading reports</p>
            </Col>
            <Col
              lg={6}
              className="header__containt-dailyreport"
              style={{ marginRight: "0px !important" }}
            >
              <img src={tron} className="tron-logo" style={{ height: 15 }} />
              {isWalletConnected ? <p>{walletAddress}</p> : "Connect Wallet"}
            </Col>

            <FormGroup>
              {/* <Label for="exampleSelect">Select</Label> */}
              <Input type="select" name="select" id="exampleSelect">
                <option>
                  
                  Choose Language
                </option>

                <option style={{color:"black !important"}}>
                  <img alt="india"></img>
                  Hindi
                </option>
                <option style={{color:"black !important"}}>
                  <img alt="india"></img>
                  English
                </option>
                <option style={{color:"black !important"}}>
                  <img alt="india"></img>
                  French
                </option>
                <option style={{color:"black !important"}}>
                  <img alt="india"></img>
                  Chinese
                </option>
                <option style={{color:"black !important"}}>
                  <img alt="india"></img>
                  Arabic
                </option>
                <option style={{color:"black !important"}}>
                  <img alt="india"></img>
                  Persiona
                </option>
                <option>
                  <img alt="india"></img>
                  Vietnamese
                </option>
              </Input>
            </FormGroup>
          </Row>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
export default Header;
