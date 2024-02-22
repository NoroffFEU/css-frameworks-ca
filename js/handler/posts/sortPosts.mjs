import { handlePostDate } from "./index.mjs";

export async function sortPosts(posts) {
  const orderBy = document.querySelector("#orderby");

  orderBy.addEventListener("change", async function () {
    const selectedOrder = orderBy.value;
    handlePostDate(posts, selectedOrder);
  });
}
