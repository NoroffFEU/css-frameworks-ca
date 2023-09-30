const API_SEARCH_URL = "https://api.noroff.dev/api/v1/";
const searchURL = `${API_SEARCH_URL}/social/posts?&limit=10&offset=95&_comments=true&_author=true&_reactions=true&_count=true`;

const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keyup", searchAllPosts);

function searchAllPosts() {
  let filterValue = searchBar.value.toLowerCase();
  // console.log(filterValue);

  //Looping through the shown posts
  const searchPosts = document
    .querySelectorAll(".postsWall")
    .forEach((post) => {
      post.innerText.toLowerCase().indexOf(filterValue) > -1
        ? (post.style.display = "")
        : (post.style.display = "none");
    });
}
