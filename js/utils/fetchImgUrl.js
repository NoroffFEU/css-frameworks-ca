import { createElement } from "../render/createHtml/createHtmlFunction.js";

export const fetchImgUrl = () => {
  checkImgInput();
};

/**
 * Checks and toggles the visibility of an image input field on the page.
 *
 * This function checks if an image input field with the class "img-input" is currently present on the page. If it's present, the function removes the input field, and if it's not present, it renders the image input field.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * checkImgInput();
 */

const checkImgInput = () => {
  const input = document.querySelector(".img-input");

  if (input) {
    removeImgInput(input);
    return;
  }

  renderImgInput();
};

const renderImgInput = () => {
  const container = document.getElementById("imgUrl-container");
  const input = createImgInput();
  container.append(input);
};

export const createImgInput = () => {
  const element = createElement("input", ["form-control", "mt-1", "border", "border-dark", "img-input"]);
  element.type = "url";
  element.id = "exampleFormControlInput1";
  element.placeholder = "Paste your img url here";

  return element;
};

const removeImgInput = (input) => {
  input.remove();
};
