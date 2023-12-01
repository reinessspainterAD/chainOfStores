import contractInstance from "../contractInstance.js";
import { logActions } from "../logActions.js";
import { setActionHistory } from "../setActionHistory.js";
const web3 = new Web3('http://127.0.0.1:8545');

export async function WriteComment(LoggedIn){
    let writeCommentWindow = document.getElementById('WriteComment');
    writeCommentWindow.style.display = "flex";
    
    let sendComment = document.getElementById('SendComment');
    let close = document.getElementById('WriteCommentClose');

    sendComment.addEventListener("click", async (e)=>{
        e.preventDefault()
        let reviewID = Number(document.getElementById('ReviewID').value);
        let commentReview = document.getElementById('WriteCommentReview').value;
        let like = document.getElementById('Like').value;
        if(reviewID, commentReview, like == ""){
            console.log("Поля не заполнены")
        }else{
            await contractInstance.methods.writeComment(reviewID, commentReview, like).send({from: LoggedIn, gas:9000000})
            logActions("Написание комментария", {reviewID: reviewID, commentReview: commentReview, like:like}, LoggedIn);
            setActionHistory(LoggedIn);
        }
    })
    close.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        writeCommentWindow.style.display = 'none';
    })
}