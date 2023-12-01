import contractInstance from "../../contractInstance.js";
export async function getUserAddresses() {
    let userAddressesCount = await contractInstance.methods.getUserAddressesCount().call();
    let addresses = [];
    for (let i = 0; i < userAddressesCount; i++) {
        let address = await contractInstance.methods.userAddresses(i).call();
        addresses.push(address);
    }
    return addresses;
}