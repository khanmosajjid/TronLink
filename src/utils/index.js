const contractAddress = "TYNrc4DFbCAKBTPhcCa8m31Ng5yitoXqhD";

const utils = {
  tronWeb: false,
  contract: false,

  async setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
    this.contract = await tronWeb.contract().at(contractAddress);
  },
};

export default utils;
