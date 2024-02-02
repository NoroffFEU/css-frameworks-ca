import * as templates from "../../templates/index.mjs";
import * as postMethod from "../../api/posts/index.mjs";

export async function displayPostsHandler() {
  const post = await postMethod.getPosts();
  const container = document.querySelector('#post');
  templates.renderPostListTemplates(post, container);
}

displayPostsHandler();