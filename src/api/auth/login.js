import { apiPath } from "../const";

export async function registerNewUser(name, password) {
    const response = await fetch(`${apiPath}/social/auth/login`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ name, password }),
    });

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);

    if (response.ok) {
        return data;
    }

    throw new Error(JSON.stringify(data));
}