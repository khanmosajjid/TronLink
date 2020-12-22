const contractAddress = 'TCWoJu5z7i9yaCHskbnxDyhmmgaNdz7XBX';

const utils = {
	tronWeb: false,
	contract: false,

	async setTronWeb(tronWeb) {
		this.tronWeb = tronWeb;
		this.contract = await tronWeb.contract().at(contractAddress);
	}
};

export default utils;
