const contractAddress = 'TUH1N5HDpEwA1iXUYJgEnPiWgK2n7whyeg';

const utils = {
	tronWeb: false,
	contract: false,

	async setTronWeb(tronWeb) {
		this.tronWeb = tronWeb;
		this.contract = await tronWeb.contract().at(contractAddress);
	}
};

export default utils;
