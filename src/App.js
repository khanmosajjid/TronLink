import "./App.css";

import Main from "./components/Main";
import Statistics from "./Statistics/Statistics";
import Utils from "./utils";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TronWeb from "tronweb";

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalUsers: null,
      activeDeposits:[],
      expiredDeposits:[],
      levelTree:[],
      tronWeb: {
        installed: false,
        loggedIn: false,
      },
      account: "0x0",
      // levels: [],
    };
    this.fetchPlatformData = this.fetchPlatformData.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getLevelWiseCount = this.getLevelWiseCount.bind(this);
    this.invest = this.invest.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.makeRoundOf = this.makeRoundOf.bind(this);
  }

  parseParams() {
    let ref
    function getUrlVars() {
      var vars = [],
        hash;
      var hashes = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    }
     ref = getUrlVars()["ref"];
    if(ref!=null){
      localStorage.setItem("ref",ref);
    }
    console.log("ref", ref);
    
  }
  
 

  makeRoundOf(num) {
    return (num / 10 ** 6).toFixed(2);
  }

  async componentDidMount() {
    await this.initTron();
    console.log("tron initiated", this.state);

    this.getUserInfo(this.state.account);
    this.fetchPlatformData();
    this.parseParams();
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

  //refferer
  async invest(entryFees) {
    this.setState({ loading: true });
    let ref=Utils.adminAddress;
    let  localStorageId=localStorage.getItem('ref');
    if(localStorageId){
           ref=localStorageId;
    }



    console.log("refADDDD",ref,localStorageId)
    Utils.contract
      .invest(ref)
      .send({
        from: window.tronWeb.defaultAddress.base58,
        callValue: entryFees * 1000000,
        shouldPollResponse: true,
      })
      .then((receipt) => {
        console.log("success");
        console.log(receipt);
      })
      .catch((err) => {
        console.log("error while investing", err);
      });
  }



  async getMyDeposits(address,maxDeposit){

    let activeDeposits =[]
    let expiredDeposits = []

    for(let i = 0;i<maxDeposit;i++){

      let deposit = await this.getMyDeposit(address,i)
      console.log("depoistPre",deposit,);
      if(deposit){
        if(deposit.isExpired){
          expiredDeposits.push(deposit)
        }else{
          activeDeposits.push(deposit)

        }
      }

     
    }


    this.setState({activeDeposits,expiredDeposits})
  }




  async getMyDeposit(add,index){

    console.log("getMyDeposit", this.state.contract)
    let deposit = await  this.state.contract.getUserDepositInfo(add,index).call();
    console.log("deposi",deposit)
    if(deposit){
      let payload = {
        id:index,
        date:deposit._start.toNumber(),
        amount:deposit._amount.toNumber()/10**6,
        withdrawn:deposit._withdrawn.toNumber()/10**6,
        isExpired:deposit._isExpired
      }
      console.log("depoist",payload)

      return payload
    }
     
  }

  async fetchPlatformData() {
    let totalUsers = (
      await this.state.contract.getTotalVolume().call()
    ).toNumber();
    console.log("users", totalUsers);
    let totalDepositAmount = (
      await this.state.contract.getTotalDepositsAmount().call()
    ).toNumber();
    totalDepositAmount = this.makeRoundOf(totalDepositAmount);
    console.log(totalDepositAmount + "it is total ammmount");
    let totalWithdrawn = (
      await this.state.contract.getTotalWithdrawn().call()
    ).toNumber();
    totalWithdrawn = this.makeRoundOf(totalWithdrawn);
    console.log(totalWithdrawn, " is total Withdrawn");
    let tradingPool = (
      await this.state.contract.getAmountInTradingPool().call()
    ).toNumber();
    tradingPool = this.makeRoundOf(tradingPool);

    let payload = {
      totalUsers: totalUsers,
      totalDepositAmount: totalDepositAmount,
      totalWithdrawn: totalWithdrawn,
      tradingPool: tradingPool,
    };
    this.setState(payload);
  }

  async getUserInfo(addr) {
    let userDailyProfit = (
      await this.state.contract.getUserDailyProfit(addr).call()
    ).toNumber();
    console.log("daily", userDailyProfit);
    let getBinaryBalanceLeftForWithdrawl = (
      await this.state.contract.getBinaryBalanceLeftForWithdrawl(addr).call()
    ).toNumber();
    getBinaryBalanceLeftForWithdrawl = this.makeRoundOf(
      getBinaryBalanceLeftForWithdrawl
    );


    userDailyProfit = userDailyProfit+getBinaryBalanceLeftForWithdrawl;
    userDailyProfit = this.makeRoundOf(userDailyProfit);


    console.log("getBinaryBalanceLeftForWithdrawl",getBinaryBalanceLeftForWithdrawl)
    
    
    
    
    
    const userPersonalDepositProfit =
      (await this.state.contract.getExtraProfit(addr).call()).toNumber() / 100;
    let totalEarnedFromDailyProfit = (
      await this.state.contract.totalEarnedFromDailyProfit(addr).call()
    ).toNumber();
    totalEarnedFromDailyProfit = this.makeRoundOf(totalEarnedFromDailyProfit);
    let totalReferralCommissionEarned = (
      await this.state.contract.getTotalReferralCommissionEarned(addr).call()
    ).toNumber();
    totalReferralCommissionEarned = this.makeRoundOf(
      totalReferralCommissionEarned
    );
    const referralLevelsUnlocked = (
      await this.state.contract.getReferralsLevelsUnlocked(addr).call()
    ).toNumber();
    let totalTeamDepositVolume = (
      await this.state.contract.getTotalTeamDepositVolume(addr).call()
    ).toNumber();
    totalTeamDepositVolume = this.makeRoundOf(totalTeamDepositVolume);
    console.log("total team deposit vol", totalTeamDepositVolume);
    let binaryCommissionEarnedSoFar = (
      await this.state.contract.getBinaryCommissionEarnedSoFar(addr).call()
    ).toNumber();
    binaryCommissionEarnedSoFar = this.makeRoundOf(binaryCommissionEarnedSoFar);
    const referrals = (
      await this.state.contract.getReferrals(addr).call()
    ).toNumber();
    const totalTeamMembers = (
      await this.state.contract.getTotalTeamMembers(addr).call()
    ).toNumber();

    let userTotalActiveDeposits = (
      await this.state.contract.getUserTotalActiveDeposits(addr).call()
    ).toNumber();
    userTotalActiveDeposits = this.makeRoundOf(userTotalActiveDeposits);
    const noOfTotalDeposits = (
      await this.state.contract.getUserTotalNumberOfDeposits(addr).call()
    ).toNumber();
    let userTotalDeposits = (
      await this.state.contract.getUserTotalDeposits(addr).call()
    ).toNumber();
    userTotalDeposits = this.makeRoundOf(userTotalDeposits);
    let payload = {
      userTotalDeposits: userTotalDeposits,
      userTotalActiveDeposits: userTotalActiveDeposits,
      noOfTotalDeposits: noOfTotalDeposits,
      userDailyProfit: userDailyProfit,
      userPersonalDepositProfit: userPersonalDepositProfit,
      totalEarnedFromDailyProfit: totalEarnedFromDailyProfit,
      totalReferralCommissionEarned: totalReferralCommissionEarned,
      referralLevelsUnlocked: referralLevelsUnlocked,
      totalTeamDepositVolume: totalTeamDepositVolume,
      binaryCommissionEarnedSoFar: binaryCommissionEarnedSoFar,
      referrals: referrals,
      totalTeamMembers: totalTeamMembers,
    };
    console.log("Payload is ", payload);
    let contractBalance = (
      await this.state.contract.getContractBalance().call()
    ).toNumber();
    contractBalance = this.makeRoundOf(contractBalance);
    console.log("contract balance", contractBalance);
    this.setState(payload);

    this.getMyDeposits(window.tronWeb.defaultAddress.base58,noOfTotalDeposits);

    let levelTree = []
    for (var i = 0; i < 10; i++) {
      let result = await this.getLevelWiseCount(this.state.account, i + 1);
      console.log(result, " level", i + 1, "-----");

      if(!result){
        result = 0
      }
      let payload = {
        levelNumber:i+1,
        members:result

      }

      levelTree.push(payload)

    }



    this.setState({levelTree})





  }

  async getLevelWiseCount(addr, level) {
    const levelWiseCount = (
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
                tradingPool={this.state.tradingPool}
              />
            </Route>

            <Route exact path="/stats">
              <Statistics
                activeDeposits={this.state.activeDeposits}
                expiredDeposits={this.state.expiredDeposits}
                levelTree={this.state.levelTree}
                userTotalDeposits={this.state.userTotalDeposits}
                invest={this.invest}
                totalEarnedFromDailyProfit={
                  this.state.totalEarnedFromDailyProfit
                }
                totalReferralCommissionEarned={
                  this.state.totalReferralCommissionEarned
                }
                referralLevelsUnlocked={this.state.referralLevelsUnlocked}
                totalTeamDepositVolume={this.state.totalTeamDepositVolume}
                binaryCommissionEarnedSoFar={
                  this.state.binaryCommissionEarnedSoFar
                }
                referrals={this.state.referrals}
                totalTeamMembers={this.state.totalTeamMembers}
                withdraw={this.withdraw}
                userDailyProfit={this.state.userDailyProfit}
                userPersonalDepositProfit={this.state.userPersonalDepositProfit}
                userTotalActiveDeposits={this.state.userTotalActiveDeposits}
                noOfTotalDeposits={this.state.noOfTotalDeposits}
                account={this.state.account}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
