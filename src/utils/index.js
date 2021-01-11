const contractAddress = 'TJELLWRSi3CmKyHnq64U2N1vDeqqHYbtks';

const utils = {
	tronWeb: false,
	contract: false,

	async setTronWeb(tronWeb) {
		this.tronWeb = tronWeb;
		this.contract = await tronWeb.contract().at(contractAddress);
	}
};

export default utils;
