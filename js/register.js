import { API_BASE_URL } from "./const.mjs";

/**
 * Registers a new user by sending a POST request to the specified URL with user data.
 *
 * @param {string} url - The URL to send the registration request to.
 * @param {object} userData - The user data including name, email, and password.
 * @returns {void}
 */

async function registerUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    // console.log(response);
    const json = await response.json();
    if (response.ok) {
      window.location.href = "index.html";
    }
    // console.log(json);
  } catch (error) {
    console.log(error);
  }
}

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;

    const userData = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    const registerUrl = `${API_BASE_URL}social/auth/register`;
    await registerUser(registerUrl, userData);
  });
