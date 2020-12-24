import React from "react";
import { Container, Row } from "reactstrap";
import "./Popup.scss";

const Popup = (props) => {

    
    // const toggle=()=>{
         
    // }
  return (
    <div className="popup-box">
      <div className="box" style={{backgroundColor:""+props.backGround}}>
        
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
