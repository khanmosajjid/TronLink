import React, { useEffect,useState } from 'react';
import './WeeklyReport.scss';
import Header from '../components/Header/Header';
import Main from './Main/Main';
import Promotional from './PromotionalBanner/Promotion';
import Footer from '../components/Footer/Footer';
import { Trans } from 'react-i18next';
import { Container ,Row,Col} from 'reactstrap';
import YouTube from 'react-youtube';
import moment from "moment";
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import firebaseConfig from "../firebaseConfig"
import firebase from 'firebase';

export default function WeekyReport(){
	const opts = {
		height: '50',
		// width: '640',
		playerVars: {
		  // https://developers.google.com/youtube/player_parameters
		//   autoplay: 1,
		},
	  };


	const [dataItems,setDataItems]= useState([])
	const [firebaseDb,setFirebaseDb]= useState(null)




	// useEffect(() => {
	// 	let items = []
	// 	if(data.length>0){
	// 		for(let item of data){
	// 			items.push(renderReportItem(item))
	// 		}
	// 		setDataItems(items)
	// 	}
	// },[data])



	useEffect(()=>{
		let db = firebaseDb
		if(!db){
			firebase.initializeApp(firebaseConfig);
			db = firebase.database();
			setFirebaseDb(db)
		}
		

		try {
			db.ref("reports").once('value', snapshot => {
			  let viewItems = []
			  snapshot.forEach((snap) => {
				//   console.log("vd",snap.val().endWeek)
			
				let data = snap.val()
				viewItems.push(renderReportItem({
					videoId :data.videoId,
					description:data.description,
					startWeek:new Date(data.startWeek),
					endWeek:new Date(data.endWeek)
				}))

			  });


			  

			  
				setDataItems(viewItems)
			
			//   this.setState({ chats });
			});



		  } catch (error) {

		  }
	},[])


	const renderReportItem = (data)=>{

		
		return <Col lg={3} className="cardItem">
		<YouTube videoId={data.videoId} opts={opts}  />
		<h2 style={{margin:0,fontWeight:"bold",fontSize:30}} 
		className="cardHeading">Report</h2>

		<h2 style={{margin:0,fontWeight:"bold",fontSize:18}} 
		className="">{moment(data.startWeek).format("DD/MMM/YYYY")} To {moment(data.endWeek).format("DD/MMM/YYYY")}</h2>

		<span style={{marginTop:25}}>{data.description}</span>
		</Col>
	}


	return (
		<div>


			<div className="header-component">
				<Header backgroundImage="#00000000"/>
				<h1><Trans>Weekly Trading Reports</Trans></h1>
			</div>

			<Row style={{
		
			top: 0,
			bottom: 0,
		}}>

			<div style={{marginLeft:25,marginRight:25,
			width:"100%",
			height:"100%",
			alignItems:"center",
				justifyContent:"center",}}>


			<Row style={{alignItems:"center",justifyContent:"center"}}>
			{dataItems.length>0?dataItems:<div style={{fontSize:35,
		
				fontWeight:"bold",bottom:0}}></div>}

			</Row>
			</div>
			</Row>

				<div style={dataItems.length==0?{bottom:0,position:"absolute",width:"100%",}:{}}>
				<Footer />
				</div>

		</div>
	);
}
