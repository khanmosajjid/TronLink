import React, { Component } from "react";
import "./home.css";
import Header from "./Header/Header";
import Body from "./Body/Body";
import { Row, Col } from "reactstrap";

import Payment from "./Payment/Payment";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="home">
        <Body
          totalDepositAmount={this.props.totalDepositAmount}
          totalMembers={this.props.totalMembers}
          totalWithdraw={this.props.totalWithdraw}
          invest={this.props.invest}
        ></Body>

        <Payment></Payment>
      </div>
    );
  }
}
