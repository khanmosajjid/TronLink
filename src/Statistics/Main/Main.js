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
import volumebg from "../../assets/volume_bg.png";
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
                <p style={{ margin: "0px", color: "white", fontWeight: "600" }}>
                  746392989
                </p>
              </div>
              <div className="volume">
                <p style={{ margin: "0px", color: "white" }}>
                  Total Transaction
                </p>
                <p style={{ margin: "0px", color: "white", fontWeight: "600" }}>
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
                <p style={{ margin: "0px", color: "white", fontWeight: "600" }}>
                  746392989
                </p>
              </div>
              <div className="volume">
                <p style={{ margin: "0px", color: "white" }}>
                  Total Transaction
                </p>
                <p style={{ margin: "0px", color: "white", fontWeight: "600" }}>
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
          onChange={(t) => {
            setDepositAmount(t.target.value);
          }}
          type="text"
          name="amount"
          className="input-box"
          placeholder="Enter Amount"
        />
        <Button
          className="deposit__button"
          onClick={() => {
            makeDeposit();
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
          card4Data="0"
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
        <Button className="withdraw__heading">
          <h5>View Active Investment</h5>
        </Button>
        <Button className="withdraw__heading" onClick={togglePopup}>
          <h5>View Expired Investment</h5>
        </Button>
        {isOpen && (
          <Popup
            backGround="white"
            content={
              <>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
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
            data="200%"
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
            heading="Binar Commision Earned so far"
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
          <Col lg={2} xs={3} className="box">
            Level 1
          </Col>
          <Col lg={2} xs={3} className="box">
            Level 1
          </Col>
          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Active deposit Amount"
              data={props.userTotalActiveDeposits?props.userTotalActiveDeposits:0}
              icon={icon4}
              color="#2696e5"
              bgStartColor="#79dbfb "
              bgEndColor="#2794e5"
            ></Withdraw>
          </Col>
          <span className="spn"></span>
          <Col lg={6} xs={6} className="withdraw-cards">
            <Withdraw
              heading="Number of total deposits"
              data={props.noOfTotalDeposits?props.noOfTotalDeposits:0}
              icon={icon10}
              color="#dc5063"
              bgStartColor="#f19539"
              bgEndColor="#f3037e"
            ></Withdraw>
          </Col>
        </Row>
      </Row>

      <ToastContainer />
    </div>
  );
}
export default Main;
