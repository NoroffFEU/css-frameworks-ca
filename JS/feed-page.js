// display posts on page
//1 we have to be logged in
//2 we have to get all posts
//3 generate html for each post
//4 display html on page

import { logginChecker } from "./utils/loggin-Checker.js";
import { displayPosts, posts } from "./utils/displayPosts.js";
import { fetcher } from "./fetcher.js";

console.log('feed-page.js loaded');


// search feature----------------------------------
const searchBar = document.querySelector('#search-bar');
searchBar.addEventListener('input', () => {
  displayPosts(posts, filterPostsHandler);
}); 

function filterPostsHandler(post) {
  const searchInput = searchBar.value.toLowerCase().trim();
  const InputValueMatch = post.title.toLowerCase().includes(searchInput);
}
// end of search feature----------------------------------
async function main() {
  const isLoggedIn = logginChecker();

  if (isLoggedIn) {
    const includeAuthor = true;
    const includeComment = true;
    const includeReaction = true;
    const apiUrl = `https://api.noroff.dev/api/v1/social/posts?_author=${includeAuthor}&_comment=${includeComment}&_reaction=${includeReaction}`;
    const posts = await fetcher(apiUrl, {method: 'GET'}, true);
    displayPosts(posts);
  } else {
    displayLoginPage();
  }
}

main();