import { API_BASE_URL } from "./const.mjs";
const token = localStorage.getItem("accessToken");

async function createPost(url, newPost) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPost),
    };
    const response = await fetch(url, postData);
    console.log(response);

    if (response.ok) {
      const json = await response.json();
      // console.log(json);

      document.getElementById("postTitle").value = "";
      document.getElementById("postBodyArea").value = "";
      document.getElementById("postMedia").value = "";

      window.location.reload();
    } else {
      console.log("Could not upload new post");
    }
  } catch (error) {
    console.log(error);
  } finally {
    document.getElementById("submitBtn").disabled = false;
  }
}

document
  .getElementById("createNewPost")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const postTitle = document.getElementById("postTitle").value;
    const postBody = document.getElementById("postBodyArea").value;
    const postMedia = document.getElementById("postMedia").value;

    const newPost = {
      title: postTitle,
      body: postBody,
      media: postMedia,
    };

    const newPostURL = `${API_BASE_URL}social/posts`;

    createPost(newPostURL, newPost);
  });
