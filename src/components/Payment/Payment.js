import React, { Component } from 'react';
import { Container,Row,Button} from 'reactstrap';
import './Payment.scss';
import Widget from '../widget/widget';
import BinaryCommision from '../widget/BinaryCommisionCalc/BinaryCommision'
import level1 from '../../assets/level1.png';
import level2 from '../../assets/level2.png';
import level3 from '../../assets/level3.png';
import level4 from '../../assets/level4.png';
import level5 from '../../assets/level5.png';
import level6 from '../../assets/level6.png';
import level7 from '../../assets/level7.png';
import level8 from '../../assets/level8.png';
import level9 from '../../assets/level9.png';
import level_icon_1a from '../../assets/level_icon_1a.png';
import level_icon_1b from '../../assets/level_icon_1b.png';
import level_icon_2a from '../../assets/level_icon_2a.png';
import level_icon_2b from '../../assets/level_icon_2b.png';
import level_icon_3a from '../../assets/level_icon_3a.png';
import level_icon_3b from '../../assets/level_icon_3b.png';
import level_icon_4a from '../../assets/level_icon_4a.png';
import level_icon_4b from '../../assets/level_icon_4b.png';


export default class Payment extends Component{
    
    render(){
        return(
            <Container fluid={true} className="payment">
                <Row className="payment-header">
                    <h1>Payment plan</h1>
                    <span style={{border:"1px solid orange",width:"5%"}}></span>
                    <h5>EARN 1% DAILY PROFIT EVERDAY</h5>
                    <p className="personal-detail"><span>Personal Detail Bonus :</span>
                    For Every 100k of your own deposit you will earn
                    0.02% extra profit daily.Personal Detail Bonus is capped
                    at 0.20%
                    </p>
                    <p className="example">
                        <span>Example :</span>
                        If you deposit 9900trx you will earn 1% daily.
                        If your deposit is 100k your daily profit will increse
                        to 1.02% and it will increase 0.02% for every 100k in your deposti

                    </p>
                    <h3>Referral Commision</h3>

                </Row>
                <Row className="widget-row">
                   <Widget levelName="Starter"
                   icon1={level_icon_1a}
                   icon2={level_icon_1b}
                   levelAmmount="100"
                   levelNumber="3"
                   color="#0492ff"
                   bgStartColor="#92b0d6"
                   bgEndColor="#0b61db"
                   image={level1}
                   ></Widget>
                   <Widget 
                    icon1={level_icon_4a}
                    icon2={level_icon_4b}
                   levelName="Bronze"
                   levelNumber="4"
                   levelAmmount="100k"
                   color="#ff3c5e"
                   bgStartColor="#f19539"
                   bgEndColor="#f3037e"
                   image={level2}
                   ></Widget>
                   <Widget 
                    icon1={level_icon_2a}
                    icon2={level_icon_2b}
                   levelNumber="5"
                   levelAmmount="1 million"
                   levelName="Platinum"
                   color="#ff9600"
                    bgStartColor="#dc7107"
                    bgEndColor="#f39d03"
                    image={level3}
                   ></Widget>
                 
                   <Widget 
                    icon1={level_icon_3a}
                    icon2={level_icon_3b}
                   levelNumber="6"
                   levelAmmount="5 million"
                   levelName="Premium"
                   color="#51ce91"
                   bgStartColor="#a9dc07"
                   bgEndColor="#a3e09b "
                   image={level4}
                   ></Widget>
                    <Widget 
                     icon1={level_icon_1a}
                     icon2={level_icon_1b}
                    levelNumber="7"
                    levelAmmount="10 million"
                    levelName="Titanium"
                    color="#0492ff"
                   bgStartColor="#92b0d6"
                   bgEndColor="#0b61db"
                   image={level5}
                   ></Widget>
                   <Widget 
                    icon1={level_icon_4a}
                    icon2={level_icon_4b}
                   levelNumber="8"
                   levelAmmount="50 million"
                   levelName="Silver"
                   color="#ff3c5e"
                   bgStartColor="#f19539"
                   bgEndColor="#f3037e"
                   image={level6}
                   ></Widget>
                   <Widget 
                    icon1={level_icon_2a}
                    icon2={level_icon_2b}
                   levelNumber="8"
                   levelAmmount="50 million"
                   levelName="Gold"
                   color="#ff9600"
                    bgStartColor="#dc7107"
                    bgEndColor="#f39d03"
                    image={level7}
                   ></Widget>
                 
                   <Widget 
                    icon1={level_icon_3a}
                    icon2={level_icon_3b}
                   levelNumber="9"
                   levelAmmount="100 million"
                   levelName="Diamond"
                   color="#51ce91"
                   bgStartColor="#a9dc07"
                   bgEndColor="#a3e09b "
                   image={level8}
                   ></Widget>
                    
                   <Widget 
                    icon1={level_icon_4a}
                    icon2={level_icon_4b}
                   levelNumber="10"
                   levelAmmount="50 million"
                   levelName="Super Gold"
                   color="#ff3c5e"
                   bgStartColor="#f19539"
                   bgEndColor="#f3037e"
                   image={level9}
                   ></Widget>
                   
                   
                   <BinaryCommision></BinaryCommision>
                  <Row className="payment-button">
                  <Button className="widget__button">Participate now</Button>
                      </Row>  
                </Row>
        
             </Container>
        )
    }

}