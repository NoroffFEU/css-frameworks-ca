import { load } from "./accessToken.mjs";

export function headers() {
    const token = load("token");
    return {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
    }
}

export async function authFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: headers()
    });
}
