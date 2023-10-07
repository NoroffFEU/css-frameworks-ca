import { API_SOCIAL_URL } from "../constants.js";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
    const registerURL = API_SOCIAL_URL + action;
    console.log(registerURL);

    const body = JSON.stringify(profile);

    const response = await fetch(registerURL, {
        headers: {
            "Content-type": "application/json",
        },
        method,
        body,
    });

    const result = await response.json();
    console.log("This is a new user registered, with an ID", result);
}
