import contractInstance from "../contractInstance.js";
import { logActions } from "../logActions.js";
import { setActionHistory } from "../setActionHistory.js";
const web3 = new Web3('http://127.0.0.1:8545');

export async function JobApplicationSeller(LoggedIn){
    let jobApplicationSellerWindow = document.getElementById('jobApplicationSeller');
    jobApplicationSellerWindow.style.display = "flex";

    let shopId = document.createElement('input')
    let sendApplication = document.getElementById('Applicate');
    let close = document.getElementById('jobApplicationSellerClose');
    jobApplicationSellerWindow.append(shopId)

    sendApplication.addEventListener('click', async (e)=>{
        e.preventDefault();
        let shopIdValue = web3.utils.toBN(shopId.value)
        await contractInstance.methods.jobApplicationSeller(shopIdValue).send({from: LoggedIn, gas:8000000});
        logActions("Заявка на устройство продавцом", {address: LoggedIn}, LoggedIn)
        setActionHistory(LoggedIn);
    })

    close.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        jobApplicationSellerWindow.style.display = 'none';
    })
}