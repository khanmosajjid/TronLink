import React from "react";
import { useState } from "react";
import { Container, Row, Col, Label, Input, Button, Table } from "reactstrap";
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
import QRCode from "qrcode.react";

import Popup from "../../components/Popup/Popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../components/Body/Cards/Cards";

function Main(props) {
  // constructor(props) {
  //   super(props);
  //   props = {
  //     isOpen: false,
  //   };
  //   this.togglePopup = this.togglePopup.bind(this);
  // }

  // togglePopup() {
  //   this.setState({ isOpen: !props.isOpen });
  //   // alert("popup");
  //   console.log(props.isOpen);
  // }
  const [isOpen, setIsOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [tableHeading, setTableHeading] = useState("Active Deposit");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const makeDeposit = () => {
    let depositAmount = depositAmount;

    //todo 1000 krna h
    if (depositAmount < 100) {
      //Show error

      toast.error("Minimum Deposit Amount is 1000trx!");
    } else {
      makeDepositTransaction(depositAmount);
    }
  };

  const makeDepositTransaction = (amount) => {
    console.log("propos12", this.props);
    props.invest(amount);
  };

  return (
    <div className="main">
      <Row className="main__header">
        <h2>Daily Profit</h2>
        <span></span>
      </Row>
      <Row className="main__resultcard">
        <Col lg={8} xs={12}>
          <Row className="total-result1">
            <Col lg={4} className="card1">
              <QRCode value="https://trontiply.com/?ref=walletaddress" />
            </Col>
            <Col lg={8} className="card2">
              <h3>Refferral Link</h3>
              <div className="volume">
                <p
                  id="link"
                  style={{ margin: "0px", color: "white", fontWeight: "600" }}
                  onClick={() => {
                    var link = document.getElementById("link").textContent;
                    console.log("link", link);
                    toast.success(" Refferal Link copy to clipboard");
                  }}
                >
                  {props.account}
                </p>
              </div>
              <div className="volume2">
                <Button
                  className="copy-address"
                  onClick={() => {
                    var link = document.getElementById("link").textContent;
                    console.log("link", link);
                    toast.success(" Refferal Link copy to clipboard");
                  }}
                >
                  <h5>Copy</h5>
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
        <span style={{ marginLeft: "2%", marginRight: "2%" }}></span>
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
          // onChange={(t) => {
          //   setDepositAmount(t.target.value);
          // }}
          type="text"
          name="amount"
          id="amount"
          className="input-box"
          placeholder="Enter Amount"
        />
        <Button
          className="deposit__button"
          onClick={() => {
            props.invest(document.getElementById("amount").value);
          }}
        >
          Confirm Deposit
        </Button>
      </Row>
      <Row className="cards">
        <Card
          card1Name="your Daily Profit"
          card2Name="Basic Profit"
          card3Name="Personal Deposit Bonus"
          card4Name="Availble Account Balance"
          card1Data={1.2 + props.userPersonalDepositProfit + " %"}
          card2Data="1.2%"
          card3Data={props.userPersonalDepositProfit}
          card4Data={props.userDailyProfit}
        ></Card>
      </Row>
      <Row className="withdraw">
        <Button
          className="withdraw__heading"
          onClick={() => {
            props.withdraw();
          }}
        >
          <h5>Withraw Funds</h5>
        </Button>
        <Button
          className="withdraw__heading"
          onClick={() => {
            setTableHeading("Active Deposit");
            togglePopup();
          }}
        >
          <h5>View Active Investment</h5>
        </Button>
        <Button
          className="withdraw__heading"
          onClick={() => {
            setTableHeading("Expired Deposit");
            togglePopup();
          }}
        >
          <h5>View Expired Investment</h5>
        </Button>
        {isOpen && (
          <Popup
            backGround="white"
            content={
              <>
                <h1>{tableHeading}</h1>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Ammount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            }
            handleClose={togglePopup}
          />
        )}
        <span></span>
        <Col lg={6} xs={6} className="withdraw-cards">
          <Withdraw
            heading="Total Earned From Daily Profits"
            data={props.totalEarnedFromDailyProfit}
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
            data={
              2 * props.userTotalDeposits - props.totalEarnedFromDailyProfit > 0
                ? 2 * props.userTotalDeposits - props.totalEarnedFromDailyProfit
                : 0
            }
            icon={icon8}
            color="#dc5063"
            bgStartColor="#f19539"
            bgEndColor="#f3037e"
          ></Withdraw>
        </Col>

        <Col lg={6} xs={6} className="withdraw-cards">
          <Withdraw
            heading="Total Refferal Commision Earned"
            data={props.totalReferralCommissionEarned}
            icon={icon9}
            color="#dc5063"
            bgStartColor="#f19539"
            bgEndColor="#f3037e"
          ></Withdraw>
        </Col>
        <span className="spn"></span>
        <Col lg={6} xs={6} className="withdraw-cards">
          <Withdraw
            heading="Refferals Level Unlocked"
            data={props.referralLevelsUnlocked}
            icon={icon7}
            color="#2696e5"
            bgStartColor="#79dbfb "
            bgEndColor="#2794e5"
          ></Withdraw>
        </Col>

        <Col lg={6} xs={6} className="withdraw-cards">
          <Withdraw
            heading="Total Team Deposit Volume in 10 levels"
            data={props.totalTeamDepositVolume}
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
            data={props.referralLevelsUnlocked >= 7 ? "Yes" : "No"}
            icon={icon3}
            color="#dc5063"
            bgStartColor="#f19539"
            bgEndColor="#f3037e"
          ></Withdraw>
        </Col>
        <span className="spn"></span>
        <Col lg={6} xs={6} className="withdraw-cards">
          <Withdraw
            heading="Binary Commision Earned so far"
            data={props.binaryCommissionEarnedSoFar}
            icon={icon2}
            color="#2696e5"
            bgStartColor="#79dbfb "
            bgEndColor="#2794e5"
          ></Withdraw>
        </Col>

        <Col lg={6} xs={6} className="withdraw-cards">
          <Withdraw
            heading="Refferals"
            data={props.referrals}
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
            data={props.totalTeamMembers}
            icon={icon10}
            color="#dc5063"
            bgStartColor="#f19539"
            bgEndColor="#f3037e"
          ></Withdraw>
        </Col>
        <Col lg={6} xs={6} className="withdraw-cards">
          <Withdraw
            heading="Active deposit Sums"
            data={props.userTotalActiveDeposits}
            icon={icon4}
            color="#2696e5"
            bgStartColor="#79dbfb "
            bgEndColor="#2794e5"
          ></Withdraw>
        </Col>
        <span className="spn"></span>
        <Col lg={6} xs={6} className="withdraw-cards">
          <Withdraw
            heading="Number of active deposit"
            data={props.totalTeamMembers}
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
          {/* <span className="spn"></span>
          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Binary Commision Earned so far"
              data={props.binaryCommissionEarnedSoFar}
              icon={icon2}
              color="#2696e5"
              bgStartColor="#79dbfb "
              bgEndColor="#2794e5"
            ></Withdraw>
          </Col> */}
          <Col lg={2} xs={3} className="box">
            Level 1
          </Col>
          <Col lg={2} xs={3} className="box">
            Level 1
          </Col>
          {/* <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Active deposit Amount"
              data={
                props.userTotalActiveDeposits
                  ? props.userTotalActiveDeposits
                  : 0
              }
              icon={icon4}
              color="#2696e5"
              bgStartColor="#79dbfb "
              bgEndColor="#2794e5"
            ></Withdraw>
          </Col> */}
          <span className="spn"></span>
          {/* <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Number of total deposits"
              data={props.noOfTotalDeposits ? props.noOfTotalDeposits : 0}
              icon={icon10}
              color="#dc5063"
              bgStartColor="#f19539"
              bgEndColor="#f3037e"
            ></Withdraw>
          </Col> */}
        </Row>
      </Row>

      <ToastContainer />
    </div>
  );
}
export default Main;
