import { API_SOCIAL_URL } from "../constants.js";
import * as storage from "../../storage/index.js";

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

  //  Gives user Feedback on errors
  if (response.status == 200) {
    //Save access token to localStorage
    const { accessToken, ...userInfo } = await response.json();
    storage.save("token", accessToken);
    storage.save("profile", userInfo);
    window.location.href = "/posts/index.html";

  } else {
    const json = await response.json();
    alert(json.errors[0].message);
  }
};
