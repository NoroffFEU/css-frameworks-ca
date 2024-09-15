export function renderPosts(postsToRender) {
  const postContainer = document.querySelector(".newPosts");
  postContainer.innerHTML = "";

  postsToRender.forEach(function (newPost) {
    postContainer.innerHTML += `<div>${newPost.id}</div>`;
  });
}
