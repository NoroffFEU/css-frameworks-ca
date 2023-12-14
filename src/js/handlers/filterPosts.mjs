import * as postsMethods from "../api/posts/index.mjs";
/**
 * This function filters posts to get posts of the logged-in person
 */
export async function postsFilter() {
  const myContainer = document.querySelector("#herePost");

  const accessToken = localStorage.getItem("profile");

  const myAuthor = JSON.parse(accessToken);
  const accurateAuthor = myAuthor.name;

  const mYposts = await postsMethods.getPosts();
  const newPosts = mYposts.filter(function ({ author }) {
    if (author.name === accurateAuthor) {
      return true;
    }
  });

  newPosts.forEach(function (currentAuthorPosts) {
    let image = `<img
      src="https://files.fm/thumb_show.php?i=ju48sg94r"
      class="card-img-top"
      alt="post image"
      />`;
    if (currentAuthorPosts.media) {
      image = `<img
        src="${currentAuthorPosts.media}"
        class="card-img-top"
        alt="post image"
        />`;
    }
    myContainer.innerHTML += `
      <div class="post">
        <h3>${currentAuthorPosts.title}</h3>
        ${image}
        <p>${currentAuthorPosts.body}</p>
        <a href="/post/index.html?id=${currentAuthorPosts.id}" class="btn btn-outline-secondary"> View post </a>
      </div>
    
    `;
  });
}