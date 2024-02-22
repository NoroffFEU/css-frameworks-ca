import { handlePostDate } from "../../handler/posts/index.mjs";

export async function getSortedPosts(posts) {
  const orderBy = document.querySelector("#orderby");

  orderBy.addEventListener("change", async function () {
    const selectedOrder = orderBy.value;
    console.log(selectedOrder);
    handlePostDate(posts, selectedOrder);
  });
}


// This code is not filtering the posts as expected.

// import { getAllPosts } from "../../api/posts/index.mjs";
// import { handlePostDate } from "../../handler/posts/index.mjs";

// export async function getSortedPosts() {
//   const orderBy = document.querySelector("#orderby");

//   orderBy.addEventListener("change", async function () {
//     const selectedOrder = orderBy.value;
//     console.log(selectedOrder);

//     // Fetch the latest posts
//     const posts = await getAllPosts();

//     handlePostDate(posts, selectedOrder);
//   });
// }
