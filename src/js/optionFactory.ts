interface endpointObject {
  register: string;
  login: string;
  baseUrl: string;
  profileOneUser: string;
  profileOneUserAllEnabled: string;
  profileAllUsers: string;
  follow: string;
  unfollow: string;
  postsByOneUser: string;
  changeMedia: string;
  allPostsFollowed: string;
  createPost: string;
  getId: Function;
  react: Function;
  getToken: Function;
}

type htmlMethod = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";

/**
 * Generates an options object for an HTTP request.
 *
 * @function
 * @param {htmlMethod} method - The HTTP method for the request.
 * @param {{}} body - The request body.
 * @param {endpointObject} endpointObject - An object containing API endpoints and related functions.
 *
 * @returns {{ method: htmlMethod; headers: { Authorization: string; "Content-type": string }; body?: {}; }}
 * An object containing the request method, headers, and (if present) the request body.
 *
 * @example
 *
 * const options = optionFactory("POST", { key: "value" }, endpointConfig);
 * // options will contain the method, headers, and body formatted for the request.
 */
export default function optionFactory(
  method: htmlMethod,
  body: {},
  endpointObject: endpointObject
) {
  const newObject: {
    method: htmlMethod;
    headers: { Authorization: string; "Content-type": string };
    body?: {};
  } = {
    method: method,
    headers: {
      Authorization: `Bearer ${endpointObject.getToken()}`,
      "Content-type": "application/json",
    },
  };
  if (Object.keys(body).length !== 0) {
    newObject.body = JSON.stringify(body);
  }
  return newObject;
}
