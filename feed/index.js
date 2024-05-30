import { HandleSubmitPost } from "../js/posts/submitPosts.js";
import { fetchImgUrl } from "../js/utils/fetchImgUrl.js";
import { getQueryParamId, updateHref } from "../js/utils/queryParam.js";
import { changeSearchElements } from "../js/utils/changeSearchElements.js";
import { apiUrls } from "../js/api/constant.js";
import { displayPosts, displayPost } from "../js/posts/displayPosts.js";
import { feedBtnHandler } from "../js/utils/feedBtnHandler.js";
import { search } from "../js/utils/searchFunctionality.js";
import { adjustingPageContent } from "../js/posts/viewSpecificPost.js";

const form = document.getElementById("post-form");
form.addEventListener("submit", (e) => {
  HandleSubmitPost(e);
  form.reset();
});

const imgBtn = document.getElementById("img-btn");
imgBtn.addEventListener("click", fetchImgUrl);

const followBtn = document.getElementById("followingBtn");
followBtn.addEventListener("click", () => {
  const id = followBtn.id;
  feedBtnHandler(displayPosts, apiUrls.followed_posts, id);
  updateHref();
});

const allPostsBtn = document.getElementById("allPostsBtn");
allPostsBtn.addEventListener("click", () => {
  const id = allPostsBtn.id;
  feedBtnHandler(displayPosts, apiUrls.posts_Parameter, id);
  changeSearchElements();
  updateHref();
});

/**
 * Renders the content of the current page based on its state and URL.
 *
 * This function examines the current page's state and URL, and renders the appropriate content accordingly. If a specific post ID is provided in the URL, it displays that post; otherwise, it displays a list of posts from followed users. It also triggers functions to adjust the page content and perform searches as needed.
 *
 * @async
 * @returns {void}
 *
 * @example
 * // Example usage:
 * renderPageContent();
 */

const renderPageContent = async () => {
  const id = getQueryParamId();
  search();
  try {
    if (id) {
      displayPost();
      adjustingPageContent();
    } else {
      displayPosts(apiUrls.followed_posts);
    }
  } catch (error) {
    console.log(error);
  }
};

renderPageContent();
