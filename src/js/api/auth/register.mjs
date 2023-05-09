import { BASE_API_URL } from "../constant.mjs";

export async function register (profile, action, method){
    const registerUrl = BASE_API_URL + action;
    console.log(registerUrl);
}