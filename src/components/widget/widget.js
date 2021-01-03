import React, { Component } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import "./widget.scss";
import { Icon } from "semantic-ui-react";
import BinaryCommision from "./BinaryCommisionCalc/BinaryCommision";
import { Trans } from 'react-i18next';

export default class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      trx: this.props.trx,
      logo: this.props.logo,
      // level: this.props.level,
      binaryCommision: this.props.binaryCommision,
    };
  }

  render() {
    return (
      <Container className="widget">
        <Row
          className="widget-box"
          style={{ border: "1px solid " + this.props.color }}
        >
          <Col
            lg={3}
            className="widget-logo"
            style={{ borderRight: "1px solid " + this.props.color }}
          >
            <div
              className="widget-logo-style"
              style={{
                background:
                  "linear-gradient(262deg," +
                  this.props.bgStartColor +
                  " 8%," +
                  this.props.bgEndColor +
                  " 98%)",
              }}
            >
              <img src={this.props.image} style={{ height: "75px" }}></img>
            </div>
          </Col>
          <Col lg={9} className="widget-details">
            <h3>
              <span style={{ color: "" + this.props.color ,fontSize:32}}>
                <Trans>{this.props.levelName}</Trans>{" "}
              </span>
            </h3>
            <Row style={{width:"100%",marginBottom:"8px"}}>
              <Col className="details-requirements" style={{padding: "0px" }}>
                <img src={this.props.icon1} style={{ height: "20px" }}></img>
                <Trans>
                <p className="requirement">
                  <span style={{fontWeight:"600"}}>
                  Requirements:
                  </span>
                  <span
                    style={{ color: "" + this.props.color, fontWeight: "600" }}
                  >
                    {this.props.levelamount}
                  </span>
                  {this.props.requirement}
                </p>
                </Trans>
               
              </Col>
            </Row>

            <Row style={{ width: "100%" }}>
              <Col
                className="details-requirements"
                style={{padding: "0px" }}
              >
                <img src={this.props.icon2} style={{ height: "20px" }}></img>

                <p style={{ fontWeight: "600" ,marginLeft:"5px"}}>
                  Commission upto {this.props.level} Levels
                </p>
              </Col>
            </Row>

            <Row className="widgets-level-box">
              {
          
              [...Array(parseInt(this.props.levelNumber.length))].map(
                (elementInArray, index) => (
                  <Col
                    lg={3}
                    style={{ marginBottom: "2%", fontWeight: "600" }}
                    key={index}
                  >
                    <Trans>
                    <p>
                      Level {index + 1} =
                      <span
                        style={{
                          color: "" + this.props.color,
                          fontWeight: "600",
                        }}
                      >
                        {this.props.levelNumber[index]}
                      </span>
                    </p>
                    </Trans>
                  </Col>
                )
              )}
            </Row>
            <Row style={{ width: "100%" }}>
              <Col
                className="details-requirements"
                style={{padding: "0px" }}
              >
                <img src={this.props.binaryCommisionIcon} style={{ height: "20px" }}></img>

                <p style={{ fontWeight: "600",marginLeft:"5px" }}>
                  {this.props.binaryCommision} <span
                        style={{
                          color: "" + this.props.color,
                          fontWeight: "600",
                        }}
                      >
                        {this.props.binaryCommisionPerc}
                      </span>
                      {this.props.binaryCommisionInfo}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
