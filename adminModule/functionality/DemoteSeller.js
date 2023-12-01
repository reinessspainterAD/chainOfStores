import contractInstance from "../../contractInstance.js";
import { getUserAddresses } from "../getAddresses/getUserAddresses.js";
import { logActions } from "../../logActions.js";
import { setActionHistory } from "../../setActionHistory.js";

export async function DemoteSeller(LoggedIn){
    let select = document.getElementById('DemoteAddresses');
    let addresses = await getUserAddresses();
    addresses.forEach(async address => {
        let user = await contractInstance.methods.users(address).call();
        if(user.role == 1){
            let option = document.createElement('option'); 
            option.setAttribute('id','DemoteOption')
            option.value = address;
            option.textContent = address; 
            select.appendChild(option);
        }
    }); 
    let demote = document.getElementById('DemoteBtn');
    let close = document.getElementById('DemoteClose');

    demote.addEventListener('click', async (e)=>{
        e.preventDefault();
        let DemoteAddress = document.getElementById('DemoteAddresses').value;
        if(DemoteAddress == ""){
            console.log("Поля не запонены!!")
        }else{
            await contractInstance.methods.DemoteSeller(DemoteAddress).send({from: LoggedIn, gas: 5000000});
            logActions("Понижение продавца", {
                address: DemoteAddress
            }, LoggedIn)
            setActionHistory(LoggedIn)
        }
    })

    close.addEventListener('click', (e)=>{
        let demoteSeller = document.getElementById('DemoteSeller');
        e.preventDefault();
        e.stopPropagation();
        demoteSeller.style.display = 'none';
    })
}
