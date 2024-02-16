import { load } from "../storage/index.mjs";

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve user profile from localStorage
  const userProfile = load("profile");

  if (userProfile) {
    // Replace "user name" with the user's name
    const elementsWithUsername = document.querySelectorAll(".replace-username");
    elementsWithUsername.forEach((element) => {
      element.textContent = element.textContent.replace(
        "user name",
        userProfile.name
      );
    });
  }
});
