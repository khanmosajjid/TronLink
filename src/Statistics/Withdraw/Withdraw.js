import React, { Component } from 'react';
import { Container,Row,Col } from 'reactstrap';
import './Withdraw.scss';
import Icon1 from '../../assets/icon1.png'

export default class Withdraw extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container fluid={true} className="withdraw-card" style={{background:"linear-gradient(262deg,"+
            this.props.bgStartColor +" 8%," 
            + this.props.bgEndColor+ " 98%)",height:"100%"}}>
                <Row className="withdraw-card__main">
                    <Col lg={3} xs={12} style={{padding:"0px !important"}} className="card-head">
                        <div className="icon"
                        style={{background:"linear-gradient(262deg,"+
                        this.props.bgStartColor +" 8%," 
                        + this.props.bgEndColor+ " 98%)"}}
                        >
                          <img src={this.props.icon} style={{padding:"8px"}}></img>
                        </div>
                    </Col>
                    <Col lg={9} xs={12} style={{padding:"0px !important",color:"white"}} className="card-body">
                         <h6 style={{fontWeight:"600"}}>{this.props.heading}</h6>
                         <h2 style={{color:"white"}}>{this.props.data}</h2>
                    </Col>
                </Row>
            </Container>
        )
    }
}