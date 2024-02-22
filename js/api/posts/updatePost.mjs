import { BASE_URL } from "../api.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "posts";
const method = "PUT";

export async function updatePost(postData) {
	const updatePostURL = `${BASE_URL}${action}/${postData.id}`;

	console.log("Update Post URL:", updatePostURL);

	const response = await fetchToken(updatePostURL, {
		method,
		body: JSON.stringify(postData),
	});

	return await response.json();
}
