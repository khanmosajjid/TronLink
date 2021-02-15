import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import "./BinaryCommision.scss";
import { Trans } from 'react-i18next';

export default class BinaryCommission extends Component {
  render() {
    return (
      <Container className="binaryCommission">
        <Row >
          <h1 style={{marginTop:"2%",height:"fit-content"}}><Trans>Binary Commission Calculation</Trans>:</h1>
        </Row>
        <Row className="binary-body">
          <h6>
            <Trans>Binary Commissions are calculated on your 10 Levels deep Team deposit Volume</Trans>
          </h6>
          <p>
              <Trans>Example- Your team members in your 10 levels have total deposit of 19000000 TRX.</Trans>
              <Trans>You will be on Titanium and you will earn 0.20% (binary commission on Titanium) of 19000000 which is equal to 38000 TRX.</Trans>
              <Trans>You will keep earning this commission every week 
              on your team volume.You must be Titanium in order to 
              start earning binary commission.</Trans>


              
          </p>
        </Row>
      </Container>
    );
  }
}
