import { API_BASE_URL } from "../routes.mjs";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
    const registerurl = API_BASE_URL + action;
    const body = JSON.stringify(profile);
    const response = await fetch (registerurl, {
        headers: {
            "content-type": "application/json",
        },
        method,
        body,
    });
    //console.log(registerurl);
    const result = await response.json();
    alert("You are now register");
    window.location.replace("/profile/login/index.html");
    return result;
}