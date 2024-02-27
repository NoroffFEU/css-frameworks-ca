export function handleEditButtonClick(event, postData) {
  const editPostModal = new bootstrap.Modal(
    document.getElementById("editPostModal")
  );

  // Populate the form fields with existing post data
  document.getElementById("editTitle").value = postData.title;
  document.getElementById("editBody").value = postData.body;
  document.getElementById("editMedia").value = postData.media;
  document.getElementById("editPostId").value = postData.id;

  // Show the edit post modal
  editPostModal.show();

  return editPostModal;
}
