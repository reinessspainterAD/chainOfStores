import { getActionsFromLocalStorage } from "./logActions.js";
export function setActionHistory(LoggedIn){
    const div = document.getElementById('OperationHistory');
    const storedActions = getActionsFromLocalStorage(LoggedIn);
    if (storedActions) {
        storedActions.forEach(action =>{
        let actionLabel = document.createElement('label');
        actionLabel.setAttribute('id','actionLabel');
        let actionDetail = document.createElement('p');
        actionDetail.setAttribute('id','actionDetail');
        actionLabel.innerHTML = `${action.type}`;
        actionDetail.textContent = `Details: ${JSON.stringify(action.details)}`;
        div.append(actionLabel, actionDetail);
    });
    } else {
        div.textContent = 'No actions found';
    }
}


// export function setActionHistory(LoggedIn){
//     const storedActions = getActionsFromLocalStorage(LoggedIn);
//     const div = document.getElementById('OperationHistory');
//     if (storedActions) {
//         storedActions.forEach(action =>{
//         let actionLabel = document.createElement('label');
//         actionLabel.setAttribute('id','actionLabel');
//         let actionDetail = document.createElement('p');
//         actionDetail.setAttribute('id','actionDetail');
//         actionLabel.innerHTML = `${action.type}`; // Use action.type instead of storedActions.type
//         actionDetail.textContent = `Details: ${JSON.stringify(action.details)}`; // Use action.details instead of storedActions.details
//         div.append(actionLabel, actionDetail);
//     });
//     } else {
//         // Handle case where no stored actions are found
//         div.textContent = 'No actions found';
//     }
// }