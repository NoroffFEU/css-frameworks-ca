import { LOGIN_URL } from "./api.js";

export async function login(userDetails) {
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userDetails),
	};

	const response = await fetch(LOGIN_URL, options);
	const json = await response.json();

	console.log(response);

	if (response.ok) {
		return json;
	}

	throw new Error(json.errors[0].message);
}
