import { getAccessToken } from "./accessToken.js";
import { getUserName } from "./nameLocalStorage.js";

/**
 * Signs out user and removes all data from local storage
 */
export function signOut() {
    getAccessToken();
    getUserName();
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    window.location.href = "./index.html";
}