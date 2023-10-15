import { API_SOCIAL_URL } from "../constants.js";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
    const registerURL = API_SOCIAL_URL + action;
    console.log("This is the URL we post our registered user details to:", registerURL);

    const body = JSON.stringify(profile); //turn our object into a string

    const response = await fetch(registerURL, {
        headers: {
            "Content-type": "application/json", //need headers cause were using JSON. We tell the server: Expect JSON
        },
        method,
        body,
    });

    const result = await response.json();
    console.log("User oficially registered on the API (has now ID)", result);
    alert("You are now registered");
    return result;
}
