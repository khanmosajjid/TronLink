import React, { Component } from "react";
import { Container, Row, Input, Label,Button } from "reactstrap";
import "./Promotion.scss";
import banner1 from "../../assets/banner1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Promotion extends Component {


  constructor(props){
    super(props)
    this.copyClipboard=this.copyClipboard.bind(this);
    // this.getMyRefLink=this.getMyRefLink.bind(this)
  }
   copyClipboard(e) {
    var textField = document.createElement("textarea");
    textField.innerText = this.getMyRefLink();
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
   

    // setCopySuccess("Copied!");
    toast.success("copy to clipboard");
  }


  getMyRefLink=()=>{
    if(this.props.account){
      return "https://trontiply.com/?ref="+this.props.account
    }
  }
  render() {
    return (
      <Container className="promotion">
        <h1>Promotional Banners</h1>
        <src></src>
        <img src={banner1} style={{marginTop: "25px"}}></img>
        <Row className="input-bar">
          <Label for="amount"></Label>
          <Input
            type="text"
            name="amount"
            className="input-box"
            value={this.getMyRefLink()}

          />
          <Button className="promotion__button" onClick={()=>{
            this.copyClipboard()
          }}>Copy</Button>
        </Row>

        <img src={banner1}></img>
        <Row className="input-bar">
          <Label for="amount"></Label>
          <Input
            type="text"
            name="amount"
            value={this.getMyRefLink()}
            className="input-box"
          />
          <Button className="promotion__button" onClick={()=>{
            this.copyClipboard()
          }}>Copy</Button>
        </Row>
        <ToastContainer/>
        
      </Container>
    );
  }
}
