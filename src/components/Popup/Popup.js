import React from "react";
import { Container, Row } from "reactstrap";
import "./Popup.scss";

const Popup = (props) => {

    
    // const toggle=()=>{
         
    // }
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
