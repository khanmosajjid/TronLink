import React, { Component } from 'react';
import './Main.scss';
import Header from './Header/Header';
import Home from './home';
import Footer from './Footer/Footer'

export default class Main extends Component{
    render(){
        return(
            <div className="app">
      <Header></Header>
      <Home></Home>
      <Footer></Footer>
     
      
    </div>
        )
    }

}
