import { updatePostsSection } from "../utils/updatePostsContainer.js";
import { apiUrls } from "../api/constant.js";
import { apiCall } from "../api/api.js";

/**
 * Handles the submission of a new post form, preventing the default behavior and invoking the function to submit a new post.
 *
 * This function is  called when a user submits a form for creating a new post. It prevents the default form submission behavior, extracts the title, body, and URL (if applicable) from the form input elements, and then calls a function to submit the new post with the provided data.
 *
 * @param {Event} event - The event object associated with the form submission.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const formElement = document.getElementById("postForm");
 * formElement.addEventListener("submit", (event) => HandleSubmitPost(event));
 */
export const HandleSubmitPost = (event) => {
  event.preventDefault();

  const [title, body, url] = event.target.elements;
  submitPost(title, body, url);
};

/**
 * Submits a new post with the provided title, body, and media (if any).
 *
 * This function sends an  POST request to create a new post using the provided title, body, and media data. It handles errors, updates the posts section, and provides feedback to the user.
 *
 * @async
 * @param {HTMLInputElement} title - The input element containing the post title.
 * @param {HTMLInputElement} body - The input element containing the post body content.
 * @param {HTMLInputElement} media - The input element containing the media information for the post (if applicable).
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const titleInput = input element containing the title
 * const bodyInput = textarea containing the post body
 * const mediaInput = input element containing image url
 * submitPost(titleInput, bodyInput, mediaInput);
 */
const submitPost = async (title, body, media) => {
  try {
    const data = JSON.stringify({
      title: title.value,
      body: body.value,
      media: media.value,
    });
    const { errors } = await apiCall(apiUrls.posts_Url, "post", data);
    if (errors) {
      console.log(errors);
      alert(`Ops something went wrong :(    ${errors[0].message} `);
    }
    updatePostsSection("posts", apiUrls.posts_Parameter);
  } catch (error) {
    console.log(error);
    alert(`Ups something went wrong, ${error}`);
  }
};
