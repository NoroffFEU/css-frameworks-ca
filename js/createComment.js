import { API_BASE_URL } from "./const.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get("id");

async function createComment(postId, userData) {
  const token = localStorage.getItem("accessToken");
  const url = `${API_BASE_URL}social/posts/${postId}/comment`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      window.location.reload();
      console.log("Comment created successfully");
    } else {
      console.error("Failed to comment on the post.");
    }
  } catch (error) {
    console.error(error);
  }
}

document
  .getElementById("commentBody")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const commentBody = document.getElementById("commentArea").value;

    const userData = {
      body: commentBody,
      replyToID: postId,
    };

    await createComment(postId, userData);
  });
