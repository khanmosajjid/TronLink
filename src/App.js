import logo from './logo.svg';
import './App.css';
import Home from './components/home'
import Header from './components/Header/Header'
import Payment from './components/Payment/Payment';
import Footer from './components/Footer/Footer';
import Main from './components/Main';
import LandingPage from './LandingPage/landingPage'
import Utils from './utils/index'
import { Component } from 'react';
import TronWeb from 'tronweb'
const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      
      loading: false,
      account: "0x",
      tronWeb: {
        installed: false,
        loggedIn: false,
      },
    };
  }
  
  async componentDidMount() {
    
    this.setState({ loading: true });
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
          const TRONGRID_API = "https://api.trongrid.io";

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
    
    this.setState({ account: window.tronWeb.defaultAddress.base58 });
    console.log(Utils.contract + "Contract")
    console.log("hello");
  }
  render(){
    return (
      <div className="App">
        {/* <LandingPage></LandingPage> */}
        <Main></Main>

        
        
        
      </div>
    );

  }
 
}

// export default App;
