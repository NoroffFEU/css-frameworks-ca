import { apiBaseUrl, allPostsApi } from "./variables.mjs";


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


  if (!title || !content || !imageUrl) {
    alert("Please fill in all fields");
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

    const data = await response.json();

    console.log("Post created!:", data);
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
