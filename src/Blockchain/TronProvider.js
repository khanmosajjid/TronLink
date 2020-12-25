
import React,{useEffect,useState} from "react"



function TronProvider(props){

    const initTron=()=>{
        await new Promise((resolve) => {
            const tronWebState = {
              installed: !!window.tronWeb,
              loggedIn: window.tronWeb && window.tronWeb.ready,
            };
      
            if (tronWebState.installed) {
              this.setState({
                tronWeb: tronWebState,
              });
      
              return resolve();
            }
      
            let tries = 0;
      
            const timer = setInterval(() => {
              if (tries >= 10) {
                const TRONGRID_API = "https://api.shasta.trongrid.io";
      
                window.tronWeb = new TronWeb(
                  TRONGRID_API,
                  TRONGRID_API,
                  TRONGRID_API
                );
      
                this.setState({
                  tronWeb: {
                    installed: false,
                    loggedIn: false,
                  },
                });
      
                clearInterval(timer);
                return resolve();
              }
      
              tronWebState.installed = !!window.tronWeb;
              tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;
      
              if (!tronWebState.installed) return tries++;
      
              this.setState({
                tronWeb: tronWebState,
              });
      
              resolve();
            }, 100);
          });
      
          if (!this.state.tronWeb.loggedIn) {
            // Set default address (foundation address) used for contract calls
            // Directly overwrites the address object as TronLink disabled the
            // function call
            window.tronWeb.defaultAddress = {
              hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
              base58: FOUNDATION_ADDRESS,
            };
            window.tronWeb.on("addressChanged", () => {
              if (this.state.tronWeb.loggedIn) {
                return;
              }
              this.setState({
                tronWeb: {
                  installed: true,
                  loggedIn: true,
                },
              });
            });
          }
          await Utils.setTronWeb(window.tronWeb);
          if (Utils) {
            //setting account in tron web
            this.setState({ account: window.tronWeb.defaultAddress.base58 });
            this.setState({ contract: Utils.contract });
            console.log("contract", Utils.contract);
          }
          this.setState({ InitError: true });
    } 


}