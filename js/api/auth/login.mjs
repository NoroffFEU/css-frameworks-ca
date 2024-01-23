// DENNE ER NY

import { BASE_URL } from "../api.mjs";
import * as storage from "../../handler/storage.mjs";


const action = "auth/login";

const method = "post";

export async function login(profile){
  
  const loginURL = BASE_URL + action;

  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
    "Content-Type": "application/json"
    },
    method,
    body
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { accessToken, ...userProfile} = await response.json()

	storage.save("token", accessToken)
	storage.save("profile", userProfile)

  window.location.href = "/feed/index.html";

}

