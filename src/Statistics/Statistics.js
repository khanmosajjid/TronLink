import React, { Component } from 'react';
import './Statistics.scss';
import Header from '../components/Header/Header';
import Main from './Main/Main';
import Promotional from './PromotionalBanner/Promotion';
import Footer from '../components/Footer/Footer';
import { Trans } from 'react-i18next';

export default class LandingPage extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<div className="header-component">
					<Header backgroundImage="#00000000"/>
					<h1><Trans>User Statistics</Trans></h1>
				</div>

				<Main
				  activeDeposits={this.props.activeDeposits}
				  expiredDeposits={this.props.expiredDeposits}
				  levelTree = {this.props.levelTree}
					userTotalDeposits={this.props.userTotalDeposits}
					invest={this.props.invest}
					userTotalActiveDeposits={this.props.userTotalActiveDeposits}
					noOfTotalDeposits={this.props.noOfTotalDeposits}
					totalEarnedFromDailyProfit={this.props.totalEarnedFromDailyProfit}
					totalReferralCommissionEarned={this.props.totalReferralCommissionEarned}
					referralLevelsUnlocked={this.props.referralLevelsUnlocked}
					totalTeamDepositVolume={this.props.totalTeamDepositVolume}
					binaryCommissionEarnedSoFar={this.props.binaryCommissionEarnedSoFar}
					referrals={this.props.referrals}
					totalTeamMembers={this.props.totalTeamMembers}
					withdraw={this.props.withdraw}
					userDailyProfit={this.props.userDailyProfit}
                    userPersonalDepositProfit={this.props.userPersonalDepositProfit}
                    account={this.props.account}
				/>
				<Promotional                     account={this.props.account}
/>
				<Footer />
			</div>
		);
	}
}
