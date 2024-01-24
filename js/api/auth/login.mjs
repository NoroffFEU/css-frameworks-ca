import { BASE_URL } from "../api.mjs";


export async function login(profile) {
	const method = "POST";
	const loginURL = `${BASE_URL}auth/login`;
	const body = JSON.stringify(profile);

	const response = await fetch(loginURL, {
		headers: {
			"Content-Type": "application/json",
		},
		method,
		body,
	});

	const json = await response.json();

	if (response.ok === false) {
		throw new Error(json.errors[0].message);
	}

	return json;

}

