import { getProfile, updateProfile } from "../../api/profiles/index.mjs";
import { load, save } from "../../storage/index.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { subject } from "../observers/commonObservers.mjs";
import { ProfileEditObserver } from "../index.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { fetchUserPostImages } from "../../api/profiles/fetchUserImages.mjs";
import { handleViewImageClick } from "./viewImageClick.mjs";

export async function setUpdateProfileListener() {
  const form = document.querySelector("#editProfile");

  if (form) {
    const { name, email } = load("profile");

    form.name.value = name;
    form.email.value = email;

    const button = form.querySelector("button");
    button.disabled = true;

    try {
      showLoader();

      const profile = await getProfile(name);

      form.banner.value = profile.banner;
      form.avatar.value = profile.avatar;

      button.disabled = false;

      //observe Elements to display changes
      const avatarElement = document.querySelector(".replace-avatar");
      const bannerElement = document.querySelector(".profile-banner");
      const profileEditObserver = new ProfileEditObserver(
        avatarElement,
        bannerElement,
        name
      );
      subject.subscribe(profileEditObserver);

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const mediaData = Object.fromEntries(formData.entries());

        try {
          showLoader();

          // Send media update to the API
          await updateProfile(name, mediaData);

          // Update the saved profile in local storage with only the media-related data
          const savedProfile = load("profile") || {};
          const updatedProfile = { ...savedProfile, ...mediaData };
          save("profile", updatedProfile);
          showMessage("Profile updated successfully!", "success");

          // Notify the observer about the profile update
          subject.notify({ name, ...mediaData });
        } catch (error) {
          console.error("Error updating profile:", error);
          showMessage("Failed to update profile" + error.message, "error");
        } finally {
          hideLoader();
        }
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      hideLoader();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setUpdateProfileListener();
});

// function to display users post images
export async function displayUserPostImages() {
  try {
    const images = await fetchUserPostImages();
    const container = document.getElementById("userPostImages");
    container.innerHTML = "";

    const defaultImageUrl = "../../../image/default-image.jpg";

    let imagesToDisplay = images.slice(0, 4); // Get up to four user images

    // If there are fewer than four user images, fill the rest with default images
    const defaultCount = 4 - imagesToDisplay.length;
    for (let i = 0; i < defaultCount; i++) {
      imagesToDisplay.push(defaultImageUrl);
    }

    imagesToDisplay.forEach((imageUrl) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("col", "mb-2");

      const imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.classList.add(
        "w-100",
        "h-100",
        "rounded-3",
        "object-fit-cover",
        "img-thumbnail"
      );

      imageWrapper.appendChild(imageElement);
      container.appendChild(imageWrapper);

      if (imageUrl !== defaultImageUrl) {
        imageElement.addEventListener("click", (event) => {
          handleViewImageClick(event, imageUrl);
        });
      }
    });
  } catch (error) {
    console.error("Error displaying user post images:", error);
    showMessage(
      "Failed to display user post images. Please try again later.",
      "error"
    );
  }
}
