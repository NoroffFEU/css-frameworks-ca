import { fetchLocalStorage } from "../localStorage/localStorage.js";

const token = fetchLocalStorage("token");

/**
 * Makes an asynchronous API request to the specified URL with the given method and data.
 *
 * This function sends an request to the provided URL using the specified method (e.g., "get," "post," "put," "delete") and includes optional data in the request body. It also handles the authorization header and provides the option to exclude the "Content-type" header. The response is expected to be in JSON format, and the function returns the parsed JSON result.
 *
 * @async
 * @param {string} url - The URL to send the API request to.
 * @param {string} method - The HTTP method for the request (e.g., "get," "post," "put," "delete").
 * @param {string|Object|null} data - Optional data to include in the request body. Set to null if not needed.
 * @param {boolean} noBody - Whether to exclude the "Content-type" header and request body (true) or include them (false).
 * @returns {Array | Object} - A Promise that resolves with the parsed JSON response or rejects with an error.
 *
 * @example
 * // Example usage:
 * const apiUrl = "https://api.example.com/data";
 * const requestMethod = "get";
 * const requestData = { key: "value" };
 * const includeBody = false;
 * const response = await apiCall(apiUrl, requestMethod, requestData, includeBody);
 */
export const apiCall = async (url, method, data, noBody) => {
  const authorization = ` bearer ${token}`;

  const fetchOptions = {
    method: method,

    headers: {
      "Content-type": "application/json",
      Authorization: authorization,
    },

    body: data,
  };

  if (noBody) {
    delete fetchOptions.headers["Content-type"];
  }

  try {
    const response = await fetch(url, fetchOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
