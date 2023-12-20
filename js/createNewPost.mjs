import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { displayAllPostsCards } from "./fetchAllPosts.mjs";


document.addEventListener("DOMContentLoaded", () => {
  const createPostForm = document.querySelector("#newPost");
  createPostForm.addEventListener("submit", createPost);
});



async function createPost(event) {
  event.preventDefault();


  const userToken = localStorage.getItem("accessToken");

const title = event.target.querySelector("#exampleInputTitle1").value;
const content = event.target.querySelector("#exampleInputTextArea1").value;
const imageUrl = event.target.querySelector("#exampleInputImageUrl").value;


  if (!title || !content) {
    alert("Please fill in all required fields");
    return;
  }

  const newPost = {
    title: title,
    body: content,
    media: imageUrl,
  };
  
  try {
    const response = await fetch(`${apiBaseUrl}${allPostsApi}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    event.target.reset();

    const data = await response.json();

    console.log("Post created!:", data);

    await displayAllPostsCards();

  } catch (error) {
    console.error("Error creating post:", error);
  }
}

