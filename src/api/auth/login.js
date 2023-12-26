import { apiPath } from "../const.js";
import { setAccessToken } from "../../tools/accessToken.js";

/**
 * Logs in a user. Saves accessToken in local storage.
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns object with name, email, banner, avatar & accessToken
 */
export async function loginUser(email, password) {
    const response = await fetch(`${apiPath}/social/auth/login`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    //localStorage.setItem("accessToken", data.accessToken);
    setAccessToken(data.accessToken);

    if (response.ok) {
        return data;
    }

    throw new Error(JSON.stringify(data));
}