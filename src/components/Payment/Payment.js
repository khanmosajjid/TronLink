import React, { Component } from "react";
import { Container, Row, Button } from "reactstrap";
import "./Payment.scss";
import Widget from "../widget/widget";
import BinaryCommission from "../widget/BinaryCommisionCalc/BinaryCommision";
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
import { Trans } from 'react-i18next';

export default class Payment extends Component {


  render() {
    return (
      <Container fluid={true} className="payment">
        <Row className="payment-header">
          <h1><Trans>Payment Plan</Trans></h1>
          <span style={{ border: "1px solid orange", width: "5%" }}></span>
          <h5><Trans>EARN 1.20% DAILY PROFIT</Trans></h5>
          <p className="personal-detail">
           <Trans>Personal Detail Bonus -For Every 100k of your own deposit you will earn 0.02% extra profit daily.Personal Detail Bonus is capped at 0.20%</Trans>
          </p>



          <p className="trading-detail">
           <span style={{
             fontWeight:"bold"
           }}><Trans>Trading Pool</Trans>- </span>
           <Trans>70 of all the deposit directly goes to our trading pool from where the magic of generating profit starts. Every week profit made is deposited back to the smart contract.</Trans>
          </p>


          

          <p className="example">
           <Trans>Example If you deposit 99k TRX you will earn 1.20% daily. If your deposit is 100k your daily profit will increase to 1.22% and it will increase 0.02% for every 100k in your deposit. Max daily profit will be 1.40%.</Trans>
          </p>
          <h3><Trans>Referral Commission</Trans></h3>
        </Row>
        <Row className="widget-row">
          <Widget
            levelName="Starter"
            icon1={level_icon_1a}
            icon2={level_icon_1b}
            levelamount="500"
            level="3"
            levelNumber={["4%", "3%", "2%"]}
            requirement="TRX Deposit (You must deposit 500 TRX in order to earn from
                    your referrals)"
            color="#0492ff"
            requirementText="Requirements-500 TRX Deposit (You must deposit 500 TRX in order to earn from your referrals)"
            bgStartColor="#92b0d6"
            bgEndColor="#0b61db"
            image={level1}
          ></Widget>
          <Widget
            icon1={level_icon_4a}
            icon2={level_icon_4b}
            levelName="Bronze"
            level="4"
            requirementText="Requirements- 100k TRX Total Team Deposit Volume"
            levelNumber={["4%", "3%", "2%", "1%"]}
            levelamount="100k"
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
            requirementText="Requirements- 1 Million TRX Total Team Deposit Volume"
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
            requirementText="Requirements- 5 Million TRX Total Team Deposit Volume"
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
            binaryCommission="Binary Commission- "
            binaryCommissionIcon={level_icon_1b}
            binaryCommissionPerc=" 0.20% "
            requirementText="Requirements- 10 Million TRX Total Team Deposit Volume"

            binaryCommissionInfo="of your Team Deposit Volume Every Week"
            level="7"
            levelNumber={["4%", "3%", "2%", "1%", "1%", "1%","0.5%"]}
            levelamount=" 10 Million "
            levelName="Titanium"
            binaryCommissionText="Binary Commission- 0.20% of your Team Deposit Volume Every Week"
            color="#0492ff"
            bgStartColor="#92b0d6"
            bgEndColor="#0b61db"
            image={level5}
          ></Widget>
          {/* <Widget
            requirementText="Requirements- 50 Million TRX Total Team Deposit Volume"

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
            binaryCommission="Binary Commission- "
            binaryCommissionIcon={level_icon_4b}
            binaryCommissionPerc=" 0.40% "
            binaryCommissionInfo="of your Team Deposit Volume every Week"
          ></Widget>
          */}
          <Widget
            icon1={level_icon_2a}
            icon2={level_icon_2b}
            level="8"
            requirementText="Requirements- 50 Million TRX Total Team Deposit Volume"
            binaryCommissionText="Binary Commission- 0.40% of your Team Deposit Volume Every Week"
            levelNumber={["4%", "3%", "2%", "1%", "1%", "1%","0.5%","0.5%"]}
            levelamount=" 50 Million "
            levelName="Gold"
            requirement="TRX Total Team Deposit Volume "
            color="#ff9600"
            bgStartColor="#dc7107"
            bgEndColor="#f39d03"
            image={level7}
            binaryCommission="Binary Commission- "
            binaryCommissionIcon={level_icon_2b}
            binaryCommissionPerc=" 0.60% "
            binaryCommissionInfo="of your Team Deposit Volume Every Week"
          ></Widget>

          <Widget
            icon1={level_icon_3a}
            icon2={level_icon_3b}
            level="9"
            requirementText="Requirements- 100 Million TRX Total Team Deposit Volume"
            binaryCommissionText="Binary Commission- 0.60% of your Team Deposit Volume Every Week"
            levelNumber={["4%", "3%", "2%", "1%", "1%", "1%","0.5%","0.5%","0.5%"]}
            levelamount=" 100 Million "
            levelName="Diamond"
            requirement="TRX Total Team Deposit Volume "
            color="#51ce91"
            bgStartColor="#a9dc07"
            bgEndColor="#a3e09b "
            image={level8}
            binaryCommission="Binary Commission- "
            binaryCommissionIcon={level_icon_3b}
            binaryCommissionPerc=" 0.80% "
            binaryCommissionInfo="of your Team Deposit Volume Every Week"
          ></Widget>

          <Widget
            icon1={level_icon_4a}
            icon2={level_icon_4b}
            level="10"
            requirementText="Requirements- 500 Million TRX Total Team Deposit Volume"
            binaryCommissionText="Binary Commission- 1% of your Team Deposit Volume Every Week"
            levelNumber={["4%", "3%", "2%", "1%", "1%", "1%","0.5%","0.5%","0.5%","0.5%"]}
            levelamount=" 500 Million "
            levelName="Super Gold"
            requirement="TRX Total Team Deposit Volume "
            color="#ff3c5e"
            bgStartColor="#f19539"
            bgEndColor="#f3037e"
            image={level9}
            binaryCommission="Binary Commission- "
            binaryCommissionIcon={level_icon_4b}
            binaryCommissionPerc="1% "
            binaryCommissionInfo="of your Team Deposit Volume Every Week"
          ></Widget>

          <BinaryCommission></BinaryCommission>
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
  <Trans>
              Participate now
              </Trans>            </Button>
          </Row>
        </Row>
      </Container>
    );
  }
}
