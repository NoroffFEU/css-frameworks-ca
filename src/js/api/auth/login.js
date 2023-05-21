import { API_SOCIAL_URL } from "../constants.js";

const method = "post";
const action = "/auth/login";

export async function login(profile) {
	const loginUrl = API_SOCIAL_URL + action;
	const body = JSON.stringify(profile);

	const response = await fetch(loginUrl, {
		headers: {
			"Content-Type": "application/json",
		},
		method,
		body,
	});

	const json = await response.json();

	if (response.ok) {
		return json;
	}
	throw new Error(json.errors[0].message);

}
