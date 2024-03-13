import { NN_BASE, NN_AUTH, NN_REGISTER } from './constants.js'; 

export async function registerUser(name, email, password) {
    const response = await fetch(NN_BASE + NN_AUTH + NN_REGISTER, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
        return await response.json();
    }

    throw new Error("Could not register the account!");
}