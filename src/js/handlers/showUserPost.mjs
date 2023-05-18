async function showCurrentUserPosts() {
  const userPosts = document.querySelector("#userPostContainer");

  userPosts.addEventListener("click", async () => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      // handle case when no user is logged in
      return;
    }

    const posts = await fetchPostsByUsername(currentUser.name);

    const container = document.querySelector("#userPostContainer");
    renderPosts(posts, container);
  });
}
