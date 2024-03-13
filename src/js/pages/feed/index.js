import { getPosts } from "../../api/posts/getPosts.js"
import { filterOptions } from "../../components/Filters/filters.js";
import { createNewPost } from "./functions/createPost.js";
import { renderPosts } from "./functions/renderPosts.js";
import { initializeSearch } from "../../components/search/searchBar.js"
import { logOut } from "../../components/buttons/logOut.js";

document.addEventListener('DOMContentLoaded', async () => {
    const posts = await getPosts();

    filterOptions(posts);

    renderPosts(posts);
    createNewPost();
    initializeSearch();
    logOut();
});
