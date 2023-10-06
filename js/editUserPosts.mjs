import { API_BASE_URL } from "./const.mjs";

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
      }),
    });

    if (response.ok) {
      // Handle success, e.g., close the modal and update the post list
      const modal = document.getElementById("myModal");
      modal.classList.remove("show");
      modal.style.display = "none";

      gatherUserPosts(userPosts);
    } else {
      // Handle errors, e.g., display an error message to the user
      console.error("Failed to edit the post.");
    }
  } catch (error) {
    console.error(error);
  }
}

export { editPost };
