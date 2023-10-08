import { API_SOCIAL_URL } from "../constants.js";
import * as storage from "../storage/index.js";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
    const loginURL = API_SOCIAL_URL + action;
    console.log(loginURL);

    const body = JSON.stringify(profile);

    const response = await fetch(loginURL, {
        headers: {
            "Content-type": "application/json",
        },
        method,
        body,
    });

    const { accessToken, ...user } = await response.json();

    console.log("This is a new user logined, with an ID", user);

    storage.save("token", accessToken);
    storage.save("profile", user);

    alert("You are now logged in");
}

// const token = localStorage.getItem("token");
