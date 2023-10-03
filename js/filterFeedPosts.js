import { allPostsResult } from "./feedposts.js";
// var tmp = document.getElementById("reactionPosts");
// console.log(tmp);

document.getElementById("reactionPosts").addEventListener("click", async () => {
  let result = allPostsResult.sort((a, b) => {
    return b._count.reactions - a._count.reactions;
  });
  result = allPostsResult.filter((element) => {
    return element._count.reactions > 0;
  });

  //   console.log(result);
});

document.getElementById("datePosts").addEventListener("click", async () => {
  let result = allPostsResult.sort(function (a, b) {
    const c = new Date(a.created);
    const d = new Date(b.created);
    return c - d;
  });

  result = result.reverse();
  //   console.log(result);
});
