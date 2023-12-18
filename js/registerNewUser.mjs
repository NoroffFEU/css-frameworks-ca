import { apiBaseUrl } from "./variables.mjs";

const registerUrl = `${apiBaseUrl}/social/auth/register`;

/**
 * Fuction to register a new user
 * @param {string} url The URL to which the registration request will be sent.
 * @param {Object} data The user data to be included in the registration request.
 * @returns {Promise<Object>} The function returns a Promise, when Promise is fulfilled, it provides the parsed JSON response received from the server.
 * @example

 */
async function registerUser(url, data) {
  try {
    // Creating an object to configure the fetch request
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Converting the user data to a JSON string and including it in the request body
      body: JSON.stringify(data),
    };
    // Sending the fetch request to the specified URL with the provided data
    const response = await fetch(url, postData);
    // Parsing the response body as JSON
    const json = await response.json();
    // Returning the parsed JSON data
    return json;
  } catch (error) {
    // Handling any errors that may occur during the fetch operation
    console.log(error, "Error happened");
  }
}

// Selecting the HTML form with the id "registerForm"
const registerForm = document.querySelector("#registerForm");

/**
 * Function to handle the form submission event and register a new user.
 * @param {Event} event The form submission event
 * @return {none} This function doesent return a value
 * @example
 */
function register(event) {
  // Preventing the default form submission behavior to handle it manually
  event.preventDefault();
  // Destructuring the form elements to get values for name, email, and password
  const [name, email, password] = event.target.elements;

  // Creating a user object with the extracted values
  const user = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  console.log(user);

  // Calling the registerUser function to send the user data to the server
  registerUser(registerUrl, user);
}

// Adding an event listener to the form to call the register function on form submission
registerForm.addEventListener("submit", register);
