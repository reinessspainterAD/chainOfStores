import contractInstance from "../../contractInstance.js";
import { logActions } from "../../logActions.js";
import { setActionHistory } from "../../setActionHistory.js";
const web3 = new Web3('http://127.0.0.1:8545');

export async function ResignationLetter(LoggedIn){
    let resignationLetterWindow = document.getElementById('ResignationLetter');
    resignationLetterWindow.style.display = "flex";
    
    let resignate = document.getElementById('Resignate');
    let close = document.getElementById('ResignationLetterClose');

    resignate.addEventListener('click', async (e)=>{
        e.preventDefault();
        await contractInstance.methods.resignationLetter().send({from:LoggedIn, gas:9000000})
        logActions("Заявка на увольнение", {address: LoggedIn}, LoggedIn)
        setActionHistory(LoggedIn)
    })

    close.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        resignationLetterWindow.style.display = 'none';
    })
}