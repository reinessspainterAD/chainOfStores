import contractInstance from "../../contractInstance.js";
import { getUserAddresses } from "../getAddresses/getUserAddresses.js";
import { logActions } from "../../logActions.js";
import { setActionHistory } from "../../setActionHistory.js";

export async function AddingNewAdmin(LoggedIn){
    let select = document.getElementById('UserAddresses');
    let addresses = await getUserAddresses();
    addresses.forEach(async address => {
        const user = await contractInstance.methods.users(address).call();
        if(user.role != 0){
            let option = document.createElement('option'); 
            option.setAttribute('id','Option')
            option.value = address;
            option.textContent = address; 
            select.appendChild(option);
        }
    })

    let addBtn = document.getElementById('AddBtn');
    let close = document.getElementById('AddingNewAdminClose');

    addBtn.addEventListener('click', async(e)=>{
        e.preventDefault();
        let userAddresses = document.getElementById('UserAddresses').value;
        if(userAddresses == ""){
            console.log("Поля не заполнены!")
        }else{
            await contractInstance.methods.AddingNewAdmin(userAddresses).send({from: LoggedIn, gas: 5000000});
            logActions("Добавление нового админа", {
                address: userAddresses
            }, LoggedIn)
            console.log("OK")
            setActionHistory(LoggedIn)
        }
    });

    close.addEventListener('click', (e)=>{
        let addingNewAdmin = document.getElementById('AddingNewAdmin');
        e.preventDefault();
        e.stopPropagation();
        addingNewAdmin.style.display = 'none';
    })
}