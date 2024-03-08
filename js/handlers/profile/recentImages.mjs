import { fetchUserPostImages } from "../../api/profiles/fetchUserImages.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { handleViewImageClick } from "./viewImageClick.mjs";

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

// Function to handle click event on "Show all" link
// Function to handle click event on "Show all" link
export async function displayAllUserImages() {
  const showAllImagesLink = document.getElementById("showAllImagesLink");
  if (showAllImagesLink) {
    let isShowing = false; // Flag to track the current state

    showAllImagesLink.addEventListener("click", async (event) => {
      event.preventDefault();

      try {
        // Fetch all images from the user's posts
        const allImages = await fetchUserPostImages();
        const userPostImages = document.getElementById("allProfileImages");

        if (allImages.length <= 4) {
          showAllImagesLink.textContent = "No more images";
          return; // Exit early if there are no more images to show
        }

        if (isShowing) {
          // If images are currently showing, hide them
          userPostImages.innerHTML = "";
          showAllImagesLink.textContent = "Show all"; // Change link text
        } else {
          userPostImages.innerHTML = "";

          // Group images into rows of four, starting from index 4
          for (let i = 4; i < allImages.length; i += 4) {
            const row = document.createElement("div");
            row.classList.add("row", "mb-2");

            // Add up to four images to the row
            for (let j = i; j < i + 4 && j < allImages.length; j++) {
              const imageUrl = allImages[j];
              const imageWrapper = document.createElement("div");
              imageWrapper.classList.add("col");

              const imageElement = document.createElement("img");
              imageElement.src = imageUrl;
              imageElement.classList.add(
                "h-100",
                "w-100",
                "rounded-3",
                "object-fit-cover",
                "img-thumbnail"
              );

              imageWrapper.appendChild(imageElement);
              row.appendChild(imageWrapper);

              // Add click event listener for viewing image
              imageElement.addEventListener("click", (event) => {
                handleViewImageClick(event, imageUrl);
              });
            }
            userPostImages.appendChild(row);
          }

          showAllImagesLink.textContent = "Hide images";
        }

        // Toggle the state
        isShowing = !isShowing;
      } catch (error) {
        console.error("Error fetching all user post images:", error);
        showMessage(
          "Failed to fetch all user post images. Please try again later.",
          "error"
        );
      }
    });
  }
}

export async function countUserImages() {
  try {
    // Fetch all images from the user's posts
    const allImages = await fetchUserPostImages();
    return allImages.length;
  } catch (error) {
    console.error("Error fetching user post images:", error);
    return 0;
  }
}
const userImageCount = await countUserImages();
console.log("User image count:", userImageCount);
