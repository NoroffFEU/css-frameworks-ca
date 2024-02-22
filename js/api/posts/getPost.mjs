import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "posts";

export async function getPost(id) {
	const getPostURL = `${BASE_URL}${action}/${id}`;

	try {
		const response = await fetchToken(getPostURL);
		const json = await response.json();

		if (!response.ok) {
			// ?? null coalescing operator
			throw new Error(json.errors[0].message ?? "Failed to get post");
		}

		document.title = `Javascript2 CA | ${json.title}`;
		return json;
	} catch (error) {
		console.error("Failed to get post:", error);
		throw error;
	}
}
