import { getSinglePost } from "../../api/posts/getSinglePost.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderSinglePost } from "../../ui/renderSinglePost.js";

export async function displaySinglePostHandler() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
      throw new Error("Sorry, we couldn't find the post you're looking for.");
    }

    const post = await getSinglePost(id);

    if (post) {
      document.title = `Vib'n | ${post.title}`;
      renderSinglePost("#post", post);
    }
  } catch (error) {
    console.log(error);
    messageForUser("#post", "danger", error.message);
  }
}
