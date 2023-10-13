import { API_BASE_URL } from "./const.mjs";
const userName = localStorage.getItem("userName");
// const userEmail = localStorage.getItem("userEmail");

async function populateFeed(url) {
  try {
    const token = localStorage.getItem("accessToken");

    const fetchProfileInfo = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchProfileInfo);
    // console.log(response);
    const json = await response.json();

    const profileInfoBox = document.querySelector(".profileBox");

    // Create a container for the profile information
    const profileInfoContainer = document.createElement("div");
    profileInfoContainer.classList.add(
      "text-center",
      "p-3",
      "bg-dark",
      "d-flex",
      "flex-column"
    );
    profileInfoContainer.id = populateFeed.id;

    const profileName = document.createElement("p");
    profileName.classList.add("text-primary", "fs-4");
    profileName.innerText = json.name;

    const profileAvatar = document.createElement("img");
    profileAvatar.classList.add(
      "img-fluid",
      "rounded-circle",
      "d-none",
      "d-md-block"
    );

    if (json.avatar && json.avatar.trim() !== "") {
      profileAvatar.src = json.avatar;
      profileAvatar.alt = "Profile image of " + json.name;
    } else {
      profileAvatar.src = "/images/profile.jpg";
      profileAvatar.alt = "Profile image of " + json.name;
    }

    profileInfoContainer.append(profileName);
    profileInfoContainer.append(profileAvatar);

    profileInfoBox.append(profileInfoContainer);
  } catch (error) {
    console.log(error);
  }
}

const profileInfo = `${API_BASE_URL}social/profiles/${userName}`;

populateFeed(profileInfo);
