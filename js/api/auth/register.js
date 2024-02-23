import { API_AUTH, API_BASE, API_REGISTER } from "../constants.js";
import { authFetch } from "../fetch.js";

//register user function
export async function registerUser(name, email, password) {
	const response = await authFetch(API_BASE + API_AUTH + API_REGISTER, {
			method: "POST",
			body: JSON.stringify({ name, email, password }),
	});

	const data = response.json();
	console.log(data);

	if (response.ok) {
		return data;
	}

	throw new Error("Could not register the account");
}
