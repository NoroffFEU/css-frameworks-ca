import { BASE_URL } from "../api.mjs";

const action = "auth/register";
const method = "POST";

export async function register(profile){
  const registerURL = BASE_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(registerURL, {
    headers: {
    "Content-Type": "application/json"
    },
    method,
    body,
  });

  const result = await response.json()

  if (!response.ok) {
    throw new Error(`Please try again. ${result.errors[0].message}.`);
  }
  
  return result
}
