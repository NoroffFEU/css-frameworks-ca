import { createPost, updatePost } from "../../api/posts/index.mjs";
import { displayMessage } from "../../ui/displayMessage.mjs";

export function editPostFormListener() {
	const form = document.querySelector("#formEdit");

	if (form) {
		form.addEventListener("submit", async (event) => {
			event.preventDefault();
			const form = event.target;
			const formData = new FormData(form);
			const post = Object.fromEntries(formData.entries());

			post.tags = post.tags.split(",").map((tag) => tag.trim());
			console.log(post);

			try {
				await updatePost(post);
				displayMessage("#message", "success", "You have successfully edited the post.");
			} catch (error) {
				console.log();
				displayMessage("#message", "danger", "Please log in to create a post.");
			}
		});
	}
}
