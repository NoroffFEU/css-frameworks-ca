export function setAccessToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
}

export function getAccessToken() {
    let accessToken = localStorage.getItem("accessToken");
    return accessToken;
}
