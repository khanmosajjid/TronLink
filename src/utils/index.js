const contractAddress = 'THZVRUcrhEz1JkhQP8w8sBfNrXA94G2Chd';

const utils = {
	tronWeb: false,
	contract: false,

	async setTronWeb(tronWeb) {
		this.tronWeb = tronWeb;
		this.contract = await tronWeb.contract().at(contractAddress);
	}
};

export default utils;
