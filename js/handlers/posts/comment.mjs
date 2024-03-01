import { addComment } from "../../api/posts/comment.mjs";
import { subject } from "../observers/commonObservers.mjs";
import { showMessage } from "../../utils/messages.mjs";

function openCommentModal() {
  const commentModal = new bootstrap.Modal(
    document.getElementById("commentModal")
  );
  commentModal.show();
}

export async function handleCommentButtonClick(event, postId) {
  try {
    openCommentModal();

    const submitCommentBtn = document.getElementById("submitCommentBtn");
    submitCommentBtn.addEventListener("click", async () => {
      const commentText = document.getElementById("commentText").value;
      if (commentText.trim() === "") {
        showMessage("Please enter a comment.", "error");
        return;
      }

      // Add the comment
      try {
        await addComment(postId, commentText);
        subject.notify(postId);
        showMessage("Comment added successfully.", "success");
      } catch (error) {
        console.error("Error adding comment:", error);
        showMessage(
          "Failed to add comment. Please try again later.",
          "error",
          error
        );
      }
      // Close the modal after adding the comment
      const commentModal = bootstrap.Modal.getInstance(
        document.getElementById("commentModal")
      );
      commentModal.hide();
    });
  } catch (error) {
    console.error("Error handling comment click:", error);
    showMessage(
      "An unexpected error occurred. Please try again later.",
      "error",
      error
    );
  }
}
