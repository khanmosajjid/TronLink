const contractAddress = "TDPmb8xNeV9FsikHAWzNf3JhH6ioXHdebT";

const utils = {
  tronWeb: false,
  contract: false,

  async setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
    this.contract = await tronWeb.contract().at(contractAddress);
  },
};

export default utils;
