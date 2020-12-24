const contractAddress = 'TB94mi47AnZCoyF6KXdBUDQL3NcjyXK8kS';


const utils = {
	tronWeb: false,
  contract: false,
 adminAddress:"TYPGbv47eFGBCDvjrPZNgXs3JfrqPMTWS9",

	async setTronWeb(tronWeb) {
		this.tronWeb = tronWeb;
		this.contract = await tronWeb.contract().at(contractAddress);
	}
};

export default utils;
