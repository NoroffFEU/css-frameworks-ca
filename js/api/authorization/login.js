const baseUrl = "https://api.noroff.dev/api/v1/";
export const loginUrl = `${baseUrl}social/auth/login`;
// import { loginUrl } from "../constants/api";

export async function loginUser(userDetails) {
  const options = {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(loginUrl, options);

  const json = await response.json();

  if (response.ok) {
    return json;
  }
  throw new Error(json.errors[0].message);
}
