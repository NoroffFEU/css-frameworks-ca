import { registerURL } from "../api_constants.mjs";
import { showMessage } from "../../utils/messages.mjs";

const method = "post";

/**
 * This will registrate the user to the Noroff Api
 * @async
 * @param {Object} profile - The user profile to register.
 * @param {string} profile.name - The username for the new profile.
 * @param {string} profile.email - The email address for the new profile.
 * @param {string} profile.password - The password for the new profile.
 * @param {string=} [profile.avatar] - Optional. The URL to the avatar image for the new profile.
 * @param {string=} [profile.banner] - Optional. The URL to the banner image for the new profile.
 * @returns {Promise<void>} A promise that resolves when the registration is successful or rejects with an error.
 */
export async function register(profile) {
 
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(registerURL, {
      headers: { "Content-Type": "application/json" },
      method,
      body,
    });
    const result = await response.json();

    if (response.ok) {
        showMessage("Registration successful! Please log in to continue.", "success");
        setTimeout(() => {
          window.location.href = "/profile/login/index.html";
        }, 3000);
      } else {
        const errorMessage =
          result?.errors?.[0]?.message || "Registration failed. Please try again." ;
        showMessage(`Registration failed: ${errorMessage}`, errorMessage === "Profile already exists. Please login" ? "error" : "warning");
        if (errorMessage === "Profile already exists. Please login", "warning") {
          setTimeout(() => {
            window.location.href = "/profile/login/index.html";
          }, 3000);
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      showMessage("Registration failed. Please try again.", "error");
    }
  }