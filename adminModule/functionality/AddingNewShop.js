import contractInstance from "../../contractInstance.js";
import { logActions } from "../../logActions.js";
import { setActionHistory } from "../../setActionHistory.js";
const web3 = new Web3('http://127.0.0.1:8545');


export async function AddingNewShop(LoggedIn){
	let addNewShopWindow = document.getElementById('AddingNewShop');
    addNewShopWindow.style.display = "flex";
    let select = document.getElementById('ShopAddresses');
    web3.eth.getAccounts().then( accounts =>{
        console.log(accounts)
        accounts.forEach(async acc => {
            const user = await contractInstance.methods.users(acc).call();
            if(user.role == 0 && user.role == 1 && user.role == 2){
                console.log("!!")
            }else{
				let option = document.createElement('option'); 
                option.setAttribute('id','AddressOption')
                option.value = acc;
                option.textContent = acc;
                select.appendChild(option); 
			}
        });
    })
	let add = document.getElementById('ShopAdd');
	let close = document.getElementById('AddingNewShopClose'); 

	add.addEventListener('click', async(e)=>{
        e.preventDefault();
        let shopAddresses = document.getElementById('ShopAddresses').value;
		let shopCity = document.getElementById('ShopCity').value;
		let shopAddress = document.getElementById('ShopAddress').value;
        if(shopAddresses, shopCity, shopAddress  == ""){
            console.log("Поля не заполнены!")
        }else{
            await contractInstance.methods.AddingShop(shopAddresses, shopCity, shopAddress).send({from: LoggedIn, gas: 5000000})
            logActions("Добавление нового магазина", {
                address: shopAddresses,
                city: shopCity,
                actAddress: shopAddress
            }, LoggedIn)
            setActionHistory(LoggedIn)
            console.log("OK")
        }
    });

	close.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        addNewShopWindow.style.display = 'none';
    })
}