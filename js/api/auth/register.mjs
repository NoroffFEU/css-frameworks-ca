// DENNE ER NY

import { BASE_URL } from "../api.mjs";

const action = "auth/register";
const method = "post";

export async function register(profile){
  const registerURL = BASE_URL + action;
  const body = JSON.stringify(profile);



  const response = await fetch(registerURL, {
    headers: {
    "Content-Type": "application/json"
    },
    method,
    body
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json()

  window.location.href = "../../../profile/index.html";
  
  return result
}
