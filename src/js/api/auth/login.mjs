import { HOST_API_URL, LOGIN_API_URL } from "../constants.mjs";

export async function login(profile) {
  const loginURL = HOST_API_URL + LOGIN_API_URL;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body,
  });

  const result = await response.json();

  localStorage.setItem("token", result.accessToken);
}
