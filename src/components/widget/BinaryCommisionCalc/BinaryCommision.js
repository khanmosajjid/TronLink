import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import "./BinaryCommision.scss";

export default class BinaryCommision extends Component {
  render() {
    return (
      <Container className="binarycommision">
        <Row >
          <h1 style={{marginTop:"2%",height:"fit-content"}}>Binary Commission Calculation:</h1>
        </Row>
        <Row className="binary-body">
          <h6>
            Binary Commissions are calculated on your 10 Levels deep Team
            deposit Volume
          </h6>
          <p>
              Example: Your team members in your 10 levels
              have total deposit of 19000000 TRX.you will be on 
              Titanium and you will earn 0.1% (binary commission)
              on Titanium of 19000000 which is equla to 1900 TRX
              .you will keep earning this commission every week 
              on your team volume.you must be titanium in order to 
              start earning binary commission.
          </p>
        </Row>
      </Container>
    );
  }
}
