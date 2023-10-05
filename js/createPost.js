import { API_BASE_URL } from "./const.mjs";

async function loginUser(url, newPost) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    };
    const response = await fetch(url, postData);
    console.log(response);

    if (response.ok) {
      // Check if the response is successful
      const json = await response.json();
      console.log(json);
      const accessToken = json.accessToken;
      const userName = json.name;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);

      // Redirect to the profile page
      window.location.href = "feed/index.html";
    } else {
      // Handle unsuccessful login here
      console.log("Could not upload new post");
    }
  } catch (error) {
    console.log(error);
  }
}

document
  .getElementById("createNewPost")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const postTitle = document.getElementById("postTitle").value;
    const postBody = document.getElementById("postBodyArea").value;

    const newPost = {
      title: postTitle,
      body: postBody,
    };

    const newPostURL = `${API_BASE_URL}posts`;

    loginUser(newPostURL, newPost);
  });
