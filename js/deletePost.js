import { API_BASE_URL } from "./const.mjs";

const modal = document.getElementById("myModal");
const deleteButton = document.getElementById("deletePostButton");

async function deletePost(postId) {
  const token = localStorage.getItem("accessToken");
  const url = `${API_BASE_URL}social/posts/${postId}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      const modal = document.getElementById("myModal");
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

deleteButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const postId = modal.getAttribute("data-post-id");
  console.log("Post ID:", postId);

  await deletePost(postId);
});
