import contractInstance from "../../contractInstance.js";
export async function getShopAddresses(){
	const shopAddressesCount = await contractInstance.methods.getShopAddressesCount().call();
	let addresses = [];
	for(let i =0; i < shopAddressesCount; i++){
		let address = await contractInstance.methods.shopAddresses(i).call();
		addresses.push(address);
	}
	return addresses
}