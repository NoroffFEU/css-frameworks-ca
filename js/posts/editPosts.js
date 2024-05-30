import { fetchLocalStorage } from "../localStorage/localStorage.js";
import { apiCall } from "../api/api.js";
import { updatePostsSection } from "../utils/updatePostsContainer.js";
import { createEditModal } from "../render/createHtml/createEditModal.js";
import { apiUrls } from "../api/constant.js";
import { closeModal } from "../utils/editProfileImg.js";

/**
 * checks if the post authors name matches the logged in users name, that is stored in local storage.
 * If it matches, then it will return true
 * @param {string} author - post authors name
 * @returns {void | true}
 *
 * @example
 * const name = "per" // name object from local storage
 * const author = "per" // Authors name
 *  checkEditPost("per")
 *  // if author === name
 * //returns true
 */

export const checkEditPost = (author) => {
  const name = fetchLocalStorage("name");

  if (author === name) {
    return true;
  }
};

/**
 * Deletes a post with the specified ID.
 *
 * This function sends an DELETE request with the apiCall function, with the Url and request method to delete the post with the given ID. After successfully deleting the post, it updates the current page to reflect the changes.
 *
 * @async
 * @param {string} id - The ID of the post to be deleted.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const postId = "examplePostId";
 * deletePost(postId);
 */

export const deletePost = async (id) => {
  apiCall(`${apiUrls.posts_Url}/${id}`, "delete");

  updateCurrentPage();
};

/**
 * Initiates the editing of a post with the specified ID.
 *
 * This function creates an editing form for a post with the provided title, body, and media, and attaches a submit event listener to it. When the form is submitted, it triggers a function to handle the update of the post.
 *
 * @param {string} id - The ID of the post to be edited.
 * @param {string} title - The title of the post.
 * @param {string} body - The body content of the post.
 * @param {string} media - The media associated with the post.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const postId = "examplePostId";
 * const postTitle = "Example Post";
 * const postBody = "This is the content of the post.";
 * const postMedia = "https://image-url.com";
 * editPost(postId, postTitle, postBody, postMedia);
 */

export const editPost = (id, title, body, media) => {
  const form = createEditModal(title, body, media);
  form.addEventListener("submit", (e) => handlePutPost(id));
};

/**
 * Handles the submission of an edited post form for updating a post with the specified ID.
 *
 * This function prevents the default form submission behavior, extracts the updated title, body, and media from the form input elements, and then calls a function to update the post with the provided data.
 *
 * @param {string} id - The ID of the post to be updated.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const postId = "examplePostId";
 * handlePutPost(postId);
 */
const handlePutPost = (id) => {
  event.preventDefault();
  const [title, body, media] = event.target.elements;
  putPost(id, title, body, media);
};

/**
 * Updates a post with the specified ID using the provided data.
 *
 * This function sends an  PUT request to update the post with the given ID using the provided title, body, and media data. It handles errors, closes the edit post modal , and updates the current page upon a successful update.
 *
 * @async
 * @param {string} id - The ID of the post to be updated.
 * @param {HTMLInputElement} title - The input element containing the updated title.
 * @param {HTMLInputElement} body - The input element containing the updated body content.
 * @param {HTMLInputElement} media - The input element containing the updated media Url.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const postId = "examplePostId";
 * const updatedTitleInput = title // value of the title input
 * const updatedBodyInput = body  // value of the body  textarea
 * const updatedMediaInput = media // value of the media input
 * putPost(postId, updatedTitleInput, updatedBodyInput, updatedMediaInput);
 */

const putPost = async (id, title, body, media) => {
  try {
    const data = JSON.stringify({
      title: title.value,
      body: body.value,
      media: media.value,
    });

    const { errors } = await apiCall(apiUrls.posts_Url + `/${id}`, "put", data);
    if (errors) {
      closeModal();
      alert(`Ups, something went wrong 
      ${errors[0].message}`);
    }

    closeModal();

    updateCurrentPage();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Updates the current page's content based on its URL.
 *
 * This function determines the current page by checking the URL and updates the content accordingly. If the URL contains '/feed/', it updates the posts section using the apiCall function ; if it contains '/profile/', it updates the posts section with profile-specific posts.
 *
 *
 *
 * @example
 * // Example usage:
 * updateCurrentPage();
 */

const updateCurrentPage = () => {
  const currentPage = location.href;
  if (currentPage.match(`/feed/`)) {
    updatePostsSection("posts", apiUrls.posts_Parameter);
  } else if (currentPage.match(`/profile/`)) {
    updatePostsSection("posts", apiUrls.profile_Posts_Parameter);
  }
};
