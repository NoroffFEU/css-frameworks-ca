import { createElement } from "../render/createHtml/createHtmlFunction.js";

/**
 * Creates and displays a message for the user based on the login and register form
 *
 * @param {string} container - selects container by class name for the function to use,.
 * @param {string} message - contains the message text the function will display for the user
 * @param {string} color - class name that will determine the color theme of the message
 *
 * @example
 * displayMessage("login", "Wrong userName or password", "danger")
 */
export const displayMessage = (container, message, color) => {
  const messageContainer = document.querySelector(`.${container}-msg`);
  messageContainer.replaceChildren();
  messageContainer.classList.add("border", `border-${color}`, "p-1");
  const paragraph = createElement("p", ["fw-bold", `text-${color}`, "m-0"], undefined, message);

  messageContainer.appendChild(paragraph);
};
