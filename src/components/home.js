import React, { Component } from 'react';
import './home.css';
import Header from './Header/Header';
import Body from './Body/Body'
import {Row,Col} from 'reactstrap';

import Payment from './Payment/Payment';


export default class Home extends Component{
    render(){
        return(
            <div className="home">
                
                <Body></Body>
                
                <Payment></Payment>
            </div>
        )
    }

}
