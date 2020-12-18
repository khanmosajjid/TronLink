import React, { Component } from "react";
import { Container, Row, Col, Label, Input, Button } from "reactstrap";
import "./Main.scss";
import { Icon } from "semantic-ui-react";
import Withdraw from "../Withdraw/Withdraw";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
import icon6 from "../../assets/icon6.png";
import icon7 from "../../assets/icon7.png";
import icon8 from "../../assets/icon8.png";
import icon9 from "../../assets/icon9.png";
import icon10 from "../../assets/icon10.png";
import icon11 from "../../assets/icon11.png";
import deposit from "../../assets/deposit.png";
import volumebg from "../../assets/volume_bg.png";

import Card from "../../components/Body/Cards/Cards";
export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <Row className="main__header">
          <h2>Daily Profit</h2>
          <span></span>
        </Row>
        <Row className="main__resultcard">
          <Col lg={6} xs={12} style={{ maxWidth: "47%" }}>
            <Row className="total-result1">
              <Col lg={6} className="card1">
                <h1>+ 0.41%</h1>
                <h3>Total Result</h3>
                <p>01 Dec 2020</p>
              </Col>
              <Col lg={6} className="card2">
                <h3>Digital License</h3>
                <div className="volume">
                  <p style={{ margin: "0px", color: "white" }}>Total Volume</p>
                  <p
                    style={{ margin: "0px", color: "white", fontWeight: "600" }}
                  >
                    746392989
                  </p>
                </div>
                <div className="volume">
                  <p style={{ margin: "0px", color: "white" }}>
                    Total Transaction
                  </p>
                  <p
                    style={{ margin: "0px", color: "white", fontWeight: "600" }}
                  >
                    438
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
          <span style={{ marginLeft: "2%", marginRight: "2%" }}></span>
          <Col lg={6} xs={12} style={{ maxWidth: "47%" }}>
            <Row className="total-result2">
              <Col lg={6} className="card1">
                <h1>+ 1.00%</h1>
                <h3>Total Result</h3>
                <p>01 Dec 2020</p>
              </Col>
              <Col lg={6} className="card2">
                <h3>Digital License</h3>
                <div className="volume">
                  <p style={{ margin: "0px", color: "white" }}>Total Volume</p>
                  <p
                    style={{ margin: "0px", color: "white", fontWeight: "600" }}
                  >
                    746392989
                  </p>
                </div>
                <div className="volume">
                  <p style={{ margin: "0px", color: "white" }}>
                    Total Transaction
                  </p>
                  <p
                    style={{ margin: "0px", color: "white", fontWeight: "600" }}
                  >
                    438
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="main__refferral-link">
          <p>
            <span>
              <Icon name="paperclip"></Icon>Refferal Link :{" "}
            </span>
            QR code for Refferral link
          </p>
        </Row>
        <Row className="main__deposit">
          <div className="deposit-icon">
            <img src={deposit}></img>
          </div>

          <h6>Make A Deposit</h6>
          <Label for="amount"></Label>
          <Input
            type="text"
            name="amount"
            className="input-box"
            placeholder="Enter Amount"
          />
          <Button className="deposit__button">Confirm Deposit</Button>
        </Row>
        <Row className="cards">
          <Card
            card1Name="your Daily Profit"
            card2Name="Basic Profit"
            card3Name="Personal Deposit Bonus"
            card4Name="Availble Account Balance"
            card1Data="0"
            card2Data="0"
            card3Data="0"
            card4Data="0"
          ></Card>
        </Row>
        <Row className="withdraw">
          <div className="withdraw__heading">
            <h5>Withraw Funds</h5>
          </div>
          <span></span>
          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Total Earned From Daily Profits"
              icon={icon1}
              color="#2696e5"
              bgStartColor="#79dbfb "
              bgEndColor="#2794e5"
            ></Withdraw>
          </Col>
          <span className="spn"></span>
          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Earning Cap"
              icon={icon8}
              color="#dc5063"
              bgStartColor="#f19539"
              bgEndColor="#f3037e"
            ></Withdraw>
          </Col>

          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Total Refferal Commision Earned"
              icon={icon9}
              color="#dc5063"
              bgStartColor="#f19539"
              bgEndColor="#f3037e"
            ></Withdraw>
          </Col>
          <span className="spn"></span>
          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Refferals Lefel Unlocked"
              icon={icon7}
              color="#2696e5"
              bgStartColor="#79dbfb "
              bgEndColor="#2794e5"
            ></Withdraw>
          </Col>

          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Total Team Deposit Volume in 10 levels"
              icon={icon6}
              color="#2696e5"
              bgStartColor="#79dbfb "
              bgEndColor="#2794e5"
            ></Withdraw>
          </Col>
          <span className="spn"></span>
          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Your Current rank"
              icon={icon5}
              color="#dc5063"
              bgStartColor="#f19539"
              bgEndColor="#f3037e"
            ></Withdraw>
          </Col>

          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Binary Qualification"
              icon={icon3}
              color="#dc5063"
              bgStartColor="#f19539"
              bgEndColor="#f3037e"
            ></Withdraw>
          </Col>
          <span className="spn"></span>
          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Binar Commision Earned so far"
              icon={icon2}
              color="#2696e5"
              bgStartColor="#79dbfb "
              bgEndColor="#2794e5"
            ></Withdraw>
          </Col>

          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Refferals"
              icon={icon4}
              color="#2696e5"
              bgStartColor="#79dbfb "
              bgEndColor="#2794e5"
            ></Withdraw>
          </Col>
          <span className="spn"></span>
          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Total Team Members"
              icon={icon10}
              color="#dc5063"
              bgStartColor="#f19539"
              bgEndColor="#f3037e"
            ></Withdraw>
          </Col>
        </Row>
        <Row className="levels">
          <div className="level-icon">
            <img src={icon11} style={{ height: "50px" }}></img>
          </div>

          <Row className="level-box">
            <Col lg={2} xs={3} className="box">
              Level 1
            </Col>
            <Col lg={2} xs={3} className="box">
              Level 1
            </Col>
            <Col lg={2} xs={3} className="box">
              Level 1
            </Col>
            <Col lg={2} xs={3} className="box">
              Level 1
            </Col>
            <Col lg={2} xs={3} className="box">
              Level 1
            </Col>
            <Col lg={2} xs={3} className="box">
              Level 1
            </Col>
            <Col lg={2} xs={3} className="box">
              Level 1
            </Col>
            <Col lg={2} xs={3} className="box">
              Level 1
            </Col>
            <Col lg={2} xs={3} className="box">
              Level 1
            </Col>
            <Col lg={2} xs={3} className="box">
              Level 1
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}
