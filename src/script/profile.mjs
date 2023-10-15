import { showUserName, showTitle, showAvatar, currentUserName } from "./my-profile/show-user.mjs";
import { createPostForm, postForm } from "./my-posts/create-new-post.mjs";
import { createPost } from "./components/fetch-token.mjs";
import { showPosts } from "./my-posts/view-feed-posts.mjs";
import { profileUrl, authorParam, createPostUrl } from "./components/api-url.mjs";
import { getSearchResults } from "./my-posts/search.mjs";
import { loader, message } from "./components/message.mjs";

showUserName();
showTitle();
showAvatar();

createPostForm();

postForm.addEventListener("submit", function createNewPost(event) {
  try {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const tags = formData.get("tags");
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    const post = Object.fromEntries(formData.entries());
    post.tags = tagsArray;
    createPost(createPostUrl, post);
    alert("Your post was published!");
    window.location.reload();
  } catch (error) {
    loader.classList.add("text-danger");
    loader.innerHTML = message("error", error);
  }
});

async function showUserPosts() {
  loader.innerHTML = "";
  try {
    const currentUserUrl = `${profileUrl}/${currentUserName}/posts${authorParam}`;
    await showPosts(currentUserUrl);
  } catch (error) {
    loader.classList.add("text-danger");
    loader.innerHTML = message("error", error);
  }
}
showUserPosts();

getSearchResults();
