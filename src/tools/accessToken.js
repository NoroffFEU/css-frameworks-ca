export function setAccessToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
}

export function getAccesToken(accessToken) {
    let accessToken = localStorage.getItem("accessToken");
}
