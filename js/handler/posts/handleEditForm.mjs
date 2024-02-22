import { getPost } from "../../api/posts/getPost.mjs";
import { editPostFormListener } from "./editPostFormListener.mjs";

export async function handleEditForm() {
	// get id from query string
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");

	// make sure id is present
	if (!id) {
		location.href = "/";
	}

	// get post by id
	try {
		const post = await getPost(id);
		// populate form with post data
		populateForm(post);
		// add event listener to form
		editPostFormListener();

		// handle form submission
	} catch (error) {
		console.error(error);
		// displayMessage("Error", "Failed to get post");
	}
}

function populateForm(post) {
	const { title, body, tags, id } = post;

	const form = document.querySelector("#formEdit");
	form.id.value = id;
	form.title.value = title;
	form.body.value = body;
	form.tags.value = tags.join(", ");
	// populate form with post data
}
