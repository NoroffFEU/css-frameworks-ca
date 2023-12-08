deleteButton.addEventListener("click", function (event) {
  deletePost(id).then(() => {
    window.location.reload();
  });
});
