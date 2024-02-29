import { addPost } from "../../api/posts/addPost.js";
import { messageForUser } from "../../ui/messageForUser.js";

/**
 * Handles the new post form submission.
 *
 * When the form is submitted, it prevents the default form submission, retrieves the form data, and attempts to add a new post.
 * If the post is added successfully, it displays a success message to the user, resets the form, and reloads the page after 2 seconds.
 * If the post fails to add, it displays an error message to the user.
 */

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

      try {
        const results = await addPost(postData);
        messageForUser("#messageForUser", "success", "Post added successfully");
        setTimeout(() => {
          event.target.reset();
          location.reload();
        }, 2000);
      } catch (error) {
        console.error(error);
        messageForUser("#messageForUser", "danger", "Post failed to add");
      }
    });
  }
}
