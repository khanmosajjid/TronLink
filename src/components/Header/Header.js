import React, { Component } from "react";
import "./Header.scss";
import { Container, Row, Col, Label, Input } from "reactstrap";
import logo from "../../assets/logo.png";
import { Icon } from "semantic-ui-react";

export default class Header extends Component {
  render() {
    return (
      <Container fluid={true} className="header">
        <Row className="header-row">
          <Col lg={4} className="header__logo">
            <img style={{ height: "80%" }} src={logo} alt="compony-logo"></img>
          </Col>
          <Col lg={8} className="header__containt">
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
                {/* <Icon name="clock" style={{color:"#0d64b1"}}></Icon> */}
                <p>Connect Wallet</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
