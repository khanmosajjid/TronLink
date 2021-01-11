const contractAddress = 'TRVHySRG9YudsvhYTEF6Cg4qNcFFxdLwcL';


const utils = {
	tronWeb: false,
  contract: false,
  contractAddress:contractAddress,
 adminAddress:"TYPGbv47eFGBCDvjrPZNgXs3JfrqPMTWS9",

	async setTronWeb(tronWeb) {
		this.tronWeb = tronWeb;

		console.log("addtrontwqe",window.tronWeb.defaultAddress.base58)
		this.contract = await tronWeb.contract().at(contractAddress);
	}
};

export default utils;
