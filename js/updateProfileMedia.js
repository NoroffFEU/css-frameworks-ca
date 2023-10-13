import { API_BASE_URL } from "./const.mjs";

document.addEventListener("DOMContentLoaded", function () {
  // Select the form and input elements
  const profileMediaForm = document.getElementById("updateProfileMediaForm");
  const inputElement = document.getElementById("updateProfileMedia");

  async function updateProfileMedia(postMedia) {
    const token = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("userName");
    const updateMediaURL = `${API_BASE_URL}social/profiles/${userName}/media`;

    try {
      const response = await fetch(updateMediaURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: postMedia,
        }),
      });

      if (response.ok) {
        const modal = document.getElementById("editModal");
        modal.classList.remove("show");
        modal.style.display = "none";

        window.location.reload();
      } else {
        console.error("Failed to edit the post.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  profileMediaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const editedMedia = inputElement.value;
    await updateProfileMedia(editedMedia);
  });
});
