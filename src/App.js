import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import Header from './components/Header/Header';
import Payment from './components/Payment/Payment';
import Footer from './components/Footer/Footer';
import Main from './components/Main';
import Statistics from './Statistics/Statistics';
import Utils from './utils';
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TronWeb from 'tronweb';
const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			totalUsers: null,
			tronWeb: {
				installed: false,
				loggedIn: false
			},
			account: '0x0'
			// levels: [],
		};
		this.fetchPlatformData = this.fetchPlatformData.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);
		this.getLevelWiseCount = this.getLevelWiseCount.bind(this);
		this.invest = this.invest.bind(this);
		this.withdraw = this.withdraw.bind(this);
	}

	async componentDidMount() {
		await this.initTron();
		console.log('tron initiated', this.state);

		this.getUserInfo(this.state.account);

		this.fetchPlatformData();
		for (let i = 0; i < 3; i++) {
			this.getUserDepositInfo(this.state.account, i);
		}
		console.log(this.state);
	}

	async initTron() {
		await new Promise((resolve) => {
			const tronWebState = {
				installed: !!window.tronWeb,
				loggedIn: window.tronWeb && window.tronWeb.ready
			};

			if (tronWebState.installed) {
				this.setState({
					tronWeb: tronWebState
				});

				return resolve();
			}

			let tries = 0;

			const timer = setInterval(() => {
				if (tries >= 10) {
					const TRONGRID_API = 'https://api.trongrid.io';

					window.tronWeb = new TronWeb(TRONGRID_API, TRONGRID_API, TRONGRID_API);

					this.setState({
						tronWeb: {
							installed: false,
							loggedIn: false
						}
					});

					clearInterval(timer);
					return resolve();
				}

				tronWebState.installed = !!window.tronWeb;
				tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

				if (!tronWebState.installed) return tries++;

				this.setState({
					tronWeb: tronWebState
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
				base58: FOUNDATION_ADDRESS
			};
			window.tronWeb.on('addressChanged', () => {
				if (this.state.tronWeb.loggedIn) {
					return;
				}
				this.setState({
					tronWeb: {
						installed: true,
						loggedIn: true
					}
				});
			});
		}
		await Utils.setTronWeb(window.tronWeb);
		if (Utils) {
			//setting account in tron web
			this.setState({ account: window.tronWeb.defaultAddress.base58 });
			this.setState({ contract: Utils.contract });
			console.log('contract', Utils.contract);
		}
		this.setState({ InitError: true });
	}

	//refferer
	async invest(entryFees) {
		this.setState({ loading: true });
		Utils.contract
			.invest('TYPGbv47eFGBCDvjrPZNgXs3JfrqPMTWS9')
			.send({
				from: window.tronWeb.defaultAddress.base58,
				callValue: entryFees * 1000000,
				shouldPollResponse: true
			})
			.then((receipt) => {
				console.log('success');
				console.log(receipt);
			})
			.catch((err) => {
				console.log('error while investing', err);
			});
	}

	async fetchPlatformData() {
		let totalUsers = (await this.state.contract.getTotalVolume().call()).toNumber();
		console.log('users', totalUsers);
		let totalDepositAmount = (await this.state.contract.getTotalDepositsAmount().call()).toNumber() / 1000000;
		console.log(totalDepositAmount + 'it is total ammmount');
		let totalWithdrawn = (await this.state.contract.getTotalWithdrawn().call()).toNumber() / 1000000;
		console.log(totalWithdrawn, ' is total Withdrawn');
		let tradingPool = (await this.state.contract.getAmountInTradingPool().call()).toNumber() / 1000000;

		let payload = {
			totalUsers: totalUsers,
			totalDepositAmount: totalDepositAmount,
			totalWithdrawn: totalWithdrawn,
			tradingPool: tradingPool
		};
		this.setState(payload);
	}

	async getUserInfo(addr) {
		let userDailyProfit = (await this.state.contract.getUserDailyProfit(addr).call()).toNumber() / 1000000;
		console.log('daily', userDailyProfit);
		let binaryBalanceLeftForWithdrawl =
			(await this.state.contract.getBinaryBalanceLeftForWithdrawl(addr).call()).toNumber() / 1000000;
		userDailyProfit = userDailyProfit + binaryBalanceLeftForWithdrawl;
		console.log('binarr left', binaryBalanceLeftForWithdrawl);
		// userDailyProfit = userDailyProfit + getBinaryBalanceLeftForWithdrawl;
		const userPersonalDepositProfit = (await this.state.contract.getExtraProfit(addr).call()).toNumber() / 100;
		console.log("personal",userPersonalDepositProfit)
		const totalEarnedFromDailyProfit =
			(await this.state.contract.totalEarnedFromDailyProfit(addr).call()).toNumber() / 1000000;
		const totalReferralCommissionEarned =
			(await this.state.contract.getTotalReferralCommissionEarned(addr).call()).toNumber() / 1000000;
		const referralLevelsUnlocked = (await this.state.contract.getReferralsLevelsUnlocked(addr).call()).toNumber();
		const totalTeamDepositVolume =
			(await this.state.contract.getTotalTeamDepositVolume(addr).call()).toNumber() / 1000000;
		console.log('total team deposit vol', totalTeamDepositVolume);
		const binaryCommissionEarnedSoFar =
			(await this.state.contract.getBinaryCommissionEarnedSoFar(addr).call()).toNumber() / 1000000;
		const referrals = (await this.state.contract.getReferrals(addr).call()).toNumber();
		const totalTeamMembers = (await this.state.contract.getTotalTeamMembers(addr).call()).toNumber();

		const userTotalActiveDeposits =
			(await this.state.contract.getUserTotalActiveDeposits(addr).call()).toNumber() / 1000000;
		const noOfTotalDeposits = (await this.state.contract.getUserTotalNumberOfDeposits(addr).call()).toNumber();
		const userTotalDeposits = (await this.state.contract.getUserTotalDeposits(addr).call()).toNumber() / 1000000;

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
			totalTeamMembers: totalTeamMembers
		};
		console.log('Payload is ', payload);
		let contractBalance = (await this.state.contract.getContractBalance().call()).toNumber() / 1000000;
		console.log('contract balance', contractBalance);
		this.setState(payload);
		for (var i = 0; i < 10; i++) {
			const result = await this.getLevelWiseCount(this.state.account, i + 1);
			console.log(result, ' level', i + 1, '-----');
		}
	}

	async getUserDepositInfo(addr, index) {
		let res = await this.state.contract.getUserDepositInfo(addr, index).call();
		console.log('deposit info..', res._amount.toNumber());
	}

	async getLevelWiseCount(addr, level) {
		const levelWiseCount = (await this.state.contract.getLevelWiseCount(addr, level).call()).toNumber();
		return levelWiseCount;
	}

	async withdraw() {
		Utils.contract
			.withdraw()
			.send({ from: window.tronWeb.defaultAddress.base58, callValue: 0 })
			.then((res) => {
				if (res == true) console.log('success');
			})
			.catch((err) => {
				console.log('error while withdrawing', err);
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

						<Route exact path="/landing">
							<Statistics
								userTotalDeposits={this.state.userTotalDeposits}
								invest={this.invest}
								totalEarnedFromDailyProfit={this.state.totalEarnedFromDailyProfit}
								totalReferralCommissionEarned={this.state.totalReferralCommissionEarned}
								referralLevelsUnlocked={this.state.referralLevelsUnlocked}
								totalTeamDepositVolume={this.state.totalTeamDepositVolume}
								binaryCommissionEarnedSoFar={this.state.binaryCommissionEarnedSoFar}
								referrals={this.state.referrals}
								totalTeamMembers={this.state.totalTeamMembers}
								withdraw={this.withdraw}
								userDailyProfit={this.state.userDailyProfit}
								userPersonalDepositProfit={this.state.userPersonalDepositProfit}
								userTotalActiveDeposits={this.state.userTotalActiveDeposits}
								noOfTotalDeposits={this.state.noOfTotalDeposits}
							/>
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
