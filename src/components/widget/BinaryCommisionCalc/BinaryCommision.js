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
              have total deposit of 19000000 TRX.You will be on 
              Titanium and you will earn 0.20% (binary commission
              on Titanium) of 19000000 which is equal to 3800 TRX
              .You will keep earning this commission every week 
              on your team volume.You must be Titanium in order to 
              start earning binary commission.
          </p>
        </Row>
      </Container>
    );
  }
}
