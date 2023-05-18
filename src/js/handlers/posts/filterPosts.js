import { getMyPosts } from "../../api/posts/read.js";
import { postsTemplate } from "../../ui/components/postTemplate.js";

// SETUP PAGE
export async function setupPage() {
    console.log("setup");
    const allPosts = await getMyPosts();
    postsTemplate(allPosts);

    const sortSelect = document.querySelector("#filterSelect");
    sortSelect.addEventListener("input", (event) =>
        onSortSelect(event, allPosts)
    );
    const formSelect = document.querySelector("#selectForm");
    formSelect.reset();

    return "Ready";
}

// SORTING 
function sortByNewest(postA, postB) {
    return new Date(postB.created) - new Date(postA.created);
}

function sortByOldest(postA, postB) {
    return new Date(postA.created) - new Date(postB.created);
}


// POST SORT
function sortPostsByNewest(posts) {
    return posts.sort(sortByNewest);
}

function sortPostsByOldest(posts) {
    return posts.sort(sortByOldest);
}

// SORT EVENT HANDLERS
function onSortSelect(event, allPosts = []) {
    const select = event.target;
    const value = select.value;
    switch (value) {
      case "newest":
        renderPosts(sortPostsByNewest(allPosts));
        break;
      case "oldest":
        renderPosts(sortPostsByOldest(allPosts));
        break;
    }
}
