import React, { Component } from "react";
import { Container, Row, Input, Label,Button } from "reactstrap";
import "./Promotion.scss";
import banner1 from "../../assets/banner1.png";

export default class Promotion extends Component {
  render() {
    return (
      <Container className="promotion">
        <h1>Promotional Banners</h1>
        <src></src>
        <img src={banner1} style={{marginTop: "25px"}}></img>
        <Row className="input-bar">
          <Label for="amount"></Label>
          <Input
            type="text"
            name="amount"
            className="input-box"
            placeholder="Enter Amount"
          />
          <Button className="promotion__button">Copy</Button>
        </Row>

        <img src={banner1}></img>
        <Row className="input-bar">
          <Label for="amount"></Label>
          <Input
            type="text"
            name="amount"
            className="input-box"
            placeholder="Enter Amount"
          />
          <Button className="promotion__button">Copy</Button>
        </Row>
        
      </Container>
    );
  }
}
