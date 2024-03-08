import { getPostById } from "../../api/posts/get.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { createSinglePostElement } from "../../templates/singlePost.mjs";

export async function handleViewPostButtonClick(event, postId) {
  event.preventDefault();

  const viewPostModal = new bootstrap.Modal(
    document.getElementById("singlePostModal")
  );

  try {
    // Fetch the post data by its ID
    const postData = await getPostById(postId);

    const modalContent = viewPostModal._element.querySelector(".modal-body");
    modalContent.innerHTML = "";

    const displaySinglePostElement = createSinglePostElement(postData);
    modalContent.appendChild(displaySinglePostElement);

    viewPostModal.show();
  } catch (error) {
    const errorMessage = "Error fetching post data:" + error.message;
    showMessage(errorMessage, "error");
    console.error("Error fetching post data:", error);
  }
}
