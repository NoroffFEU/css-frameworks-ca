import { API_SOCIAL_URL } from "../constants.js";

const method = "post";
const action = "/auth/register";

export async function register(profile) {
    const registerUrl = API_SOCIAL_URL + action;
    // console.log(registerUrl);
    const body = JSON.stringify(profile);

    const response = await fetch(registerUrl, {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
        body
    })
    
    const json = await response.json();
 
    if (response.ok) {
        return json;
        // window.location.href = "/profile/login";
    } 
    throw new Error(json.errors[0].message);

    // alert("Welcome! You are now registered.")
    // window.location.href = "/profile/login";
}
