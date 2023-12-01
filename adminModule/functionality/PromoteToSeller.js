import contractInstance from "../../contractInstance.js";
import { getUserAddresses } from "../getAddresses/getUserAddresses.js";
import { logActions } from "../../logActions.js";
import { setActionHistory } from "../../setActionHistory.js";

export async function PromoteToSeller(LoggedIn){
    let select = document.getElementById('SellerAddresses');
    let addresses = await getUserAddresses();
    addresses.forEach(async address => {
		let user = await contractInstance.methods.users(address).call();
		if(user.role == 2){
			let option = document.createElement('option'); 
			option.setAttribute('id','SellerOption')
			option.value = address;
			option.textContent = address; 
			select.appendChild(option);
		}

    });

    let add = document.getElementById('AddNewSeller');
    let close = document.getElementById('SellerClose');

    add.addEventListener('click', async (e)=>{
        e.preventDefault()
        let selectedAddress = select.value;
        let ShopId = document.getElementById('ShopId').value;
        if(ShopId == ""){
            console.log("Поля не заполнены!")
            return;
        }else{
            await contractInstance.methods.PromotionToSeller(selectedAddress, ShopId).send({from: LoggedIn, gas: 10000000});
            logActions("Повышение до продавца", {
                address: selectedAddress,
                shopId: ShopId
            }, LoggedIn)
            setActionHistory(LoggedIn)
            console.log("OK")
        }
    })

    close.addEventListener('click', (e)=>{
        let PromotionToSeller = document.getElementById('PromotionToSeller');
        e.preventDefault()
        e.stopPropagation()
        PromotionToSeller.style.display = "none";
    })    
}