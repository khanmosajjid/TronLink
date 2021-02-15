import "./App.css";

import Main from "./components/Main";
import Statistics from "./Statistics/Statistics";
import WeeklyReport from "./WeeklyReport/WeeklyReport"
import Utils from "./utils";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './i18n';

import TronWeb from "tronweb"


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalUsers: 0,
      activeDeposits:[],
      expiredDeposits:[],
      levelTree:[],
      tronWeb: {
        installed: false,
        loggedIn: false,
      },
      account: "",
      // levels: [],
    };
    this.fetchPlatformData = this.fetchPlatformData.bind(this);
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

    this.startDataWatchman()
  


   
    
  }


  startDataWatchman(){
    let interval = setInterval(()=>{
        if(this.state.account && this.state.contract){
          this.refreshUserData(this.state.account)
        }
    },1000)
  }

  async initTron() {
    await new Promise((resolve) => {

      console.log("ffffffinitTron",)
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

      const timer = setInterval(async() => {
        if (tries >= 10) {
          const TRONGRID_API = "https://api.trongrid.io";

          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );


          window.tronWeb.setAddress('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');


          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false,
            },
          });

          await Utils.setTronWeb(window.tronWeb);
          this.setState({ 
            tronWeb:window.tronWeb,
            contract: Utils.contract });
            // this.setState({
            //   tronWeb: tronWebState,
            // });
    
          
            // this.getUserInfo(window.tronWeb.defaultAddress.base58);
            this.fetchPlatformData();
            // this.parseParams();
    
    
            // this.refreshUserData("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t")

          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) return tries++;


        

        resolve();
      }, 100);
    });



    
    await new Promise(resolve => {
      const tronLoader = setInterval( async () => {
        if (window.tronWeb && window.tronWeb.ready) {
          await Utils.setTronWeb(window.tronWeb);
          this.setState({ account: window.tronWeb.defaultAddress.base58,
            contract: Utils.contract });
          clearInterval(tronLoader)

          // this.getUserInfo(window.tronWeb.defaultAddress.base58);
          // this.fetchPlatformData();
          // this.parseParams();


          this.refreshUserData(window.tronWeb.defaultAddress.base58)
          console.log("window.tronWeb.defaultAddress.base58 ,",window.tronWeb.defaultAddress.base58 )
          resolve()
        }
      }, 500)
    });


   

   

  }


  async refreshUserData(walletAdd){


    console.log("refreshUseerDa",walletAdd)
    if(walletAdd){
      this.getUserInfo(walletAdd);

    }
    this.fetchPlatformData();
    this.parseParams();
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
        feeLimit: 100000000,
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

    console.log("getMyDeposit", Utils.contract)
    let deposit = await  Utils.contract.getUserDepositInfo(add,index).call();
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
      await Utils.contract.getTotalVolume().call()
    ).toNumber();


    console.log("users123", totalUsers);
    let totalDepositAmount = (
      await Utils.contract.getTotalDepositsAmount().call()
    ).toNumber();
    totalDepositAmount = this.makeRoundOf(totalDepositAmount);
    console.log(totalDepositAmount + "it is total ammmount");
    let totalWithdrawn = (
      await Utils.contract.getTotalWithdrawn().call()
    ).toNumber();
    totalWithdrawn = this.makeRoundOf(totalWithdrawn);
    console.log(totalWithdrawn, " is total Withdrawn");
    let tradingPool = (
      await Utils.contract.getAmountInTradingPool().call()
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

    console.log("fdfdd",addr)
    let userDailyProfit =  await Utils.contract.getUserDailyProfit(addr).call();
    if(userDailyProfit){
      userDailyProfit = userDailyProfit.toNumber()
    }else{
      userDailyProfit = 0
    }
    console.log("daily", userDailyProfit);
    let getBinaryBalanceLeftForWithdrawl = (
      await Utils.contract.getBinaryBalanceLeftForWithdrawl(addr).call()
    ).toNumber();


    // getBinaryBalanceLeftForWithdrawl = this.makeRoundOf(
    //   getBinaryBalanceLeftForWithdrawl
    // );


    userDailyProfit = this.makeRoundOf(userDailyProfit+getBinaryBalanceLeftForWithdrawl);


    console.log("getBinaryBalanceLeftForWithdrawl",getBinaryBalanceLeftForWithdrawl)
    
    
    
    
    
    const userPersonalDepositProfit =
      (await Utils.contract.getExtraProfit(addr).call()).toNumber() / 100;


      console.log("userPersonalDepositProfit",userPersonalDepositProfit)

    let totalEarnedFromDailyProfit = (
      await Utils.contract.totalEarnedFromDailyProfit(addr).call()
    ).toNumber();

    console.log("totalEarnedFromDailyProfit")

    totalEarnedFromDailyProfit = this.makeRoundOf(totalEarnedFromDailyProfit);
    let totalReferralCommissionEarned = (
      await Utils.contract.getTotalReferralCommissionEarned(addr).call()
    ).toNumber();

    console.log("totalReferralCommissionEarned")

    totalReferralCommissionEarned = this.makeRoundOf(
      totalReferralCommissionEarned
    );
    const referralLevelsUnlocked = (
      await Utils.contract.getReferralsLevelsUnlocked(addr).call()
    ).toNumber();


    console.log("referralLevelsUnlocked")

    let totalTeamDepositVolume = (
      await Utils.contract.getTotalTeamDepositVolume(addr).call()
    ).toNumber();

    console.log("totalTeamDepositVolume")

    totalTeamDepositVolume = this.makeRoundOf(totalTeamDepositVolume);
    console.log("total team deposit vol", totalTeamDepositVolume);
    let binaryCommissionEarnedSoFar = (
      await Utils.contract.getBinaryCommissionEarnedSoFar(addr).call()
    ).toNumber();

    console.log("binaryCommissionEarnedSoFar", );

    binaryCommissionEarnedSoFar = this.makeRoundOf(binaryCommissionEarnedSoFar);
    const referrals = (
      await Utils.contract.getReferrals(addr).call()
    ).toNumber();


    console.log("binaryCommissionEarnedSoFar", );

    const totalTeamMembers = (
      await Utils.contract.getTotalTeamMembers(addr).call()
    ).toNumber();


    console.log("totalTeamMembers", );

    let userTotalActiveDeposits = (
      await Utils.contract.getUserTotalActiveDeposits(addr).call()
    ).toNumber();

    console.log("userTotalActiveDeposits", );

    userTotalActiveDeposits = this.makeRoundOf(userTotalActiveDeposits);
    const noOfTotalDeposits = (
      await Utils.contract.getUserTotalNumberOfDeposits(addr).call()
    ).toNumber();


    console.log("userTotalActiveDeposits", );

    let userTotalDeposits = (
      await Utils.contract.getUserTotalDeposits(addr).call()
    ).toNumber();

    console.log("userTotalDeposits", );

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



    this.setState({userTotalDeposits: userTotalDeposits,
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
      totalTeamMembers: totalTeamMembers,})
    let contractBalance = (
      await Utils.contract.getContractBalance().call()
    ).toNumber();
    contractBalance = this.makeRoundOf(contractBalance);
    console.log("contract balance", contractBalance);

    this.getMyDeposits(addr,noOfTotalDeposits);
     
    let levelTree = []
    for (var i = 0; i < 10; i++) {
      let result = await this.getLevelWiseCount(addr, i + 1);
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



    this.setState({levelTree});





  }

  async getLevelWiseCount(addr, level) {
    const levelWiseCount = (
      await Utils.contract.getLevelWiseCount(addr, level).call()
    ).toNumber();
    return levelWiseCount;
  }

  async withdraw() {
    Utils.contract
      .withdraw()
      .send({ from: window.tronWeb.defaultAddress.base58, callValue: 0,feeLimit: 100000000, })
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
        

            <Route exact path="/weeklyreports">
              <WeeklyReport
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
