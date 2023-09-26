import { fetchWithToken } from './postFetch.js';
import { filterAndSort } from './filterAndSort.js';





const ApiUrl = 'https://api.noroff.dev';

fetchWithToken(ApiUrl + '/api/v1/social/posts');
filterAndSort();
console.log(filterAndSort);







import { createNewPost } from './post.js';

const postForm = document.getElementById('postForm');

postForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const postTitle = document.getElementById('postTitle').value;
  const postContent = document.getElementById('postContent').value;

  const accessToken = localStorage.getItem('accessToken');

  const newPost = await createNewPost(postTitle, postContent, accessToken);

  if (newPost) {
    const postContainer = document.getElementById('postContainer');
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML =
      `<h3 class="content-font">${newPost.title}</h3>
      <p class="content-font">${newPost.body}</p>`;

    postContainer.appendChild(postElement);

    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
  }
});

