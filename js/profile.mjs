import { handleCreatePostSubmission } from "./api/posts/profile-posts/create-post.mjs";
import { renderMyPost, savePost } from "./api/posts/profile-posts/render-new-post.mjs";
import { fetchUserPosts } from "./api/posts/profile-posts/fetch-user-posts.mjs";
import { loadAndDisplayUserName } from "./utilities/user.mjs";
import "./api/login_signup/logout.mjs";

const createPostForm = document.getElementById("createPostForm");

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const userName = await loadAndDisplayUserName();
    await renderSavedPosts(userName);
  } catch (error) {
    console.error(error.message);
  }
});

handleCreatePostSubmission(createPostForm, async (newPost) => {
  try {
    await renderMyPost(newPost);
    savePost(newPost);
  } catch (error) {
    console.error("Error rendering new post:", error);
  }
});

async function renderSavedPosts(userId) {
  const savedPosts = await fetchUserPosts(userId);
  savedPosts.forEach((post) => renderMyPost(post));
}
