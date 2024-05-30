/**
 * Creates and configures an HTML element with the specified attributes and content.
 *
 * This function dynamically generates an HTML element with the given tag name and applies the specified CSS classes, child elements, text content, and attributes as needed. It's a versatile utility function for creating and customizing HTML elements in the DOM.
 *
 * @param {string} tagName - The HTML tag name for the element (e.g., "div", "a", "img").
 * @param {string[]} classes - An array of CSS class names to apply to the element. Set to an empty array ([]) if no classes are needed.
 * @param {HTMLElement[]} children - An array of child elements to append to the element. Set to an empty array ([]) if no child elements are needed.
 * @param {string} text - The text content to set within the element. Set to an empty string ("") if no text content is needed.
 * @param {string} link - The URL to set as the "href" attribute (for anchor elements). Set to an empty string ("") if not applicable.
 * @param {string} src - The source URL for an image element. Set to an empty string ("") if not applicable or if the tag name is not "img."
 * @param {string} alt - The alt text for an image element. Set to an empty string ("") if not applicable or if the tag name is not "img."
 * @returns {HTMLElement} - The configured HTML element.
 *
 * @example
 * // Example usage:
 * const divElement = createElement("div", ["container", "mx-auto"], [], "This is a div element.");
 * const anchorElement = createElement("a", ["btn", "btn-primary"], [], "Click Me", "https://example.com");
 * const imgElement = createElement("img", [], [], "", "https://example.com/image.jpg", "An example image");
 *
 *
 */

export const createElement = (tagName, classes, children, text, link, src, alt) => {
  const element = document.createElement(tagName);

  if (Array.isArray(classes) && classes) {
    element.classList.add(...classes);
  }

  if (Array.isArray(children) && children.length) {
    element.append(...children);
  }

  if (text) {
    element.innerText = text;
  }

  if (link) {
    element.href = link;
  }

  if (tagName === "img") {
    element.src = src;
    element.alt = alt;
  }

  return element;
};
