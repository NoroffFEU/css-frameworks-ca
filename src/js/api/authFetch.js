import { load } from "./storage/index.js";

export function headers() {
    const token = load("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function authFetch(url, options) {
    return fetch(url, {
        ...options, //spread everything we are getting provided from postData
        headers: headers(),
    });
}
