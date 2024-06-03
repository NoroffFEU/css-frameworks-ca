import { API_SOCIAL_URL, API_AUTH, API_REGISTER } from "../constants.mjs";

const method = "post";
const action = "/auth/register";


export async function registerUser(profile){
    const registerUrl = `${API_SOCIAL_URL}${API_AUTH}${API_REGISTER}`;
    const body = JSON.stringify(profile);

    const response = await fetch(registerUrl, {
        headers: {
            "Content-Type": "application/json",
        },
        method,
        body,
    });
    
    const result = await response.json();
    alert("You are now registered. Please log in to your account.")
    window.location.href = "/profile/login/"
  
    return result;
}
