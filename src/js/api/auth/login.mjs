import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

/**
 * Logs in the user by sending a login request to the social API server and retrieves the access token and saves it in the local storage.
  
 **/

export async function login(profile) {
  const loginURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "content-Type": "application/json",
    },
    method,
    body,
  });

  const result = await response.json();

  localStorage.setItem("token", result.accessToken);

  const { accessToken, ...user } = result;

  storage.save("token", result.accessToken);

  storage.save("profile", user);

  alert("You are now logged in");
}
