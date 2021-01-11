import React, { Component } from 'react';
import { Col,Row } from 'reactstrap';
import './Cards.scss';
import icon1 from '../../../assets/icon1.png'
import icon10 from '../../../assets/icon10.png'
import icon12 from '../../../assets/icon12.png'
import icon13 from '../../../assets/icon13.png';

import { Trans } from 'react-i18next';

export default class Cards extends Component{


    componentWillReceiveProps(props){
        console.log("propsss123",props)
    }


    render(){
        return(
            <Row className={this.props.dontAllowMarginBottom? "cards ":"bottomMargin cards "} 
            // style={this.props.dontAllowMarginBottom?{marginBottom:0}:{marginBottom:"20%"}}
            >
                <Col lg={2} xs={5} className="cards__body1">
                    <img src={icon1} alt="totalDeposit"></img>
        <p style={{fontSize:18,marginTop:5}}><Trans>{this.props.card1Name}</Trans></p>
                    <p style={{fontSize:22}}>{this.props.card1Data}</p>
                </Col>
                <Col lg={2} xs={5} className="cards__body2">
                <img src={icon10} alt="totalDeposit"></img>
                    <p style={{fontSize:18,marginTop:5}}> <Trans>{this.props.card2Name}</Trans></p>
                    <p style={{fontSize:22}}>{this.props.card2Data}</p>

               
                </Col>
                <Col  lg={2} xs={5} className="cards__body3">
                <img src={icon12} alt="totalDeposit"></img>
                    <p style={{fontSize:18,marginTop:5}}><Trans>{this.props.card3Name}</Trans></p>
                    <p style={{fontSize:22}}>{this.props.card3Data}</p>
                </Col>
                <Col lg={2} xs={5} className="cards__body4">
                <img src={icon13} alt="totalDeposit"></img>
                    <p style={{fontSize:18,marginTop:5}}><Trans>{this.props.card4Name}</Trans></p>
        <p style={{fontSize:22}}>{this.props.card4Data}</p>
                </Col>
            </Row>
        )
    }
}