import { generatePostHTML } from './generatePostHTML.js';
import {deletheAndEditBtn} from './deleteAndEditBtn.js';

let posts = [];
console.log('displayPosts.js loaded');

function displayPosts(posts) {
  const postDisplayContainer = document.getElementById("post-display");
  if (!postDisplayContainer) {
    alert("Post display container not found.");
    return;
  }

  let displayedPosts = posts.slice(0, 50); 
  const allPosts = posts;  

   function updatePostsHTML() {
    const postsHTML = displayedPosts.map(post => generatePostHTML(post)).join('');
    postDisplayContainer.innerHTML = postsHTML;
  }

  updatePostsHTML();

  document.getElementById("newest").addEventListener("click", () => {
    displayedPosts = [...allPosts].sort((a, b) => new Date(b.created) - new Date(a.created)).slice(0, 50);
    updatePostsHTML();
    deletheAndEditBtn();
  });

  document.getElementById("oldest").addEventListener("click", () => {
    displayedPosts = [...allPosts].sort((a, b) => new Date(a.created) - new Date(b.created)).slice(0, 50);
    updatePostsHTML();
    deletheAndEditBtn();
  });

  if (posts.length > 50) {
    const loadMoreButton = document.createElement('button');
    loadMoreButton.innerText = 'Load more posts';
    loadMoreButton.classList.add('btn', 'btn-light', 'bg-dark', 'btn-lg', 'mb-3');
    loadMoreButton.addEventListener('click', () => {
      const remainingPosts = allPosts.slice(displayedPosts.length, displayedPosts.length + 50);
      displayedPosts = [...displayedPosts, ...remainingPosts];
      updatePostsHTML();
      if (displayedPosts.length >= allPosts.length) {
        loadMoreButton.remove();
      }
    });
    postDisplayContainer.appendChild(loadMoreButton);
  }
 console.log(allPosts, displayedPosts);
 
 deletheAndEditBtn();

}

export { displayPosts, posts };