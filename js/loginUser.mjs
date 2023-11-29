import { apiBaseUrl } from "./script.mjs";

// Define the login URL
const loginUrl = "/social/auth/login";

/**
 * Function to login an existing user 
 * @param {string} url The URL to which the login request will be sent.
 * @param {Object} data The user data to be included in the login request.
 * @returns {Promise<Object>} The function returns a Promise, when Promise is fulfilled, it provides the parsed JSON response recieved from the server.
 * @example
 * 
 */
async function loginUser(url, data) {
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
    // Storing the accessToken into local storage
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);

    // Returning the parsed JSON data
    return json;
  } catch (error) {
    // Handling errors that may occur during the fetch operation
    console.log(error, "An error occurred!");
  }
}

//Selecting the HTML form with the id "loginForm"
const loginForm = document.querySelector("#loginForm");
/**
 * Function to handle the form submission and initiates the logion process.
 * @param {Event} event The form submission event
 * @example
 */
function login(event) {
  // Preventing default form submission bahaviour to handle it manually
  event.preventDefault();
  // Destructuring the form elements to get value for email and password
  const [email, password] = event.target.elements;

  // Creating a user object with the extracted values
  const user = {
    email: email.value,
    password: password.value,
  }

  // Calling the loginUser function to send the user data to the server
  loginUser(`${apiBaseUrl}${loginUrl}`, user);

}

// Adding an event listner to the form to call the loginUser function on form submission
loginForm.addEventListener("submit", login);