import { apiPath } from "../const";

/**
 * Logs in a user. Saves accessToken in local storage.
 * 
 * @param {string} userName 
 * @param {string} password 
 * @returns object with name, email, banner, avatar & accessToken
 */
export async function registerNewUser(userName, password) {
    const response = await fetch(`${apiPath}/social/auth/login`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ userName, password }),
    });

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);

    if (response.ok) {
        return data;
    }

    throw new Error(JSON.stringify(data));
}