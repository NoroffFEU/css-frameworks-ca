import { API_SOCIAL_URL } from "../constants.mjs"

const action = "/auth/register";
const method = "post";

export async function registerApi(profile, action, method) {
    const registerURL = API_SOCIAL_URL + action;


    const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json"
        }, method,
        body: JSON.stringify(profile)
    })

    const result = await response.json()
    console.log(result)
}
