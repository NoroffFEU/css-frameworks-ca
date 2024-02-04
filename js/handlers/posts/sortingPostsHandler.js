// export function sortingPostsHandler(posts) {
// get the input field
// add an event listener like input or keyup
// get the value of the input field
// filter the posts array
// render the filtered posts
//   searchInput.addEventListener("keyup", function () {
//     const searchValue = searchInput.value.trim().toLowerCase();
//     const filteredPosts = posts.filter((post) => {
//         if (post.title.toLowercase().startsWith(searchValue)) {
//       return true;
//         };
//     });
//     renderPosts("#posts", filteredPosts);
//   });
// }

import { renderPosts } from "../../ui/renderPosts.js";

// is this ok?????????
export function sortingPostsHandler(posts) {
  const sortingSelect = document.querySelector("#sorting");
  // Add an event listener
  sortingSelect.addEventListener("change", function () {
    // Get the selected option
    const selectedOption = sortingSelect.value;

    let sortedPosts;
    // Sort the posts based on the selected option
    if (selectedOption === "Newest") {
      sortedPosts = posts.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (selectedOption === "Oldest") {
      sortedPosts = posts.sort((a, b) => new Date(a.created) - new Date(b.created));
    }
    // Render the sorted posts
    renderPosts("#posts", sortedPosts);
  });
}
