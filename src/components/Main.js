import React, { Component } from 'react';
import './Main.scss';
import Header from './Header/Header';
import Home from './home';
import Footer from './Footer/Footer';

export default class Main extends Component {
	constructor(props) {
		super(props);
	}
	//   componentWillReceiveProps(props) {
	//     console.log(
	//       "this is main props ",
	//       props.totalDepositAmount,
	//       props.totalMembers,
	//       props.totalWithdraw
	//     );
	//   }
	render() {
		return (
			<div className="app">
				{/* {console.log(this.props.data + " this is main state")} */}
				<Header background="#05133a" />
				<Home
					totalDepositAmount={this.props.totalDepositAmount ? this.props.totalDepositAmount : '-'}
					totalMembers={this.props.totalMembers ? this.props.totalMembers : '-'}
					totalWithdraw={this.props.totalWithdraw ? this.props.totalWithdraw : '-'}
					invest={this.props.invest}
					tradingPool={this.props.tradingPool}
				/>
				<Footer />
			</div>
		);
	}
}
