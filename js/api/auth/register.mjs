import { API_SOCIAL_URL } from "../api_constants.mjs";

const action = "/auth/register";
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
  const registerURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(registerURL, {
      headers: { "Content-Type": "application/json" },
      method,
      body,
    });
    const result = await response.json();
    console.log(result);

    if (response.ok) {
      alert("Registration successful! Please log in to continue.");
      setTimeout(() => {
        window.location.href = "/profile/login/index.html";
      }, 3000);
    } else {
      const errorMessage =
        result?.errors?.[0]?.message ||
        "Registration failed. Please try again.";
      alert(`Registration failed: ${errorMessage}`);
      if (errorMessage === "Profile already exists. Please login") {
        setTimeout(() => {
          window.location.href = "/profile/login/index.html";
        }, 3000);
      }
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration failed. Please try again.");
  }
}
