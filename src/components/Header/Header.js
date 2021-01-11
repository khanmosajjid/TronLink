import React, { Component, useEffect } from "react";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import "./Header.scss";
import { Container, Row, Col, Label, Input } from "reactstrap";
import logo from "../../assets/logo.png";
import { Icon } from "semantic-ui-react";
// import "react-flags-select/scss/react-flags-select.scss";
import tron from "../../assets/tron.jpeg";
import india from "../../assets/india.png";
import { useTranslation } from "react-i18next";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Dropdown,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  FormGroup,
} from "reactstrap";

const Header = (props) => {
  const { t, i18n } = useTranslation();

  const [isWalletConnected, setWalletConected] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(true);
  const [isLanguageDropdownOpened,setLanguageDropdownOpened]= useState(false)
  const [defaultLanguage, setDefaultLangauge] = useState({
    name: "English",
    code: "en",
    flag: "https://www.countryflags.io/gb/flat/64.png",
  });

  const availableLanguages = [
    {
      name: "English",
      code: "en",
      flag: "https://www.countryflags.io/gb/flat/64.png",
    },
    {
      name: "Arabic",
      code: "ar",
      flag: "https://www.countryflags.io/sa/flat/64.png",
    },
    {
      name: "Hindi",
      code: "hi",
      flag: "https://www.countryflags.io/in/flat/64.png",
    },
    {
      name: "Chinese",
      code: "zh",
      flag: "https://www.countryflags.io/cn/flat/64.png",
    },
    {
      name: "Spanish",
      code: "spa",
      flag: "https://www.countryflags.io/es/flat/64.png",
    },
    {
      name: "Russian",
      code: "ru",
      flag: "https://www.countryflags.io/ru/flat/64.png",
    },
    {
      name: "French",
      code: "fr",
      flag: "https://www.countryflags.io/fr/flat/64.png",
    },
    {
      name: "Persian",
      code: "fa",
      flag: "https://www.countryflags.io/ir/flat/64.png",
    },
    {
      name: "Vietnamese",
      code: "vi",
      flag: "https://www.countryflags.io/vn/flat/64.png",
    },
  ];
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const toggleLanguage = () => {
    setLanguage(!language);
    console.log("language is ", language);
  };

  useEffect(() => {
    var obj = setInterval(async () => {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        clearInterval(obj);

        let rawAdd = window.tronWeb.defaultAddress.base58;
        if(rawAdd !== "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"){
          setWalletAddress(rawAdd);
          setWalletConected(true);
        }
       
      }
    }, 10);

    let locale = localStorage.getItem("locale");
    if (locale) {
      try {
        locale = JSON.parse(locale);
        console.log("locale", locale);
        setDefaultLangauge(locale);
      } catch (errr) {}
    }
  }, []);

  const languagePick = (language) => {
    console.log("languagePick", language);
    i18n.changeLanguage(language.code);
    localStorage.setItem("locale", JSON.stringify(language));
    setDefaultLangauge(language);
    window.location.reload();
  };
  const renderLanguages = () => {
    let languages = [];

    // languages.push(<li><i className="sl-flag flag-de"><div id="germany"></div>
    // </i> <span className="active">Deutsch</span></li>)

    // languages.push(<li><i className="sl-flag flag-usa"><div id="english"></div>
    // </i> <span>English</span></li>)

    for (let language of availableLanguages) {
      languages.push(
        <DropdownItem
          onClick={() => {
            languagePick(language);
          }}
        >
          <>
            {/* <i className={"sl-flag flag-"+language.code}>
        <div id={language.name}></div>
    </i>  */}

            <img
              src={language.flag}
              style={{ height: 20, width: 20, borderRadius: "50%" }}
            ></img>

            <span>{language.name}</span>
          </>
        </DropdownItem>
      );
    }
    return languages;
  };
  return (
    <Navbar
      dark
      expand="md"
      fluid={true}
      className="header"
      style={{ backgroundColor: "" + props.background }}
    >
      <NavbarBrand className="header__logo" href="/">
        <img className="logo" src={logo} alt="compony-logo"></img>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <Row className="header__containt-report" noGutters>
            <Col lg={3} className="header__containt-weeklyreport" onClick={()=>{
              
              var win = window.open("/weeklyreports", '');
              win.focus();  
            }}>
              <Icon
                name="calendar"
                style={{ color: "#eb475b" }}
                size={20}
              ></Icon>
              <p>{t("Weekly Trading reports")}</p>
            </Col>
            <Col
              lg={6}
              className="header__containt-dailyreport"
              style={{ marginRight: "0px !important" }}
            >
              <img src={tron} className="tron-logo" style={{ height: 15 }} />
              {isWalletConnected ? <p>{walletAddress}</p> : t("Connect Wallet")}
            </Col>

            <Col
              lg={2}
              className="header__containt-languages"
              // style={{ marginRight: "0px !important" }}
              // onClick={toggleLanguage()}
            >
              {/* <div className="sl-nav">
                <ul>
                   
                    <li>
                      <img
                        src={defaultLanguage.flag}
                        style={{ height: 20, width: 20, borderRadius: "50%" }}
                      ></img>
                      <b style={{ marginLeft: 2 }}>{defaultLanguage.name}</b>{" "}
                      <i className="fa fa-angle-down"></i>
                      <div className="triangle"></div>
                      <ul>{renderLanguages()}</ul>
                    </li>
                  
                </ul>
                
              </div> */}


<Dropdown isOpen={isLanguageDropdownOpened} toggle={()=>{

  console.log("dssdsds",isLanguageDropdownOpened)
setLanguageDropdownOpened(!isLanguageDropdownOpened)
}}>
     

     <DropdownToggle style={{padding:0,background:"none",border:0,fontWeight:"normal"}}>
     <img
                        src={defaultLanguage.flag}
                        style={{ height: 20, width: 20, borderRadius: "50%" }}
                      ></img>
                      <b style={{ marginLeft: 2 }}>{defaultLanguage.name}</b>{" "}
        </DropdownToggle>


     {/* <div onClick={()=>{
       setLanguageDropdownOpened(true)
     }}>
     <img
                        src={defaultLanguage.flag}
                        style={{ height: 20, width: 20, borderRadius: "50%" }}
                      ></img>
                      <b style={{ marginLeft: 2 }}>{defaultLanguage.name}</b>{" "}
     </div> */}
      <DropdownMenu style={{marginTop:25}}>
        {/* <DropdownItem header>Header</DropdownItem>
        <DropdownItem>Some Action</DropdownItem>
        <DropdownItem text>Dropdown Item Text</DropdownItem>
        <DropdownItem disabled>Action (disabled)</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Foo Action</DropdownItem>
        <DropdownItem>Bar Action</DropdownItem>
        <DropdownItem>Quo Action</DropdownItem> */}

        {renderLanguages()}
      </DropdownMenu>
    </Dropdown>
          
          
            </Col>
          </Row>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
export default Header;
