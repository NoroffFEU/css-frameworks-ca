import { handlePostSort } from "../../handlers/posts/dateSortingHandler.js";



export async function getSortedPosts(posts) {
  const orderBy = document.querySelector("#orderby");

  orderBy.addEventListener("change", async function () {
    const selectedOrder = sortBy.value;
    console.log(selectedOrder);
    handlePostSort(posts, selectedOrder);
  });
}
