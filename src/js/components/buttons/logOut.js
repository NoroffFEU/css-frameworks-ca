import { clear } from "../../api/storage/clear.js";

export function logOut() {
    const logOutBtn = document.getElementById('logOutBtn');


    logOutBtn.addEventListener('click', async => {
        clear("token");
        clear("profile");
    })
}