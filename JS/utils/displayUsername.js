/**
 * Displays the user ID in a specified DOM element.
 * If the user ID is not available in local storage, it shows a default message.
 *
 * @function displayUsernames
 * @returns {void}
 */
export function displayUsernames() {
  const userId = localStorage.getItem('userId');
  const userNameDiv = document.querySelector('.user-name');
  if (userId) {
      userNameDiv.textContent = `${userId}`;
  } else {
      userNameDiv.textContent = 'User not logged in';
  }
  }