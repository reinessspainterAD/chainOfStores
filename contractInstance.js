import abi from "./abi.js";

const web3 = new Web3('http://127.0.0.1:8545');
export const contractAddress = '0x7022e02407050bBE68DaF80E8373e3C3f4Ac39e6';
const contractInstance = new web3.eth.Contract(abi, contractAddress);

export default contractInstance;