import { addComment } from "../../api/posts/comment.mjs";

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
        alert("Please enter a comment.");
        return;
      }

      // Add the comment
      await addComment(postId, commentText);
      console.log("Comment added successfully.");

      // Close the modal after adding the comment
      const commentModal = bootstrap.Modal.getInstance(
        document.getElementById("commentModal")
      );
      commentModal.hide();
    });
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}
