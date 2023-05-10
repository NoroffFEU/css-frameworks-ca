import { API_SOCIAL_URL } from "../constants.mjs";

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
    console.log(response.status);
    if (response.status == 201) {
        alert("Welcome! You are now registered.")
        window.location.href = "/profile/login";
    } else {
        alert(json.errors[0].message)
    }


    // alert("Welcome! You are now registered.")
    // window.location.href = "/profile/login";


}
