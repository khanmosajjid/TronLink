const contractAddress = 'TGakrQDsjSBVSFYq23BVKJYC7VJQFEHHTr';


const utils = {
	tronWeb: false,
  contract: false,
  contractAddress:contractAddress,
 adminAddress:"TRVHySRG9YudsvhYTEF6Cg4qNcFFxdLwcL",

	async setTronWeb(tronWeb) {
		this.tronWeb = tronWeb;

		console.log("addtrontwqe",window.tronWeb.defaultAddress.base58)
		this.contract = await tronWeb.contract().at(contractAddress);
	}
};

export default utils;
