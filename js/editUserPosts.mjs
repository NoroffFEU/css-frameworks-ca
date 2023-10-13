import { API_BASE_URL } from "./const.mjs";

const modal = document.getElementById("myModal");
const postTitleInput = modal.querySelector("#postTitle");
const postBodyTextarea = modal.querySelector("#postBodyArea");
const postMediaInput = modal.querySelector("#postMedia");
const modalForm = modal.querySelector("#createNewPost");


async function editPost(postId, postTitle, postBody, postMedia) {
  const token = localStorage.getItem("accessToken");
  const url = `${API_BASE_URL}social/posts/${postId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        media: postMedia,
        id: postId,
      }),
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

modalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const editedTitle = postTitleInput.value;
  const editedBody = postBodyTextarea.value;
  const editedMedia = postMediaInput.value;

  const postId = modal.getAttribute("data-post-id");
  console.log("Post ID:", postId);

  await editPost(postId, editedTitle, editedBody, editedMedia);
});
