import { getPost } from "../api/posts/read.mjs";
import { getValueFromURLParameter } from "../utils/getValueFromURLParameter.mjs";
import { renderPostTemplate } from "../templates/renderPosts.mjs";

export async function setReadPostListener() {
    const postId = getValueFromURLParameter("id");

    if (!postId) {
        console.error("missing post id");
        return;
    }

    try {
        const post = await getPost(postId);
        const singlePostContainer = document.getElementById("single-post");
        renderPostTemplate(post, singlePostContainer);
    } catch (error) {
        console.error("Error fetching and displaying the post:", error);
    }
}
