import contractInstance from "../../contractInstance.js";
import { logActions } from "../../logActions.js";
import { setActionHistory } from "../../setActionHistory.js";
const web3 = new Web3('http://127.0.0.1:8545');

export async function AddNewUser(LoggedIn){
    let select = document.getElementById('Addresses')
    web3.eth.getAccounts().then( accounts =>{
        accounts.forEach(acc => {
            let option = document.createElement('option'); 
            option.setAttribute('id','AddressOption')// Создать новый option элемент
            option.value = acc; // Установить значение адреса для option
            option.textContent = acc; // Сделать адрес видимым значением в dropdown 
            select.appendChild(option); // Добавить option элемент в select
       });
    }).catch(error => {
        console.error('Произошла ошибка:', error);
    });

    let add = document.getElementById('addNewUserBtn');
    let close = document.getElementById('addNewUserClose');

    add.addEventListener('click', async (e)=>{
        e.preventDefault()
        let selectedAddress = Addresses.value;
        let name = document.getElementById('addNewUserName').value;
        let login = document.getElementById('addNewUserLogin').value;
        if(selectedAddress, name, login == ""){
            console.log("Поля не заполнены!");
            return;
        }else{
            await contractInstance.methods.addUser(selectedAddress, name, login).send({from: LoggedIn, gas: 5000000});
            logActions("Добавление нового пользователя", {
                address: selectedAddress,
                name: name,
                login: login
            }, LoggedIn);
            setActionHistory(LoggedIn)

            console.log('OK')
        }
        
    })

    close.addEventListener('click', (e)=>{
        let addNewUser = document.getElementById('addNewUser');
        e.preventDefault()
        e.stopPropagation()
        addNewUser.style.display = "none";
    })
}