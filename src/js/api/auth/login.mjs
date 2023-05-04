import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const method = "post";
const action = "/auth/login";

export async function login(profile) {
  const loginUrl = API_SOCIAL_URL + action;
  console.log(loginUrl);
  const body = JSON.stringify(profile);

  const response = await fetch(loginUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const { accessToken, ...userInfo } = await response.json();

  storage.save("Token", accessToken);
  storage.save("profile", userInfo);

  alert("Welcome back! You are now logged in.");
}
