import { renderProfilePosts } from "../../templates/index.mjs";
import * as postMethods from "../../api/posts/index.mjs";
import { getUserName } from "../storage.mjs";
import { removePostsHandler } from "./removePostsHandler.mjs";

export async function displayProfilePostHandler() {
	const username = getUserName();

	if (!username) {
		throw new Error("Username not found");
	}

	try {
		const posts = await postMethods.getProfilePosts(username);
		const container = document.querySelector("#card");

		renderProfilePosts(posts, container);
		removePostsHandler();
	} catch (error) {
		console.error(error);
		// displsyMessage("Error", "Failed to load posts");
	}
}
