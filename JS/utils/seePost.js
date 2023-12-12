import { fetcher } from '../fetcher.js';
import { logginChecker } from './loggin-Checker.js';
console.log('seePost.js loaded');

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

async function getPostById(postId) {
  const apiUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}?_author=true&_comments=true&_reactions=true`;
  const singlePost = await fetcher(apiUrl, { method: 'GET' }, true);
  return singlePost;
}

async function loadPostDetails() {
  const post = await getPostById(postId);
  console.log(post);

  const container = document.getElementById('singel-post-display');

  if (!logginChecker()) {
    const loginMessage = document.createElement('div');
    loginMessage.classList.add('col-8', 'bg-primary', 'm-1');
    loginMessage.innerHTML = '<p>Log in to see the post</p>';
    container.appendChild(loginMessage);
    return;
  }

  const postElement = document.createElement('div');
  postElement.classList.add('col-10', 'bg-primary', 'm-1');

  const postTitle = document.createElement('h3');
  postTitle.classList.add('card-title');
  postTitle.textContent = post.title;
  postElement.appendChild(postTitle);

  const authorContainer = document.createElement('div');
  authorContainer.classList.add('d-flex', 'flex-row', 'align-items-center');

  const authorImage = document.createElement('img');
 
if (post.author.avatar === null || post.author.avatar === undefined) {
  authorImage.src = '../images/profile-pictures/default-profile.jpg';
} else {
  authorImage.src = post.author.avatar;
}
authorImage.classList.add('rounded-circle', 'border', 'border-3', 'profile-pictures');
authorImage.alt = 'profile image';
authorContainer.appendChild(authorImage);

  const authorName = document.createElement('p');
  authorName.classList.add('ms-2', 'mt-1');
  authorName.textContent = post.author.name;
  authorContainer.appendChild(authorName);

  postElement.appendChild(authorContainer);

  
  const postImage = document.createElement('img');
  postImage.src = post.media;
  postImage.classList.add('post-img', 'card-img-top', 'mt-2', 'rounded', 'mx-auto', 'd-block');
  postImage.alt = post.title;
  postElement.appendChild(postImage);

 
  const postBody = document.createElement('div');
  postBody.classList.add('card-body');

  const postText = document.createElement('p');
  postText.classList.add('card-text', 'overflow-hidden', 'post-text');
  postText.textContent = post.body;

  postBody.appendChild(postText);
  postElement.appendChild(postBody);

  // Delete post btn
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'bg-primary', 'text-white', 'float-end');
  deleteButton.title = 'delete post';
  deleteButton.innerHTML = '🗑';

  deleteButton.addEventListener('click', function () {
    // Handle delete post logic here later
  });

  postElement.appendChild(deleteButton);

  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('d-flex', 'flex-column', 'flex-sm-row', 'justify-content-evenly', 'mb-3');

  const reactionsDetails = document.createElement('div');
  reactionsDetails.classList.add('p-2');
  reactionsDetails.textContent = `⇧ ${post.reactions.length}`;

  const commentsDetails = document.createElement('div');
  commentsDetails.classList.add('p-2');
  commentsDetails.textContent = `🗨 ${post.comments.length} `;

  const createdDateDetails = document.createElement('div');
  createdDateDetails.classList.add('p-2');
  const shorterDate = post.created.slice(0, 10);
  createdDateDetails.textContent = shorterDate;

  detailsContainer.appendChild(reactionsDetails);
  detailsContainer.appendChild(commentsDetails);
  detailsContainer.appendChild(createdDateDetails);

  postElement.appendChild(detailsContainer);

   container.appendChild(postElement);
    
  // Create a form for submitting comments
  const commentFormContainer = document.createElement('div');
  commentFormContainer.id = 'comment-form'; 
  commentFormContainer.classList.add('col-10', 'bg-primary', 'm-1');

  const commentForm = document.createElement('form');

  const commentInput = document.createElement('textarea');
  commentInput.classList.add('bg-primary', 'm-1', 'mt-2', 'form-control', 'mb-2', 'text-white');
  commentInput.placeholder = 'Add a comment...';
  commentForm.appendChild(commentInput);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add('btn', 'btn-light', 'bg-dark', 'mb-3');
  submitButton.textContent = 'Comment';
  commentForm.appendChild(submitButton);

  // Add an event listener to handle comment submission
  commentForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const commentText = commentInput.value;
      // Assuming you have a function for submitting comments
    // You need to implement this function to send the comment to the server
    await submitComment(postId, commentText);

    // After submitting the comment, you might want to refresh the post details
    // You can call loadPostDetails() again or update the comments section dynamically
  });
  commentFormContainer.appendChild(commentForm);

  // Append the comment form to the main container
  container.appendChild(commentFormContainer);
}


document.addEventListener('DOMContentLoaded', loadPostDetails);