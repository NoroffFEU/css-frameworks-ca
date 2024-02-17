import { getUserName } from "../utils/helpers/getUserName.js";

document.addEventListener("DOMContentLoaded", () => {
  displayUserName();
});

export function displayUserName() {
  const userName = getUserName();
  if (userName) {
    document.querySelector(".your-profile-name").textContent = userName;
  } else {
    console.log("User name not found in storage.");
  }
}
