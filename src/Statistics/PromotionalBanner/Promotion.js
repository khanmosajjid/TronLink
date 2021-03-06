import React, { Component } from "react";
import { Container, Row, Input, Label,Button } from "reactstrap";
import "./Promotion.scss";
import banner1 from "../../assets/banner1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import smallBanner from "../../assets/smallBanner.gif"
import mediumBanner from "../../assets/mediumBanner.gif"
import largeBanner from "../../assets/largeBanner.gif"
import { Trans } from 'react-i18next';

export default class Promotion extends Component {


  constructor(props){
    super(props)
    this.copyClipboard=this.copyClipboard.bind(this);
    // this.getMyRefLink=this.getMyRefLink.bind(this)
    this.state={
      largeBannerCode:"",
      mediumBannerCode:"",
      smallBannerCode:"",

    }
  }
   copyClipboard(code) {
    var textField = document.createElement("textarea");
    textField.innerText = code
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
   

    // setCopySuccess("Copied!");
    toast.success("Referral Link Copied");
  }


  getSmallBannerCode(){
    if(this.props.account){
      return '<a href="'+this.getMyRefLink()+'"> <img style="height:125px;width:125px" src="https://trontiply.com/static/media/smallBanner.fd5be3a4.gif"/> </a>'
    }
  }



  getMediumBannerCode(){
    if(this.props.account){
      return '<a href="'+this.getMyRefLink()+'"> <img  style="height:60px;width:468px" src="https://trontiply.com/static/media/mediumBanner.700dca68.gif"/> </a>'
    }
  }



  getLargeBannerCode(){
    if(this.props.account){
      return '<a href="'+this.getMyRefLink()+'"> <img   style="height:90px;width:728px" src="https://trontiply.com/static/media/largeBanner.a434eb19.gif"/> </a>'
    }
  }


  getMyRefLink=()=>{
    if(this.props.account){
      return "https://trontiply.com/?ref="+this.props.account
    }
  }







  render() {
    return (
      <Container className="promotion">
        <h1><Trans>Promotional Banners</Trans></h1>
        <src></src>
        <img className="image-1" src={largeBanner} style={{marginTop: "25px",
        height:"auto",
        width:"80%"
      }}></img>
        <Row className="input-bar">
          <Label for="amount"></Label>
          <Input
            type="text"
            name="amount"
            className="input-box"
            value={this.getLargeBannerCode()}

          />
     
          <Button className="promotion__button" onClick={()=>{
            this.copyClipboard(this.getLargeBannerCode())
          }}><Trans>Copy</Trans></Button>
        </Row>

        <img className="image-1" src={mediumBanner} style={{height:"auto",
          // width:468,
          width:"60%"

          }}></img>
        <Row className="input-bar">
          <Label for="amount"></Label>
          <Input
            type="text"
            name="amount"
            value={this.getMediumBannerCode()}
            className="input-box"
          />
          <Button className="promotion__button" onClick={()=>{
            this.copyClipboard(this.getMediumBannerCode())
          }}><Trans>Copy</Trans></Button>
        </Row>
        





        <img  src={smallBanner} style={{height:"auto",width:125}}></img>
        <Row className="input-bar">
          <Label for="amount"></Label>
          <Input
            type="text"
            name="amount"
            value={this.getSmallBannerCode()}
            className="input-box"
          />
          <Button className="promotion__button" onClick={()=>{
            this.copyClipboard(this.getSmallBannerCode())
          }}><Trans>Copy</Trans></Button>
        </Row>
        
        
        
        
        <ToastContainer/>
        
      </Container>
    );
  }
}
