import { HOST_API_URL } from "../constants.mjs";
import { REGISTER_API_URL } from "../constants.mjs";

export async function register(profile) {
  const registerURL = HOST_API_URL + REGISTER_API_URL;
  const body = JSON.stringify(profile);

  const response = await fetch(registerURL, {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body,
  });

  const result = await response.json();
  return result;
}
