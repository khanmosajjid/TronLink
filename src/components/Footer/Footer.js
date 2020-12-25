import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import './Footer.scss';
import logo from '../../assets/logo.png'

export default class Footer extends Component {
    render(){
        return(
            <Container fluid={true} className="footer">
                <Row className="footer-row">
                    <img src={logo} alt="logo"></img>

                </Row>
                <Row className="footer-copyright">
                    Copyright @ 2020 All Rights Reserved
                </Row>

            </Container>
        )
    }
}