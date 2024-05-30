import { apiCall } from "../api/api.js";
import { apiUrls } from "../api/constant.js";
import { createElement } from "../render/createHtml/createHtmlFunction.js";

/**
 * Creates an edit modal for user profile content.
 *
 * This function dynamically generates an edit modal for user profile content, such as profile images. It includes a form for making edits and submitting changes.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * createEditModal();
 */
export const createEditModal = () => {
  const main = document.querySelector("main");

  const element = createElement("div", ["edit-modal", "img-modal", "position-fixed", "bg-white", "p-4"]);

  const dialog = modalDialog();
  element.append(dialog);

  main.append(element);

  const form = document.querySelector(".profile-img_form");
  form.addEventListener("submit", () => handleAvatarSubmit());
};

const modalDialog = () => {
  const element = createElement("div", ["modal-dialog"]);
  const content = modalContent();
  element.append(content);
  return element;
};

const modalContent = () => {
  const element = createElement("div", ["modal-content"]);
  const header = modalHeader();
  const body = modalBody();
  element.append(header, body);
  return element;
};

const modalHeader = () => {
  const element = createElement("div", ["modal-header"]);
  const h5 = createElement("h5", ["modal-title", "text-primary"], undefined, "Paste your img url here:");
  const btn = createElement("button", ["btn-close"]);
  btn.addEventListener("click", () => closeModal());

  element.append(h5, btn);
  return element;
};

const modalBody = () => {
  const element = createElement("form", ["profile-img_form"]);
  element.action = "get";
  const input = createElement("input", ["form-control", "mt-1", "border", "border-dark", "img-input"]);
  element.type = "url";
  element.id = "exampleFormControlInput1";
  element.placeholder = "Paste your img url here";

  const btn = createElement("button", ["btn", "btn-info", "my-2"], undefined, "Post");
  btn.type = "submit";

  element.append(input, btn);
  return element;
};
/**
 * Handles the submission of a user's avatar URL update.
 *
 * This function is designed to handle the submission of a form for updating a user's avatar URL. It prevents the default form submission behavior, extracts the URL input field value, and calls the `putAvatar` function to perform the update.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const form = document.querySelector(".profile-img_form");
 * form.addEventListener("submit", () => handleAvatarSubmit());
 */
const handleAvatarSubmit = () => {
  event.preventDefault();
  const [url] = event.target.elements;
  putAvatar(url);
};

/**
 * Updates the user's avatar with the specified URL.
 *
 * This function sends a PUT request to the API to update the user's avatar with the provided URL. It prepares the request data, sends the request, and logs the response or any errors that occur during the process.
 *
 * @param {HTMLInputElement} url - The input field containing the new avatar URL.
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const avatarUrlInput = https://imgurl.com;
 * putAvatar(avatarUrlInput);
 */

const putAvatar = async (url) => {
  try {
    const data = JSON.stringify({
      media: url.value,
    });
    const response = await apiCall(apiUrls.avatar_Url, "put", data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
/**
 * Closes The The modal by removing it from the page
 *
 * @example
 * //Example usage
 * closeModal();
 */
export const closeModal = () => {
  const modal = document.querySelector(".edit-modal");
  modal.remove();
};
