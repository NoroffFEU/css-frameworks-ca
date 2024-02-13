import { getSingleProfilePost } from "../../api/posts/getSingleProfilePost.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderSingleProfilePost } from "../../ui/renderSingleProfilePost.js";
import { getUserName } from "../../utils/helpers/getUserName.js";
import { deletePostHandler } from "./deletePostHandler.js";

export async function displaySingleProfilePostHandler() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const userName = getUserName();

    if (!id) {
      throw new Error("Sorry, we couldn't find the post you're looking for.");
    }

    if (!userName) {
      throw new Error("User information not found");
    }

    const post = await getSingleProfilePost(id);

    if (post) {
      document.title = `Vib'n | ${post.title}`;
      renderSingleProfilePost("#post", post);
      deletePostHandler();
    }
  } catch (error) {
    console.log(error);
    messageForUser("#post", "danger", error.message);
  }
}
