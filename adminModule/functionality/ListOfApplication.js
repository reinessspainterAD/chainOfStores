// import { BigNumber } from 'bignumber.js';
import contractInstance from "../../contractInstance.js";
const web3 = new Web3('http://127.0.0.1:8545');
import { logActions } from "../../logActions.js";
import { setActionHistory } from "../../setActionHistory.js";
export async function ListOfApplication(LoggedIn){
    let div = document.getElementById('ListOfApplications')
    const applicationCount = await contractInstance.methods.getApplicationCount().call()
    
    for(let i = 0; i<applicationCount; i++){
        const applications = await contractInstance.methods.applications(i).call()
        const users = await contractInstance.methods.users(applications.fromWhom).call()
        let innerDiv = document.createElement('div')
        innerDiv.setAttribute('id','InnerDiv')
        let fromWhom = document.createElement('p')
        let request = document.createElement('p')
        let considered = document.createElement('p')
        let shopId = document.createElement('p')
        

        fromWhom.textContent = applications.fromWhom;
        request.textContent = applications.request;
        considered.textContent = applications.considered;
        shopId.textContent = applications.shopId;

        if(users.role == 1 && applications.considered == false){
            let button = document.createElement('button')
            button.textContent = 'Уволить';
            innerDiv.append(button)
            button.addEventListener('click', async ()=>{
                await contractInstance.methods.DemoteSeller(applications.fromWhom).send({from: LoggedIn, gas: 5000000});
                logActions("Понижение продавца", {
                    address: applications.fromWhom
                }, LoggedIn)
                setActionHistory(LoggedIn)
                console.log("OK")
                button.style.display = 'none'
                innerDiv.removeChild(button);
            })
        }else if(users.role == 2 && applications.considered == false){
            let button = document.createElement('button')
            button.textContent = 'Повысить';
            innerDiv.append(button)
            button.addEventListener('click', async ()=>{
                await contractInstance.methods.PromotionToSeller(applications.fromWhom, applications.shopId).send({from: LoggedIn, gas: 10000000});
                logActions("Повышение до продавца", {
                    address: applications.fromWhom,
                    shopId: applications.shopId
                }, LoggedIn)
                setActionHistory(LoggedIn)
                console.log("OK")
                button.style.display = 'none'
                innerDiv.removeChild(button);
            })
        }
        
        // async function updateValues(){
        //     // await ListOfApplication(LoggedIn); // Вызываем функцию обновления списка приложений
        //     // setActionHistory(LoggedIn); // Обновляем историю действий
        // }
        

        innerDiv.append(fromWhom, request, considered, shopId)
        div.append(innerDiv)
        
    }
}