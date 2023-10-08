import { allPostsResult } from "./feedposts.js";
import { setUpHTML } from "./const.mjs";
import { API_BASE_URL } from "./const.mjs";
import { fetchAllUserPosts } from "./feedposts.js";

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

    // console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
});

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

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("input", searchPosts);

  const allPosts = `${API_BASE_URL}social/posts?&_comments=true&_author=true&_reactions=true&_count=true`;
  fetchAllUserPosts(allPosts);
});

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
