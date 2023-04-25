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

  const { accessToken, ...userProfile } = await response.json();

  storage.save("token", accessToken);

  storage.save("profile", userProfile);
}
