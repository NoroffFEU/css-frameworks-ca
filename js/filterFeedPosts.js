import { allPostsResult } from "./feedposts.js";
import { setUpHTML } from "./const.mjs";

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
