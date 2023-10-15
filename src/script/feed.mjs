import { showPosts, postsContentContainer } from "./my-posts/view-feed-posts.mjs";
import { newFeedsHtml } from "./my-posts/filter.mjs";
import { getFeedPostsUrl, getFoodPostsUrl, getGamePostsUrl, createPostUrl } from "./components/api-url.mjs";
import { createPostForm, postForm } from "./my-posts/create-new-post.mjs";
import { createPost } from "./components/fetch-token.mjs";
import { showUserName, showAvatar } from "./my-profile/show-user.mjs";
import { getSearchResults } from "./my-posts/search.mjs";
import { loader, message } from "./components/message.mjs";

newFeedsHtml();

const selectFilter = document.querySelector("select");

async function showFeedHtml() {
  loader.innerHTML = "";
  try {
    await showPosts(getFeedPostsUrl);
    selectFilter.addEventListener("change", function () {
      const selectedValue = selectFilter.value;
      if (selectedValue === "food") {
        postsContentContainer.innerHTML = "";
        showPosts(getFoodPostsUrl);
      } else if (selectedValue === "game") {
        postsContentContainer.innerHTML = "";
        showPosts(getGamePostsUrl);
      } else if (selectedValue === "all") {
        postsContentContainer.innerHTML = "";
        showPosts(getFeedPostsUrl);
      }
    });
  } catch (error) {
    loader.classList.add("text-danger");
    loader.innerHTML = message("error", error);
  }
}
showFeedHtml();

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

showUserName();
showAvatar();

getSearchResults();
