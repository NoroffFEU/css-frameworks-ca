import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { fetchWithToken, token } from "./accessToken.mjs";

// Query string parameter
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");

async function editPost(event) {
  event.preventDefault(); // Prevent the form from submitting normally

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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editPostData),
    });

    if (response) {
      alert("Your post is updated!");

      window.location.href = "/profile/";
    } else {

      alert("Failed to update the post. Please try again.");
    }

  } catch (error) {
    throw new Error("Error updating post:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const editPostForm = document.querySelector("#editPost");
  editPostForm.addEventListener("submit", editPost);
});


  // Select the input fields
  const titleInput = document.querySelector("#editTitle");
  const bodyTextInput = document.querySelector("#editBodyText");
  const imageInput = document.querySelector("#editImage");

  // Fetch post data and pre-fill input fields
  async function getPostData() {
    try {
      const response = await fetchWithToken(`${apiBaseUrl}${allPostsApi}/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        const postData = await response.json();

        // Pre-fill input fields with post data
        titleInput.value = postData.title;
        bodyTextInput.value = postData.body;
        imageInput.value = postData.media;
      } else {
        throw new Error("Failed to fetch post data");
      }
    } catch (error) {
      throw new Error("Error fetching post data:", error);
    }
  }
  
  getPostData();

