import { likePost } from "../../api/posts/like.mjs";

export async function handleLikeButtonClick(event, postId) {
  const symbol = "👍"; // Define the symbol here
  try {
    await likePost(postId, symbol);
    console.log("Post liked successfully.");
  } catch (error) {
    console.error("Error liking post:", error);
  }
}
