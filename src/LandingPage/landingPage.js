import React, { Component } from 'react';
import './landingPage.scss';
import Header from '../components/Header/Header'
import Main from './Main/Main';
import Promotional from './PromotionalBanner/Promotion';
import Footer from '../components/Footer/Footer'

export default class LandingPage extends Component{
    render(){
        return(
            <div>
                <div className="header-component">
                <Header></Header>
                <h1>User Statistics</h1>

                </div>
                
                <Main></Main>
                <Promotional></Promotional>
                <Footer></Footer>
                

            </div>
        )
    }

}