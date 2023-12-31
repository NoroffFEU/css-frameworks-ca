export function setUserName(name) {
    localStorage.setItem("userName", name);
}

export function getUserName() {
    let userName = localStorage.getItem("userName");
    return userName;
}