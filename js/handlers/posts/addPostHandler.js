import { addPost } from "../../api/posts/addPost.js";
import { messageForUser } from "../../ui/messageForUser.js";

export async function addPostHandler() {
  const newPostForm = document.querySelector("#newPostForm");
  if (newPostForm) {
    newPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const newPostText = document.querySelector("#newPost").value;
      const newPostMediaUrl = document.querySelector("#formMediaUrl").value;
      const newPostTitle = document.querySelector("#formTitle").value
        ? document.querySelector("#formTitle").value
        : "Default Title";

      const postData = {
        title: newPostTitle,
        body: newPostText,
        media: newPostMediaUrl,
        tags: [""],
      };

      console.log("newPostData:", postData);

      try {
        const results = await addPost(postData);
        event.target.reset();
        messageForUser("#messageForUser", "success", "Post added successfully");
      } catch (error) {
        console.error(error);
        messageForUser("#messageForUser", "danger", "Post failed to add");
      }
    });
  }
}
