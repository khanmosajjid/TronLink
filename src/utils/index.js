const contractAddress = 'TA6Ds28RM9PPgVZFSWxq3ZtaceDmyP1pjU';


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
