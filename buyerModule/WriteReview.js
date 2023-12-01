import contractInstance from "../contractInstance.js";
import { logActions } from "../logActions.js";
// import {contractAddress} from "../contractInstance.js"
import { setActionHistory } from "../setActionHistory.js";
const web3 = new Web3('http://127.0.0.1:8545');

export function WriteReview(LoggedIn){
    let writeReviewWindow = document.getElementById('WriteReview');
    writeReviewWindow.style.display = "flex";

    let sendReview = document.getElementById('SendReview');
    let close = document.getElementById('WriteReviewClose');

    sendReview.addEventListener('click', async (e)=>{
        e.preventDefault();
        let shopId = Number(document.getElementById('ShopId').value);
        let review = document.getElementById('Review').value;
        let rating = Number(document.getElementById('Rating').value);
    
        // Check if any of the fields are empty
        if (!shopId && !review && !rating) {
            console.log("Fields are not filled!")
        } else {
            try {
                logActions("Написание отзыва", {shopId, review, rating}, LoggedIn);
                setActionHistory(LoggedIn);
                
                let receipt = await contractInstance.methods.writeReview(shopId, review, rating).send({from: LoggedIn, gas:9000000});
                console.log("Review written. Transaction receipt: ", receipt);
            } catch (error) {
                console.error("Error writing review:", error);
            }
        }
    });
    close.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        writeReviewWindow.style.display = 'none';
    })
}