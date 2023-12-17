import { API_SOCIAL_URL } from "../constants.mjs";

const action = '/auth/register';
const method = 'POST';

export async function register(profile) {
  const registerURL = API_SOCIAL_URL + action;
  console.log(registerURL)
  const body = JSON.stringify(profile);
    
  const response = await fetch(registerURL, {
    headers: {
      "Content-type": "application/json",
    },
    method,
    body,
  });

  const result = await response.json();

  alert("You are now registered");
  
  window.location.replace("/profile/login/index.html");
  
  return result;
}