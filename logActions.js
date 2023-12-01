import actions from "./actions.js";

export function logActions (type, details, LoggedIn){
    let action = {
        type: type,
        details: details
    };
    actions.push(action);
    saveActionsToLocalStorage(LoggedIn, actions)
    console.log(actions)
}

export function saveActionsToLocalStorage(key, newActions) {
    const storedActions = JSON.parse(localStorage.getItem(key)) || [];
    const updatedActions = [...storedActions, ...newActions];
    // localStorage.removeItem(key)
    localStorage.setItem(key, JSON.stringify(updatedActions));
}


export function getActionsFromLocalStorage(key) {
    const storedActions = JSON.parse(localStorage.getItem(key));
    return storedActions || [];
}
