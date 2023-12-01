import contractInstance from "./contractInstance.js";
import { fillPersonalAccount } from "./fillPersonalAccount.js";
import { getActionsFromLocalStorage } from "./logActions.js";
import { setActionHistory } from "./setActionHistory.js";
const web3 = new Web3('http://127.0.0.1:8545');
let LoggedIn;

async function login(){
    let loginForm = document.getElementById('LoginForm');
    let accountInput = document.getElementById('LoginInput');
    let ValidationError = document.getElementById('ValidationError');
    const inputText = accountInput.value.trim();
    const userAddressesLength = await contractInstance.methods.getUserAddressesCount().call();
    for(let i=0; i<userAddressesLength; i++){
        const userAddress = await contractInstance.methods.userAddresses(i).call();
        const user = await contractInstance.methods.users(userAddress).call();
        if(inputText === user.login){
			console.log(userAddress)
            LoggedIn = userAddress;
            ValidationError.innerHTML = 'Success!'
            loginForm.style.display = "none"
            fillPersonalAccount(user, LoggedIn)
            document.getElementById('Address').innerHTML = `Адрес кошелька: ${userAddress}`;
            document.getElementById('Balance').innerHTML = `Баланс: ${await web3.eth.getBalance(userAddress) /10**18} ETH`;
			setActionHistory(LoggedIn);
            return;
        }else if(inputText == ''){
			ValidationError.innerHTML = 'Login cannot be empty'
		}else{
            ValidationError.innerHTML = 'This user does not exists!'
        }
    }
    
}

let button = document.getElementById('LoginBtn');
button.addEventListener('click', (e) =>{
    e.preventDefault();
    login()
});

