import { API_SOCIAL_URL } from "../api_constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const { accessToken, ...user } = await response.json();

  storage.save("token", accessToken);
  storage.save("profile", user);
  if (accessToken) {
    setTimeout(() => {
      window.location.href = "../../../profile/index.html";
    }, 2000);
  } else {
    throw new Error("No access token provided, please register");
  }
}
