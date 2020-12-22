import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home";
import Header from "./components/Header/Header";
import Payment from "./components/Payment/Payment";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main";
import LandingPage from "./LandingPage/landingPage";
import Utils from "./utils";
import { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TronWeb from "tronweb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';













const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalUsers: null,
      tronWeb: {
        installed: false,
        loggedIn: false,
      },
      account:"0x0"
      // levels: [],
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getLevelWiseCount = this.getLevelWiseCount.bind(this);
    this.invest=this.invest.bind(this);
    this.withdraw=this.withdraw.bind(this);
  }

  async componentDidMount() {
    await this.initTron();
    console.log("tron initiated", this.state);
    this.getUserInfo(this.state.account);
    for (var i = 0; i < 10; i++) {
      const result = await this.getLevelWiseCount(
        this.state.account,
        i + 1
      );
      console.log(result, " level", i + 1, "-----");
    }
    console.log(this.state);
  }

  async initTron() {
    await new Promise((resolve) => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready,
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState,
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {
          const TRONGRID_API = "https://api.trongrid.io";

          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false,
            },
          });

          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) return tries++;

        this.setState({
          tronWeb: tronWebState,
        });

        resolve();
      }, 100);
    });

    if (!this.state.tronWeb.loggedIn) {
      // Set default address (foundation address) used for contract calls
      // Directly overwrites the address object as TronLink disabled the
      // function call
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS,
      };
      window.tronWeb.on("addressChanged", () => {
        if (this.state.tronWeb.loggedIn) {
          return;
        }
        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true,
          },
        });
      });
    }
    await Utils.setTronWeb(window.tronWeb);
    if (Utils) {
      //setting account in tron web
      this.setState({ account: window.tronWeb.defaultAddress.base58 });
      this.setState({ contract: Utils.contract });
      console.log("contract", Utils.contract);
    }
    this.setState({ InitError: true });
  }

  async invest(entryFees) {
    this.setState({ loading: true });
    if(window.tronWeb){

      let refAddress= "TEaAXWNLvucDoGjKtpC1n8PspB3i4LuPyq";
      refAddress="TW2r84AGcSKEVFAgdQF4Jpmtr1TNsbuvjt"
      try{
        Utils.contract
        .invest(refAddress)
        .send({
          from: window.tronWeb.defaultAddress.base58,
          callValue: entryFees*10**6,
          shouldPollResponse: true,
        })
        .then((receipt) => {
          console.log("success");
          console.log(receipt);
        })
        .catch((err) => {
          console.log("error while investing", err);
        });
      }catch(error){
        toast.error(error.message);


        console.log("Fddddffd",error)
      }

    }

  }


  makeRoundOf(num){
    return (num/10**6).toFixed(2)
  }



  async getUserInfo(addr) {
    const totalUsers = (
      await this.state.contract.getTotalVolume().call()
    ).toNumber();
    console.log("users", totalUsers);
    let userDailyProfit = (
      await this.state.contract.getUserDailyProfit(addr).call()
    ).toNumber();


    userDailyProfit = this.makeRoundOf(userDailyProfit)
    console.log("daily", userDailyProfit);
    let userBasicProfit =(await this.state.contract
      .getBasicProfit(addr)
      .call()).toNumber();
      userBasicProfit = this.makeRoundOf(userBasicProfit)

    
    let userPersonalDepositProfit = (await this.state.contract
      .getPersonalDepositProfit(addr)
      .call()).toNumber();


      userPersonalDepositProfit = this.makeRoundOf(userPersonalDepositProfit)
    let totalEarnedFromDailyProfit = (await this.state.contract
      .totalEarnedFromDailyProfit(addr)
      .call()).toNumber();

      totalEarnedFromDailyProfit = this.makeRoundOf(totalEarnedFromDailyProfit)

    let totalReferralCommissionEarned = (await this.state.contract
      .getTotalReferralCommissionEarned(addr)
      .call()).toNumber();
      totalReferralCommissionEarned = this.makeRoundOf(totalReferralCommissionEarned)



    let referralLevelsUnlocked = (await this.state.contract
      .getReferralsLevelsUnlocked(addr)
      .call()).toNumber();

      // referralLevelsUnlocked = this.makeRoundOf(referralLevelsUnlocked)

    let totalTeamDepositVolume = (await this.state.contract
      .getTotalTeamDepositVolume(addr)
      .call()).toNumber();
      totalTeamDepositVolume = this.makeRoundOf(totalTeamDepositVolume)


    let binaryCommissionEarnedSoFar = (await this.state.contract
      .getBinaryCommissionEarnedSoFar(addr)
      .call()).toNumber();

      binaryCommissionEarnedSoFar = this.makeRoundOf(binaryCommissionEarnedSoFar)

    let referrals = (await this.state.contract.getReferrals(addr).call()).toNumber();
    let totalTeamMembers = (await this.state.contract
      .getTotalTeamMembers(addr)
      .call()).toNumber();

      // totalTeamMembers = this.makeRoundOf(totalTeamMembers)


    let totalDepositAmount = (
      await this.state.contract.getTotalDepositsAmount().call()
    ).toNumber();


    totalDepositAmount = this.makeRoundOf(totalDepositAmount)

    console.log(totalDepositAmount + "it is total ammmount");
    let totalWithdrawn = ((
      await this.state.contract.getTotalWithdrawn().call()
    ).toNumber());


    totalWithdrawn = this.makeRoundOf(totalWithdrawn)

    console.log(totalWithdrawn, " is total Withdrawn");

    let payload = {
      totalUsers: totalUsers,
      userDailyProfit: userDailyProfit,
      userBasicProfit: userBasicProfit,
      userPersonalDepositProfit: userPersonalDepositProfit,
      totalEarnedFromDailyProfit: totalEarnedFromDailyProfit,
      totalReferralCommissionEarned: totalReferralCommissionEarned,
      referralLevelsUnlocked: referralLevelsUnlocked,
      totalTeamDepositVolume: totalTeamDepositVolume,
      binaryCommissionEarnedSoFar: binaryCommissionEarnedSoFar,
      referrals: referrals,
      totalTeamMembers: totalTeamMembers,
      totalDepositAmount: totalDepositAmount,
      totalWithdrawn: totalWithdrawn,
    };
    console.log("Payload is ", payload);

    this.setState(payload);
  }

  async getLevelWiseCount(addr, level) {
    let levelWiseCount = (
      await this.state.contract.getLevelWiseCount(addr, level).call()
    ).toNumber();
    return levelWiseCount;
  }

  async withdraw() {
    Utils.contract
      .withdraw()
      .send({ from: window.tronWeb.defaultAddress.base58, callValue: 0 })
      .then((res) => {
        if (res == true) console.log("success");
      })
      .catch((err) => {
        console.log("error while withdrawing", err);
      });
  }
  render() {
    return (
      <div className="App">
        <Router>
      
      <Switch>
      <Route exact path="/">
      <Main
          totalDepositAmount={this.state.totalDepositAmount}
          totalMembers={this.state.totalUsers}
          totalWithdraw={this.state.totalWithdrawn}
          invest={this.invest}
        ></Main>
        </Route>
        
        <Route exact path="/stats">
        <LandingPage
        totalEarnedFromDailyProfit={this.state.totalEarnedFromDailyProfit}
        totalReferralCommissionEarned={this.state.totalReferralCommissionEarned}
        referralLevelsUnlocked={this.state.referralLevelsUnlocked}
        totalTeamDepositVolume={this.state.totalTeamDepositVolume}
        binaryCommissionEarnedSoFar={this.state.binaryCommissionEarnedSoFar}
        referrals={this.state.referrals}
        totalTeamMembers={this.state.totalTeamMembers}
        withdraw={this.withdraw}
        invest={this.invest}

        userDailyProfit={this.state.userDailyProfit}
        userBasicProfit={this.state.userBasicProfit}
        userPersonalDepositProfit={this.state.userPersonalDepositProfit}
        ></LandingPage>
        </Route>
       
       
          
       

      </Switch>
    
  </Router>
        
       
  <ToastContainer />

      </div>
    );
  }
}

export default App;
