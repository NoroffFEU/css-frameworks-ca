import { API_BASE_URL } from "./routes.mjs";

const registeruser = "/auth/register";
const method = "post";

async function register(profile) {
    const registerurl = API_BASE_URL + registeruser;
    const body = JSON.stringify(profile);
    const response = await fetch (registerurl, {
        headers: {
            "content-type": "application/json",
        },
        method,
        body,
    });

    const result = await response.json();
    alert("You are now register");
    window.location.replace("/profile/login/index.html");
    return result;
}