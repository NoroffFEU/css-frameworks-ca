import { handlePostDate } from "./index.mjs";

/**
 * Attaches a change event listener to the order by select element.
 * When the selected option changes, it gets the selected option and calls the `handlePostDate` function with the posts and the selected option.
 *
 * @param {Array} posts - The posts to sort.
 */

export async function sortPosts(posts) {
  const orderBy = document.querySelector("#orderby");

  orderBy.addEventListener("change", async function () {
    const selectedOrder = orderBy.value;
    handlePostDate(posts, selectedOrder);
  });
}
