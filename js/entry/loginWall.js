import { fetchLocalStorage } from "../localStorage/localStorage.js";
import { createElement } from "../render/createHtml/createHtmlFunction.js";

const feedAnchorTag = document.querySelector(".feed-anchorTag");
const profileAnchorTag = document.querySelector(".profile-anchorTag");
const msgContainer = document.getElementById("msg-container");

/**
 * Checks if user has logged in, and  if user is logged in, grants user access to feed and profile page.
 *
 * This function checks for the users name in local storage.  if  name does not exist, the user has not logged in.  and the links to feed and profile page will take the user to the login form
 *
 * @example usage:
 * checkIfLoggedIn()
 */
export const checkIfLoggedIn = () => {
  const name = fetchLocalStorage("name");

  if (!name) {
    profileAnchorTag.href = "#log-in_section";
    feedAnchorTag.href = "#log-in_section";

    const msg = createElement("p", ["fw-bold", "text-primary", "text-center"], undefined, "You have not logged in yet!");
    msgContainer.append(msg);
  } else {
    const entryBtns = document.querySelector(".entryBtns");
    const loginSection = document.getElementById("log-in_section");

    entryBtns.remove();
    loginSection.remove();
  }
};
