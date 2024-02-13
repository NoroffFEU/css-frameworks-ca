import { addPost } from "../../api/posts/addPost.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { getToken } from "../../utils/helpers/token.js";
import { renderAddedPost } from "../../ui/renderAddedPost.js"; //do i need this?

export async function addPostHandler(postData) {
  const newPostForm = document.querySelector("#newPostForm");
  if (newPostForm) {
    newPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const newPostText = document.querySelector("#newPost").value;
      const newPostFile = document.querySelector("#formFile")
        ? document.querySelector("#formFile").files[0]
        : undefined;
      const newPostTitle = document.querySelector("#formTitle").value
        ? document.querySelector("#formTitle").value
        : "Default Title";

      const postData = {
        title: newPostTitle,
        body: newPostText,
        // media: newPostFile,
        media: newPostFile ? newPostFile : undefined,
        tags: [""],
      };

      console.log("newPostData:", postData);

      try {
        const results = await addPost(postData);
        event.target.reset();
        renderAddedPost(postData);
        messageForUser("#messageForUser", "Post added successfully", "success");
      } catch (error) {
        console.error(error);
        messageForUser("#messageForUser", "Post failed to add", "danger");
      }
    });
  }
}
