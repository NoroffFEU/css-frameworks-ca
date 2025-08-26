/**
 * Displays a message to the user.
 *
 * It takes a parent selector, a message type, and a message.
 * It finds the parent element using the provided selector and sets its innerHTML to a div containing the message.
 * The div's class is set to "alert alert-{messageType}".
 * If no element is found with the provided selector, it logs an error message to the console.
 *
 * @param {string} parent - The selector of the parent element where the message will be displayed.
 * @param {string} messageType - The type of the message. This will be used as a class for the message div.
 * @param {string} message - The message to be displayed.
 */

export function messageForUser(parent, messageType, message) {
  const container = document.querySelector(parent);

  if (container) {
    container.innerHTML = `<div class="alert alert-${messageType}">${message}</div>`;
  } else {
    console.error(`No element found with the selector "${parent}"`);
  }
}
