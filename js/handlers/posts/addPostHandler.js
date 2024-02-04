import { addPost } from "../../api/posts/addPost.js";
import { messageForUser } from "../../ui/messageForUser.js"; //do i need this?
import { renderAddedPost } from "../../ui/renderAddedPost.js"; //do i need this?

export async function addPostHandler(postData) {
  const newPostForm = document.querySelector("#newPostForm");
  if (newPostForm) {
    newPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const newPostText = document.querySelector("#newPost").value;
      const newPostFile = document.querySelector("#formFile").files[0];
      const newPostTitle = document.querySelector("#formTitle").value;

      const newPostData = {
        title: newPostTitle,
        body: newPostText,
        media: newPostFile,
        tags: [""],
      };

      console.log("newPostData:", newPostData);

      try {
        await addPost(newPostData);
        event.target.reset();
      } catch (error) {
        console.error(error);
      }
    });
  }
}
