import { load } from "../storage/index.mjs";
import { showMessage } from "../utils/messages.mjs";

export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function authFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    showMessage("Failed to fetch data. Please try again.");
    throw new Error("Failed to fetch data. Please try again.");
  }
}
