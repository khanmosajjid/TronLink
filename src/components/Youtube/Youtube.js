import React, { Component } from "react";
import { Container, Row,Col } from "reactstrap";
import "./Youtube.scss";
import dot from "../../assets/dot.png";
import numberLogo from '../../assets/numberLogo.png';
import location from '../../assets/location.png'
export default class Youtube extends Component {
  render() {
    return (
      <Container className="youtube">
        <Row className="youtube__card">
          <iframe
            src="https://www.youtube.com/embed/E7wJTI-1dvQ"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="video"
          />
        </Row>
        <Row className="compony-detail">
          <Row style={{width:"93%"}}>
          <img src={dot}></img>

          </Row>
          <Row className="detail-header1">
          <Col lg={3} className="detail-header">
            
            <p>Officially</p>
            <h3 style={{textAlign:"start"}}>Registered Company</h3>
          </Col>
          <Col lg={4} className="detail">
             
              <div className="detail-card">
              <img src={numberLogo} style={{height:"40px"}}></img>
              <Row className="compony-number">
                  <h6>Company Number</h6>
                  <p>12345678</p>
              </Row>
              </div>

          </Col>
          
          <span style={{marginLeft:"10px"}}></span>
          <Col lg={4} className="detail">
        <div className="address-card">
              <img src={location} style={{height:"40px"}}></img>
              <Row className="compony-number">
                  <h6>Company Number</h6>
                  <p>12345678</p>
              </Row>
              </div>
        </Col>
            
          </Row>
         
          <Row className="detail-footer">
          <img src={dot}></img>
          </Row>
        </Row>
        
      </Container>
    );
  }
}
