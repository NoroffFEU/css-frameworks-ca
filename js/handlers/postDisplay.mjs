import { getPosts } from "../api/posts/get.mjs";
import { renderPostTemplate } from "../templates/post.mjs";
import { load } from "../storage/index.mjs";


export async function displayPosts() {
  try {
    const posts = await getPosts();
    const container = document.querySelector("#posts");
    container.innerHTML = ""; // Clear the existing content
    posts.forEach((postData) => {
      console.log(postData.author.email)
      renderPostTemplate(postData, container);
    });
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}

export async function displayUserPosts() {
  try {
    const posts = await getPosts();
    const container = document.querySelector("#userPosts");
    container.innerHTML = ""; // Clear the existing content
    
    const userProfile = load("profile");
    const currentUserEmail = userProfile.email;
    
    posts.forEach((postData) => {
      if (postData.author.email === currentUserEmail) {
        renderPostTemplate(postData, container);
      }
    });
  } catch (error) {
    console.error("Error fetching and displaying user posts:", error);
  }
}