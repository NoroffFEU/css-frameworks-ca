const baseUrl = "https://api.noroff.dev/api/v1/";
export const registerUrl = `${baseUrl}social/auth/register`;
// import { registerUrl } from "../../constants/api";

export async function registerUser(userDetails) {
  const options = {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(registerUrl, options);

  const json = await response.json();

  if (response.ok) {
    return json;
  }
  throw new Error(json.errors[0].message);
}
