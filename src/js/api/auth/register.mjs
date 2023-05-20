import { API_SOCIAL_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerUrl = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(registerUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });
  const result = await response.json();
  alert(`${result.name} created account`);
  location.href = "/";
  return result;
}
