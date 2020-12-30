const contractAddress = 'TYLJr94WUmKRPfLViPiRytwVvxEmm9W1oT';


const utils = {
	tronWeb: false,
  contract: false,
 adminAddress:"TYPGbv47eFGBCDvjrPZNgXs3JfrqPMTWS9",

	async setTronWeb(tronWeb) {
		this.tronWeb = tronWeb;

		console.log("addtrontwqe",window.tronWeb.defaultAddress.base58)
		this.contract = await tronWeb.contract().at(contractAddress);
	}
};

export default utils;
