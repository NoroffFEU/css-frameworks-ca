import { HOST_API_URL, LOGIN_API_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

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

  const json = await response.json();

  if (response.ok) {
    return json;
  }

  console.log(json);

  throw new Error(json.errors[0].message);
}
