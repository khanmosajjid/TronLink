import React from "react";
import { useState, useEffect, useRef } from "react";
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
import reff_icon from "../../assets/reff-icon.png";
// import money_transfer from "../../assets/money-transfer.png";
import money_transfer from "../../assets/network.png";
import { Trans } from 'react-i18next';
import utils from "../../utils"
import Popup from "../../components/Popup/Popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../components/Body/Cards/Cards";
import moment from "moment";
import reff_bg from "../../assets/reff-bg.png";

const levelColors = [
  "#0492ff",
  "#ff3956",
  "#ff9600",
  "#51ce91",
  "#0492ff",
  "#ff3c5e",
  "#ff9600",
  "#51ce91",
  "#ff3c5e",
];
function Main(props) {
  const [activeDeposits, setActiveDeposits] = useState([]);

  const [expiredDeposits, setExpiredDeposits] = useState([]);
  const [tableData, setTableData] = useState(false);
  const [walletAddress, setWalletAddress] = useState(false);
  const [userPersonalDepositProfit,setUserPersonalDepositProfit] = useState(0)
  const getReadableTime = (time) => {
    return moment(time * 1000).format("DD/MMM/YYYY");
  };

  useEffect(() => {
    setActiveDeposits(props.activeDeposits);
  }, [props.activeDeposits]);

  useEffect(() => {
    setLevelTree(props.levelTree);
  }, [props.levelTree]);

  useEffect(() => {
    if(props.account != "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"){
      setWalletAddress(props.account);
      setRefLink(getMyRefLink(props.account));
    }
  
    console.log("pros.accout", props.account);
  }, [props.account]);

  useEffect(() => {
    setExpiredDeposits(props.expiredDeposits);
  }, [props.expiredDeposits]);
  const [levelTree, setLevelTree] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [tableHeading, setTableHeading] = useState("Active Deposit");
  const [isActiveDepositTableActive, setActiveDepositTableActive] = useState(
    false
  );
  const [copySuccess, setCopySuccess] = useState("");
  const [refLink, setRefLink] = useState();
  const [tableStartColor, setTableStartColor] = useState("");
  const [tableEndColor, setTableEndColor] = useState("");
  const [tableHeaderStartColor, setTableHeaderStartColor] = useState("");
  const [tableHeaderEndColor, setTableHeaderEndColor] = useState("");
  const textAreaRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const renderLevelTree = () => {
    let tree = [];

    for (let level of levelTree) {
      tree.push(
        // <Col lg={2} xs={3} className="box">
        //   Level {level.levelNumber} | Members {level.members}
        // </Col>

        <Col lg={3} style={{ marginBottom: "2%", fontWeight: "600" }}>
          <p>
            Level {level.levelNumber} =
            <span
              style={{
                color: levelColors[level.levelNumber - 1],
                fontWeight: "600",
              }}
            >
              {" "}
              Members {level.members}
            </span>
          </p>
        </Col>
      );
      // console.log("level");
    }
    // console.log("hello");
    return tree;
  };

  const getLevelRank = () => {
    let number = props.referralLevelsUnlocked;
    //TODO 1
    if (number <= 3) {
      return "Starter";
    } else if (number <= 4) {
      return "Bronze";
    } else if (number <= 5) {
      return "Platinum";
    } else if (number <= 6) {
      return "Premium";
    } else if (number <= 7) {
      return "Titanium";
    } else if (number <= 8) {
      return "Gold";
    } else if (number <= 9) {
      return "Diamond";
    } else if (number <= 10) {
      return "Super Gold";
    }
  };
  function copyToClipboard(e) {
    var textField = document.createElement("textarea");
    textField.innerText = refLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    setCopySuccess("Copied!");
    toast.success("Referral Link Copied");
  }

  const renderDepositTableItem = () => {
    let items = [];

    let data = [];

    if (isActiveDepositTableActive) {
      data = [...activeDeposits];
    } else {
      data = [...expiredDeposits];
    }

    for (let item of data) {
      items.push(
        <tr>
          <td style={{color:"#000"}}>{getReadableTime(item.date)}</td>
          <td style={{color:"#000"}}>{item.amount}</td>

          <td style={{color:"#000"}}>{item.withdrawn}</td>
        </tr>
      );
    }

    if (items.length == 0) {
      // setTableData(true)
      console.log(tableData);
      return <h3>No data</h3>;
    } else {
      return items;
    }
  };

  const getMyRefLink = (addr) => {
    return "https://trontiply.com/?ref=" + addr;
  };

  const getIfHideTable = () => {
    if (isActiveDepositTableActive) {
      if (activeDeposits.length == 0) {
        return true;
      }
    } else {
      if (expiredDeposits.length == 0) {
        return true;
      }
    }
  };
  const makeDeposit = () => {
    // let depositAmount = depositAmount;

    //todo 1000 krna h
    if (depositAmount < 500) {
      //Show error

      toast.error("Minimum Deposit Amount is 500trx!");
    } else {
      makeDepositTransaction(depositAmount);
    }
  };

  const makeDepositTransaction = (amount) => {
    console.log("propos12", amount);
    props.invest(amount);
  };




useEffect(()=>{
  console.log("userPersonalDepositProfit1",props.userPersonalDepositProfit)

  setUserPersonalDepositProfit(props.userPersonalDepositProfit)
},[props.userPersonalDepositProfit])

  return (
    <div className="main">
      <Row className="main__resultcard">

        <Row className="total-result1">


          
          <Col lg={2} sm={2} md={2} className="card1">
            {refLink ? <QRCode value={refLink} /> : null}
          </Col>
          <Col lg={10}  sm={10}  md={10}className="card2">
            <Row className="ref-main">
              <Col lg={2} xs={4} >
               <div className="refferal-logo">
               <img  
                  src={reff_icon}
                  style={{
                    height: "55px",
                    width: "55px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                  }}
                ></img>
               </div>
              </Col>

              <Col lg={10} className="input-col">
                {/* <img src={reff_bg}></img> */}
                <Label for="amount"></Label>
                <Row>
                  <Col lg={12} style={{ display: "flex" }}>
                    <Input
                      onChange={(t) => {
                        // setDepositAmount(t.target.value);
                      }}
                      type="text"
                      name="amount"
                      id="amount"
                      value={refLink}
                      className="ref-input"
                      placeholder="Enter Amount"
                    />
                    <Button className="ref-copy" onClick={copyToClipboard}>
                      <h5><Trans>Copy</Trans></h5>
                    </Button>
                  </Col>
                </Row>

                {/* <h3>Refferral Link</h3>
                <div className="volume"> */}
                {/* <textarea
                  id="link"
                  style={{ margin: "0px", color: "white", fontWeight: "600",width:"100%" }}
                  ref={textAreaRef}
                  onClick={copyToClipboard}
                  value={refLink}
                > */}

                {/* <h4
                    onClick={() => {
                      copyToClipboard();
                    }}
                    id="link"
                  >
                    {refLink}
                  </h4> */}

                {/* </textarea> */}
                {/* </div> */}
                {/* <div className="volume2">
                 
                </div> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
     
      <Row className="main__deposit">
        <div className="deposit-icon">
          <img src={deposit}></img>
        </div>

        <h6><Trans>Make A Deposit</Trans></h6>
        <Label for="amount"></Label>
        <Input
          onChange={(t) => {
            setDepositAmount(t.target.value);
          }}
          type="text"
          name="amount"
          id="amount"
          value={depositAmount}
          className="input-box"
          placeholder="Enter Amount"
        />
        <Button
          className="deposit__button"
          onClick={() => {
            // props.invest(document.getElementById("amount").value);
            makeDeposit();
          }}
        >
          <Trans>Confirm Deposit</Trans>
        </Button>
      </Row>
     
     


      
     
     
     
     
      <Row className="cards">

  
        
     <Card
          card1Name="Your Daily Profit"
          card2Name="Basic Profit"
          card3Name="Personal Deposit Bonus"
          card4Name="Available Account Balance"
          card1Data={
            isNaN(userPersonalDepositProfit)?"1.2%":
            1.2 +userPersonalDepositProfit
             +
            " %"
          }
          card2Data="1.20%"
          card3Data={userPersonalDepositProfit}
          card4Data={props.userDailyProfit?props.userDailyProfit:"-"}
        ></Card>
     
     
      </Row>
      <Row className="withdraw">
        <Row className="withdraw-bttn">
        <Button
          className="withdraw__heading"
          onClick={() => {
            props.withdraw();
          }}
        >
          <h5><Trans>Withdraw Funds</Trans></h5>
        </Button>
        <Button
          className="withdraw__heading"
          onClick={() => {
            setTableHeading("Active Deposits");
            togglePopup();
            setActiveDepositTableActive(true);
            setTableStartColor("#f19539");
            setTableEndColor("#f3037e");
            setTableHeaderStartColor("#79dbfb")
            setTableHeaderEndColor("#2794e5")
          }}
        >
          <h5><Trans>View Active Deposits</Trans></h5>
        </Button>
        <Button
          className="withdraw__heading"
          onClick={() => {
            setTableHeading("Expired Deposits");
            setActiveDepositTableActive(false);
            togglePopup();
            setTableStartColor("#79dbfb");
            setTableEndColor("#2794e5");
            setTableHeaderStartColor("#f19539")
            setTableHeaderEndColor("#f3037e")
          }}
        >
          <h5><Trans>View Expired Deposits</Trans></h5>
        </Button>



        <Button
          className="withdraw__heading_dark"
          onClick={() => {
            var win = window.open("https://tronscan.org/#/contract/"+utils.contractAddress, '_blank');
          win.focus();  
          }}
        >
          <h5><Trans>Check our Smart Contract</Trans></h5>
        </Button>
        </Row>
        
        {isOpen && (
          <Popup
            backGround="white"
            content={
              <>
                <span className="close-icon" onClick={togglePopup}>
                  x
                </span>
                <h1
                  style={{
                    background:
                      "linear-gradient(262deg,"+
                      tableStartColor +
                      " 8%,"+
                      tableEndColor +
                      " 98%)"
                  }}
                  className="table-header"
                >
                  {tableHeading}
                </h1>
                <Table hover responsive bordered striped>
                  <thead style={{
                    background:
                      "linear-gradient(262deg,"+
                      tableHeaderStartColor +
                      " 8%,"+
                      tableHeaderEndColor +
                      " 98%)"
                  }} className="table-header-data">
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Withdrawal</th>
                    </tr>
                  </thead>
                  <tbody>{renderDepositTableItem()}</tbody>
                </Table>
                <Row style={{ width: "100%" }} className="table-popup">
                  <Col lg={12} className="table-btn">
                    <Button
                      className="withdraw__heading"
                      onClick={() => {
                        togglePopup();
                      }}
                    >
                      <h5>Close</h5>
                    </Button>
                  </Col>
                </Row>
              </>
            }
          />
        )}

        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#f19539 -1px 1px 10px 1px" }}
        >
          <Withdraw
            heading={<Trans>Active Deposits Sums</Trans>}
            data={props.userTotalActiveDeposits}
            icon={icon8}
            color="#dc5063"
            bgStartColor="#f19539"
            bgEndColor="#f3037e"
          ></Withdraw>
        </Col>
        <span className="spn"></span>
        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#79dafa -1px 1px 10px 1px" }}
        >
          <Withdraw
            heading="Number of Total Deposits"
            data={props.noOfTotalDeposits}
            icon={icon1}
            color="#2696e5"
            bgStartColor="#79dbfb "
            bgEndColor="#2794e5"
          ></Withdraw>
        </Col>

        <span></span>
        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#79dafa -1px 1px 10px 1px" }}
        >
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
        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#f19539 -1px 1px 10px 1px" }}
        >
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

        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#f19539 -1px 1px 10px 1px" }}
        >
          <Withdraw
            heading="Total Refferal Commission Earned"
            data={props.totalReferralCommissionEarned}
            icon={icon9}
            color="#dc5063"
            bgStartColor="#f19539"
            bgEndColor="#f3037e"
          ></Withdraw>
        </Col>
        <span className="spn"></span>
        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#79dafa -1px 1px 10px 1px" }}
        >
          <Withdraw
            heading="Refferals Level Unlocked"
            data={props.referralLevelsUnlocked}
            icon={icon7}
            color="#2696e5"
            bgStartColor="#79dbfb "
            bgEndColor="#2794e5"
          ></Withdraw>
        </Col>

        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#79dafa -1px 1px 10px 1px" }}
        >
          <Withdraw
            heading="Total Team Deposits Volume in 10 levels"
            data={props.totalTeamDepositVolume}
            icon={icon6}
            color="#2696e5"
            bgStartColor="#79dbfb "
            bgEndColor="#2794e5"
          ></Withdraw>
        </Col>
        <span className="spn"></span>
        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#f19539 -1px 1px 10px 1px" }}
        >
          <Withdraw
            heading="Your Current Rank"
            icon={icon5}
            data={getLevelRank()}
            color="#dc5063"
            bgStartColor="#f19539"
            bgEndColor="#f3037e"
          ></Withdraw>
        </Col>

        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#f19539 -1px 1px 10px 1px" }}
        >
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
        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#79dafa -1px 1px 10px 1px" }}
        >
          <Withdraw
            heading="Binary Commission Earned so far"
            data={props.binaryCommissionEarnedSoFar}
            icon={icon2}
            color="#2696e5"
            bgStartColor="#79dbfb "
            bgEndColor="#2794e5"
          ></Withdraw>
        </Col>

        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#79dafa -1px 1px 10px 1px" }}
        >
          <Withdraw
            heading="Direct Refferals"
            data={props.referrals}
            icon={icon4}
            color="#2696e5"
            bgStartColor="#79dbfb "
            bgEndColor="#2794e5"
          ></Withdraw>
        </Col>
        <span className="spn"></span>
        <Col
          lg={6}
          xs={6}
          className="withdraw-cards"
          style={{ boxShadow: "#f19539 -1px 1px 10px 1px" }}
        >
          <Withdraw
            heading="Total Team Members"
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

        <Row className="widget-level-box">
          {renderLevelTree()}

          {/* <Col lg={2} xs={3} className="box">
            Level 1
          </Col>
          
          <Col lg={2} xs={3} className="box">
            Level 2
          </Col>
          <Col lg={2} xs={3} className="box">
            Level 3
          </Col>
          <Col lg={2} xs={3} className="box">
            Level 4
          </Col>
          <Col lg={2} xs={3} className="box">
            Level 5
          </Col>

          <Col lg={2} xs={3} className="box">
            Level 6
          </Col>
          <Col lg={2} xs={3} className="box">
            Level 7
          </Col>
          <Col lg={2} xs={3} className="box">
            Level 8
          </Col>
          <Col lg={2} xs={3} className="box">
            Level 9
          </Col>
          <Col lg={2} xs={3} className="box">
            Level 10
          </Col> */}
        </Row>
      </Row>

      <ToastContainer />
    </div>
  );
}
export default Main;
