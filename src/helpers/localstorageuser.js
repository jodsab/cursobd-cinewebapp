const USERNAME = "usernameCine"

export function setCurrentUser(user){
    localStorage.setItem(USERNAME, user)
}

export function getCurrentUser(){
    return localStorage.getItem(USERNAME)
}

export function deleteUser(){
    localStorage.removeItem(USERNAME)
}