import { API_BASE_URL } from "../routes.mjs";
import * as key from "../accessToken.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
    const loginurl = API_BASE_URL + action;
    const body = JSON.stringify(profile);
    const response = await fetch(loginurl, {
        headers: {
            "Content-type": "application/json",
        },
        method,
        body,
    })

    const {accessToken, ...user} = await response.json();
    key.save("token", accessToken);
    key.save("profile", user);
    alert("You are now logged in");

    window.location.replace("/posts/index.html");
}