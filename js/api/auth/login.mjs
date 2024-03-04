import { API_SOCIAL_URL } from "../api_constants.mjs";
import * as storage from "../../storage/index.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  try {
    showLoader();

    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to login: ${response.status}`);
    }

    const { accessToken, ...user } = await response.json();

    storage.save("token", accessToken);
    storage.save("profile", user);

    if (accessToken) {
      setTimeout(() => {
        window.location.href = "../../../profile/index.html";
      }, 2000);
    } else {
      throw new Error("No access token provided, please register");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    showMessage("Failed to login. Please try again later.", "error");
    throw error;
  } finally {
    hideLoader(); 
  }
}
