import React, { Component } from "react";
import {useState} from "react";
import { Container, Row,Col,Button } from "reactstrap";
import "./Youtube.scss";
import dot from "../../assets/dot.png";
import numberLogo from '../../assets/numberLogo.png';
import location from '../../assets/location.png'
import Popup from "../Popup/Popup"
import Pdf from '../../assets/certificate.pdf'
function Youtube(props){
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  
    return (
      <Container className="youtube">
        <Row className="youtube__card">
          {/* <iframe
            src="https://www.youtube.com/watch?v=4GF5N3PGRPk"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="video"
          /> */}

<iframe 
src="https://www.youtube.com/embed/4GF5N3PGRPk"
 frameborder="0" 
 allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
 allowfullscreen></iframe>
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
                  <h6>Company Name</h6>
                  <p>Trontiply Limited</p>
              </Row>
              </div>

          </Col>
          
          <span style={{marginLeft:"10px"}}></span>
          <Col lg={4} className="detail">
        <div className="address-card">
              <img src={location} style={{height:"40px"}}></img>
              <Row className="compony-number">
                  <h6>Company Number</h6>
                  <p>13105007</p>
              </Row>
              </div>
        </Col>
            
          </Row>
         
          <Row className="detail-footer">
            <Col lg={6}>
            <a href={Pdf} without rel="noopener noreferrer" target="_blank">
      <Button trailingIcon="picture_as_pdf" label="Certificate" className="certi-bttn">
        Check Our Certificate
      </Button>
      </a>
            </Col>
            <Col lg={4} className="bottom-dot">
              <img src={dot}></img>
            </Col>
          
   
          {isOpen && (
              <Popup backGround="white"
                content={
                  <>
                  <span className="close-icon" onClick={togglePopup}>
                  x
                </span>
                    </>
                }
               
              />
            )}
          </Row>
        </Row>
        
      </Container>
    );
  }
  export default Youtube;

