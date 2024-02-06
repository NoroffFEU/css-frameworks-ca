import { get } from "../handler/storage.mjs";

export function headers() {
  const token = get("token");

  console.log('Token:', token);

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

export async function fetchToken (url, options = {}){
return fetch (url, {
  ...options,
  headers: headers(),
});
}