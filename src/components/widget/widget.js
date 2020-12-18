import React, { Component } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import "./widget.scss";
import { Icon } from "semantic-ui-react";
import BinaryCommision from "./BinaryCommisionCalc/BinaryCommision";

export default class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      trx: this.props.trx,
      logo: this.props.logo,
      level: this.props.level,
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
              <span style={{ color: "" + this.props.color }}>
                {this.props.levelName}{" "}
              </span>
            </h3>
            <Row style={{width:"100%",marginBottom:"8px"}}>
              <Col className="details-requirements" style={{padding: "0px" }}>
                <img src={this.props.icon1} style={{ height: "20px" }}></img>

                <p>
                  Requirements:
                  <span
                    style={{ color: "" + this.props.color, fontWeight: "600" }}
                  >
                    {this.props.levelAmmount}
                  </span>
                  TRX Deposit (you must deposit 100 TRX in order to earn from
                  your referrals)
                </p>
              </Col>
            </Row>

            <Row style={{ width: "100%" }}>
              <Col
                className="details-requirements"
                style={{padding: "0px" }}
              >
                <img src={this.props.icon2} style={{ height: "20px" }}></img>

                <p style={{ fontWeight: "600" }}>
                  Commission upto {this.props.levelNumber} Levels
                </p>
              </Col>
            </Row>

            <Row className="widgets-level-box">
              {[...Array(parseInt(this.props.levelNumber))].map(
                (elementInArray, index) => (
                  <Col
                    lg={3}
                    style={{ marginBottom: "2%", fontWeight: "600" }}
                    key={index}
                  >
                    <p>
                      Level {index + 1} ={" "}
                      <span
                        style={{
                          color: "" + this.props.color,
                          fontWeight: "600",
                        }}
                      >
                        4%
                      </span>
                    </p>
                  </Col>
                )
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
