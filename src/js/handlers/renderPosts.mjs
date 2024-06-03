import * as postActions from "../api/posts/index.mjs";
import { renderPostList } from "../templates/postTemplate.mjs";
import { searchPost } from "./search.mjs";

export async function renderAllPosts() {
    const posts = await postActions.getPosts();
    const container = document.querySelector("#posts");
    renderPostList(posts, container);
    searchPost("posts");
};
  