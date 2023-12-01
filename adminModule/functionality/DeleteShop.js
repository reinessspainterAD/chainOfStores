import contractInstance from "../../contractInstance.js";
import { getShopAddresses } from "../getAddresses/getShopAddresses.js";
import { logActions } from "../../logActions.js";
import { setActionHistory } from "../../setActionHistory.js";

export async function DeleteShop(LoggedIn){
	let deleteShopWindow = document.getElementById('DeletingShop');
    deleteShopWindow.style.display = "flex";
    let select = document.getElementById('DeleteShopAddresses');
	let addresses = await getShopAddresses();
	addresses.forEach(acc =>{
		if(acc != "0x0000000000000000000000000000000000000000"){
			let option = document.createElement('option'); 
			option.setAttribute('id','AddressOption')
			option.value = acc;
			option.textContent = acc;
			select.appendChild(option);
		}
	})

	let add = document.getElementById('ShopDelete');
	let close = document.getElementById('DeleteShopClose');

	add.addEventListener('click', async (e)=>{
		e.preventDefault();
        let deleteShopAddresses = document.getElementById('DeleteShopAddresses').value;
        if(deleteShopAddresses  == ""){
            console.log("Поля не заполнены!")
        }else{
            await contractInstance.methods.DeletingShop(deleteShopAddresses).send({from: LoggedIn, gas: 5000000});
			logActions("Удаление магазина", {
                address: deleteShopAddresses
            }, LoggedIn)
			setActionHistory(LoggedIn)
            console.log("OK")
        }
	})

	close.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        deleteShopWindow.style.display = 'none';	
    })
}