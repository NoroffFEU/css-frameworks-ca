import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { fetchWithToken, token } from "./accessToken.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const postId = params.get("id");

  console.log("postId", postId);

  const removePostLink = document.querySelector("#delete-post");
  console.log("removePostLink", removePostLink);
  const deleteConfirmationModal = document.querySelector("#deleteConfirmationModal");
  console.log("deleteConfirmationModal", deleteConfirmationModal);
  const confirmDeleteButton = document.querySelector("#confirmDelete");
  console.log("deleteConfirmationModal", deleteConfirmationModal);
  const cancelDeleteButton = document.querySelector("#cancelDelete");
  console.log("cancelDeleteButton", cancelDeleteButton);

  removePostLink.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Delete button clicked");
    // Show the modal when the delete button is clicked
    deleteConfirmationModal.style.display = "block";
  });

  // Event listener for confirming deletion
  confirmDeleteButton.addEventListener("click", async () => {
    try {
      // Perform the deletion when confirmed
      const response = await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Redirect to the profile page after successful deletion
        window.location.href = "/profile/";
      } else {
        // Handle unsuccessful deletion, e.g., show an error message
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  });

  // Event listener for canceling deletion
  cancelDeleteButton.addEventListener("click", () => {
    // Hide the modal when canceled
    deleteConfirmationModal.style.display = "none";
  });
});

/* 
// Query string parameter
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");

async function removePost(event) {
  event.preventDefault();

  const title = event.target.querySelector("#editTitle");
  const content = event.target.querySelector("#editBodyText")
  const imageUrl = event.target.querySelector("#editImage");

  if (!title || !content) {
    alert("Please fill in all required fields");
    return;
  }

  const editPostData = {
    title: title.value,
    body: content.value,
    media: imageUrl.value,
  };
  
  try {
    const response = await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editPostData),
    });

      window.location.href = "/profile/";

  } catch (error) {
    console.error("Error updating post:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const removePostForm = document.querySelector("#delete-post");
  removePostForm.addEventListener("click", removePost);
});


 */

/* document.addEventListener("DOMContentLoaded", () => {
  const removePostForm = document.querySelector("#delete-post");
  const deleteConfirmationModal = document.querySelector("#deleteConfirmationModal");
  const confirmDeleteButton = document.querySelector("#confirmDelete");
  const cancelDeleteButton = document.querySelector("#cancelDelete");

  removePostForm.addEventListener("click", () => {
    // Show the modal when the delete button is clicked
    deleteConfirmationModal.style.display = "block";
  });

  // Event listener for confirming deletion
  confirmDeleteButton.addEventListener("click", async () => {
    try {
      // Perform the deletion when confirmed
      const response = await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Redirect to the profile page after successful deletion
      window.location.href = "/profile/";
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  });

  // Event listener for canceling deletion
  cancelDeleteButton.addEventListener("click", () => {
    // Hide the modal when canceled
    deleteConfirmationModal.style.display = "none";
  });
}); */
