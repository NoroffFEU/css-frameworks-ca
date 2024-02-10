import { getSingleProfilePost } from "../../api/posts/getSingleProfilePost.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderSingleProfilePost } from "../../ui/renderSingleProfilePost.js";

export async function displaySinglePostHandler() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
      throw new Error("Sorry, we couldn't find the post you're looking for.");
    }

    const post = await getSingleProfilePost(id);

    if (post) {
      document.title = `Vib'n | ${post.title}`;
      renderSingleProfilePost("#post", post);
    }
  } catch (error) {
    console.log(error);
    messageForUser("#post", "danger", error.message);
  }
}
