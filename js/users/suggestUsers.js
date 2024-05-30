import { createElement } from "../render/createHtml/createHtmlFunction.js";
import { changeSearchElements } from "../utils/changeSearchElements.js";
import { displayUsers } from "./displayUsers.js";
import { getQueryParamId } from "../utils/queryParam.js";

/**Checks the array from API and triggers the appropriate function
 *
 * This function checks the array returned from the API, based on if the array is empty it will suggest profiles for the user to follow and display the provided text in a message, or if the arrays contains objects it will render the result in the appropriate function
 *
 * @param {array} users - array of users, or posts
 * @param {function} renderFunction - Render function for users or posts
 * @param {string} text - text to be display to the user
 * @returns
 *
 * @example
 * // Example usage
 *
 * const array = [{post1}, {post2}]
 * const renderFunction = renderPosts()
 * const text = "Do not follow anybody yet"
 * checkResult(array, renderFunction, text)
 *
 * //Result: RenderPosts(array)
 */

export const checkResult = (array, renderFunction, text) => {
  if (array.length <= 0) {
    suggestUsers(text);
    return;
  } else {
    renderFunction(array);
  }
};
/**
 * Displays a message to the user, and render other profiles the user can follow
 *
 * This function creates a message for the user with the given text, displays profiles for the user to follow, and short time after changes the search elements
 *
 * @param {string} text
 *
 * @example
 * //Example usage
 * SuggestUsers("do not follow anybody yes")
 */
export const suggestUsers = async (text) => {
  const container = document.getElementById("posts-container");
  const msg = createMsg(text);
  container.append(msg);
  displayUsers();

  setTimeout(() => {
    changeSearchElements();
  }, 200);
};

/**
 * Creates a message element with a specified text
 *
 * This function creates a message element that includes a header with  the profiles name  and the provided text, an introductory paragraph, and additional elements as needed. It's used for displaying informative messages to users on the page.
 *
 * @param {string} text - The main text for the message.
 * @returns {HTMLElement} - The created message element.
 *
 * @example
 * // Example usage:
 * const message = createMsg("do not follow anybody yes");
 * //returns HTML elements with header text = "Ola do not follow anybody yet"
 */

const createMsg = (text) => {
  const element = createElement("div");
  const msgName = createTextName();
  const header = createElement("h5", ["text-primary", "text-center", "fw-bold"], undefined, `${msgName} ${text}`);
  const paragraph = createElement("p", ["text-primary", "text-center"], undefined, `Find your new friends below:`);
  element.append(header, paragraph);
  return element;
};

const createTextName = () => {
  const id = getQueryParamId();
  let name = "You";
  if (id) {
    name = id;
  }
  return name;
};

/**
 * Creates a text name based on the user's ID or a default "You" if no ID is provided.
 *
 * This function generates a text name for use in messages or greetings. If a user's ID is available (from a query parameter), it uses that name; otherwise, it defaults to "You."
 *
 * @returns {string} - The generated text name.
 *
 * @example
 * // Example usage:
 * const name = createTextName();
 * // returns "You" or the users name
 */
