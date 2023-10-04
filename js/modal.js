// Function to open and populate the modal
function openAndPopulateModal(postData) {
  // Get references to modal elements
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");

  // Populate modal elements with data from postData
  modalTitle.textContent = postData.title;
  modalBody.textContent = postData.body;

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
}

// Add an event listener to the postContainer in your feedPosts.js
document.querySelector(".postsWall").addEventListener("click", (event) => {
  const postContainer = event.target.closest(".card");
  if (postContainer) {
    // Get the post data associated with the clicked postContainer
    const postIndex = Array.from(postContainer.parentElement.children).indexOf(
      postContainer
    );
    const postData = allPostsResult[postIndex];

    // Open and populate the modal with the post data
    openAndPopulateModal(postData);
  }
});
