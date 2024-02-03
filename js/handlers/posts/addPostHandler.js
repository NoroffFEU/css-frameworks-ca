import { addPost } from "../../api/posts/addPost.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderAddedPost } from "../../ui/renderAddedPost.js";

export async function addPostHandler(postData) {
  document.querySelector("#newPostForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const newPost = await addPost(postData);
      renderAddedPost(newPost);
    } catch (error) {
      console.log(error);
      messageForUser("#postsContainer", "danger", error.message);
    }
  });
}
