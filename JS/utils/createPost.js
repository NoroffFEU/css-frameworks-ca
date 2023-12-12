import { fetcher } from '../fetcher.js';

console.log('createPost.js loaded');

const addPostForm = document.querySelector('#postForm');
const title = document.querySelector('#postTitle');
const body = document.querySelector('#postText');
const tags = document.querySelector('#postTags');
const media = document.querySelector('#postImage');

async function handleAddPost(){
  const post = {
    title: title.value,
    body: body.value,
    tags: tags.value.split(' '),
    media: media.value,
  }
  console.log(post);
  const response = await fetcher(
    'https://api.noroff.dev/api/v1/social/posts',
    {
    method: 'POST',
    body: JSON.stringify(post),
  }, true
  );
  console.log(response);
}

addPostForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await handleAddPost();
  window.location.reload(); 
});