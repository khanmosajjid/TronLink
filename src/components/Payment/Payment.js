import React, { Component } from "react";
import { Container, Row, Button } from "reactstrap";
import "./Payment.scss";
import Widget from "../widget/widget";
import BinaryCommision from "../widget/BinaryCommisionCalc/BinaryCommision";
import level1 from "../../assets/level1.png";
import level2 from "../../assets/level2.png";
import level3 from "../../assets/level3.png";
import level4 from "../../assets/level4.png";
import level5 from "../../assets/level5.png";
import level6 from "../../assets/level6.png";
import level7 from "../../assets/level7.png";
import level8 from "../../assets/level8.png";
import level9 from "../../assets/level9.png";
import level_icon_1a from "../../assets/level_icon_1a.png";
import level_icon_1b from "../../assets/level_icon_1b.png";
import level_icon_2a from "../../assets/level_icon_2a.png";
import level_icon_2b from "../../assets/level_icon_2b.png";
import level_icon_3a from "../../assets/level_icon_3a.png";
import level_icon_3b from "../../assets/level_icon_3b.png";
import level_icon_4a from "../../assets/level_icon_4a.png";
import level_icon_4b from "../../assets/level_icon_4b.png";

export default class Payment extends Component {
  render() {
    return (
      <Container fluid={true} className="payment">
        <Row className="payment-header">
          <h1>Payment Plan</h1>
          <span style={{ border: "1px solid orange", width: "5%" }}></span>
          <h5>EARN 1.20% DAILY PROFIT EVERDAY</h5>
          <p className="personal-detail">
            <span>Personal Detail Bonus :</span>
            For Every 100k of your own deposit you will earn 0.02% extra profit
            daily.Personal Detail Bonus is capped at 0.20%
          </p>
          <p className="example">
            <span>Example :</span>
            If you deposit 99k TRX you will earn 1.20% daily. If your deposit is
            100k your daily profit will increse to 1.22% and it will increase
            0.02% for every 100k in your deposit. Max daily profit will be 1.40%.
          </p>
          <h3>Referral Commision</h3>
        </Row>
        <Row className="widget-row">
          <Widget
            levelName="Starter"
            icon1={level_icon_1a}
            icon2={level_icon_1b}
            levelamount="100"
            level="3"
            levelNumber={["4%", "3%", "2%"]}
            requirement=" TRX Deposit (You must deposit 100 TRX in order to earn from
                    your referrals)"
            color="#0492ff"
            bgStartColor="#92b0d6"
            bgEndColor="#0b61db"
            image={level1}
          ></Widget>
          <Widget
            icon1={level_icon_4a}
            icon2={level_icon_4b}
            levelName="Bronze"
            level="4"
            levelNumber={["4%", "3%", "2%", "1%"]}
            levelamount=" 100k "
            requirement="TRX Total Team Deposit Volume"
            color="#ff3c5e"
            bgStartColor="#f19539"
            bgEndColor="#f3037e"
            image={level2}
          ></Widget>
          <Widget
            icon1={level_icon_2a}
            icon2={level_icon_2b}
            level="5"
            levelNumber={["4%", "3%", "2%", "1%", "1%"]}
            levelamount=" 1 Million "
            levelName="Platinum"
            requirement="TRX Total Team Deposit Volume "
            color="#ff9600"
            bgStartColor="#dc7107"
            bgEndColor="#f39d03"
            image={level3}
          ></Widget>

          <Widget
            icon1={level_icon_3a}
            icon2={level_icon_3b}
            level="6"
            levelNumber={["4%", "3%", "2%", "1%", "1%", "1%"]}
            levelamount=" 5 Million "
            levelName="Premium"
            requirement="TRX Total Team Deposit Volume "
            color="#51ce91"
            bgStartColor="#a9dc07"
            bgEndColor="#a3e09b "
            image={level4}
          ></Widget>
          <Widget
            icon1={level_icon_1a}
            icon2={level_icon_1b}
            requirement="TRX Total Team Deposit Volume "
            binaryCommision="Binary Commision: "
            binaryCommisionIcon={level_icon_1b}
            binaryCommisionPerc=" 0.20% "
            binaryCommisionInfo="of your Team Deposit Volume Every Week"
            level="7"
            levelNumber={["4%", "3%", "2%", "1%", "1%", "1%","0.5%"]}
            levelamount=" 10 Million "
            levelName="Titanium"
            color="#0492ff"
            bgStartColor="#92b0d6"
            bgEndColor="#0b61db"
            image={level5}
          ></Widget>
          <Widget
            icon1={level_icon_4a}
            icon2={level_icon_4b}
            requirement="TRX Total Team Deposit Volume "
            level="8"
            levelNumber={["4%", "3%", "2%", "1%", "1%", "1%","0.5%","0.5%"]}
            levelamount=" 50 Million "
            levelName="Silver"
            color="#ff3c5e"
            bgStartColor="#f19539"
            bgEndColor="#f3037e"
            image={level6}
            binaryCommision="Binary Commision: "
            binaryCommisionIcon={level_icon_4b}
            binaryCommisionPerc=" 0.40% "
            binaryCommisionInfo="of your Team Deposit Volume every Week"
          ></Widget>
          <Widget
            icon1={level_icon_2a}
            icon2={level_icon_2b}
            level="8"
            levelNumber={["4%", "3%", "2%", "1%", "1%", "1%","0.5%","0.5%"]}
            levelamount=" 50 Million "
            levelName="Gold"
            requirement="TRX Total Team Deposit Volume "
            color="#ff9600"
            bgStartColor="#dc7107"
            bgEndColor="#f39d03"
            image={level7}
            binaryCommision="Binary Commision: "
            binaryCommisionIcon={level_icon_2b}
            binaryCommisionPerc=" 0.60% "
            binaryCommisionInfo="of your Team Deposit Volume Every Week"
          ></Widget>

          <Widget
            icon1={level_icon_3a}
            icon2={level_icon_3b}
            level="9"
            levelNumber={["4%", "3%", "2%", "1%", "1%", "1%","0.5%","0.5%","0.5%"]}
            levelamount=" 100 Million "
            levelName="Diamond"
            requirement="TRX Total Team Deposit Volume "
            color="#51ce91"
            bgStartColor="#a9dc07"
            bgEndColor="#a3e09b "
            image={level8}
            binaryCommision="Binary Commision: "
            binaryCommisionIcon={level_icon_3b}
            binaryCommisionPerc=" 0.80% "
            binaryCommisionInfo="of your Team Deposit Volume Every Week"
          ></Widget>

          <Widget
            icon1={level_icon_4a}
            icon2={level_icon_4b}
            level="10"
            levelNumber={["4%", "3%", "2%", "1%", "1%", "1%","0.5%","0.5%","0.5%"]}
            levelamount=" 50 Million "
            levelName="Super Gold"
            requirement="TRX Total Team Deposit Volume "
            color="#ff3c5e"
            bgStartColor="#f19539"
            bgEndColor="#f3037e"
            image={level9}
            binaryCommision="Binary Commision: "
            binaryCommisionIcon={level_icon_4b}
            binaryCommisionPerc="1% "
            binaryCommisionInfo="of your Team Deposit Volume Every Week"
          ></Widget>

          <BinaryCommision></BinaryCommision>
          <Row className="payment-button">
            <Button
              onClick={() => {
                // var refferal = document.getElementById("refferal").value;
                // this.props.invest(refferal, 1000000000);
                // togglePopup();
                window.location.href = "/stats";
              }}
              className="widget__button"
            >
              Participate now
            </Button>
          </Row>
        </Row>
      </Container>
    );
  }
}
