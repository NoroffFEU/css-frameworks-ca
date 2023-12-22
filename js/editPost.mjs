import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { fetchWithToken, token, getData } from "./accessToken.mjs";

// Query string parameter
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");

const editPost = async (event) => {
  // Prevent the form from submitting normally
  event.preventDefault(); 

  const title = event.target.querySelector("#editTitle");
  const content = event.target.querySelector("#editBodyText")
  const imageUrl = event.target.querySelector("#editImage");

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

const editTitle = document.querySelector("#editTitle");
const editContent = document.querySelector("#editBodyText")
const editImageUrl = document.querySelector("#editImage");

const getPostId = () => {
  const currentPostId = postId;
  return currentPostId;
}

const getSinglePost = async (postId) => {
  const apiUrl = `${apiBaseUrl}${allPostsApi}/${postId}`;
  const currentPost = await fetchWithToken(apiUrl, getData);
return currentPost;
}

const preFillFormWithPostData = (post) => {
  editTitle.value = post.title;
  editContent.value = post.body;
  editImageUrl.value = post.media;
}

const main = async () => {
  const postId = getPostId();
  const post = await getSinglePost(postId);
  preFillFormWithPostData(post);
}

window.addEventListener("DOMContentLoaded", main)
