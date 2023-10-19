import { allPosts, allPostsResult, fetchAllUserPosts } from "./feedposts.js";
import { API_BASE_URL, setUpHTML } from "./const.mjs";

/**
 * Sort and filter posts by the number of reactions.
 */
document.getElementById("reactionPosts").addEventListener("click", async () => {
  try {
    let result = allPostsResult.sort((a, b) => {
      return b._count.reactions - a._count.reactions;
    });

    result = result.filter((element) => {
      return element._count.reactions > 0;
    });

    const postWallContainer = document.querySelector(".postsWall");
    postWallContainer.innerHTML = "";

    result.forEach((post) => {
      if (!post.title || !post.body) {
        return;
      }
      setUpHTML(post, postWallContainer);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

/**
 * Sort posts by oldest date.
 */
document.getElementById("datePosts").addEventListener("click", async () => {
  let result = allPostsResult.sort(function (a, b) {
    const c = new Date(a.created);
    const d = new Date(b.created);
    return c - d;
  });

  const postWallContainer = document.querySelector(".postsWall");
  postWallContainer.innerHTML = "";

  result.forEach((post) => {
    if (!post.title || !post.body) {
      return;
    }
    setUpHTML(post, postWallContainer);
  });
});

/**
 * Reset to the default view.
 */
document.getElementById("defaultPosts").addEventListener("click", () => {
  window.location.reload();
});

/**
 * Search for posts based on user input.
 */
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("input", searchPosts);

  const allPosts = `${API_BASE_URL}social/posts?&_comments=true&_author=true&_reactions=true&_count=true`;
  fetchAllUserPosts(allPosts);
});

/**
 * Search posts based on the search input.
 */
async function searchPosts() {
  const searchInput = document.getElementById("searchBar").value.toLowerCase();
  const postCards = document.querySelectorAll(".card");

  postCards.forEach((postCard) => {
    const postTitleElement = postCard.querySelector(".postTitle");
    const postBodyElement = postCard.querySelector(".postBody");
    const postAuthorElement = postCard.querySelector(".postAuthor");

    if (postTitleElement && postBodyElement && postAuthorElement) {
      const postTitle = postTitleElement.textContent.toLowerCase();
      const postBody = postBodyElement.textContent.toLowerCase();
      const postAuthor = postAuthorElement.textContent.toLowerCase();

      if (
        postTitle.includes(searchInput) ||
        postBody.includes(searchInput) ||
        postAuthor.includes(searchInput)
      ) {
        postCard.style.display = "block";
      } else {
        postCard.style.display = "none";
      }
    }
  });
}
