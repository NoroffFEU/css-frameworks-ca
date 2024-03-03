import { getCommentsForPost } from "../../api/posts/get.mjs";
import { renderPostTemplateForComments } from "../../templates/index.mjs";

export async function displayComments(postId, parentElement) {
  try {
    const commentsData = await getCommentsForPost(postId);

    if (!commentsData || commentsData.length === 0) {
      console.log("No comments to display for post:", postId);
      return;
    }

    // Render post template along with comments into the specified parent element
    await renderPostTemplateForComments(commentsData, parentElement);
  } catch (error) {
    console.error("Failed to fetch and display comments:", error);
  }
}