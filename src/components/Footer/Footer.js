import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import './Footer.scss';
import logo from '../../assets/logo.png'
import utils from "../../utils"
export default class Footer extends Component {
    render(){
        return(
            <Container fluid={true} className="footer">
                <Row className="footer-row">
                    <img src={logo} alt="logo"></img>

                </Row>
                <div className="footer-copyright">
                    Copyright @ 2020 All Rights Reserved | {" "}
                    <a  target="_blank" 
                    href={"https://tronscan.org/#/contract/"+utils.contractAddress}>{utils.contractAddress}</a>
                </div>

            </Container>
        )
    }
}