/**
 * Displays a message in a specified container.
 *
 * @param {string} container - The CSS selector of the container to display the message in.
 * @param {string} messageType - The type of the message, used to style the message.
 * @param {string} message - The message to display.
 */

export function displayMessage(container, messageType, message) {
  const parent = document.querySelector(container);

  parent.innerHTML = `<div class="alert alert-${messageType}">${message}</div>`;
}
