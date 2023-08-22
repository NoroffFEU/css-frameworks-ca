
// feed items, using placeholder images for dummy-posts

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPlaceholderImageUrl(seed) {
  return `https://placekitten.com/${seed}/${seed}`;
}

function addPostThumbnail(title) {
  const seed = getRandomNumber(200, 400); 
  const imageUrl = getPlaceholderImageUrl(seed);

  const postList = document.getElementById('post-list');
  const postThumbnail = document.createElement('div');
  postThumbnail.classList.add('col-md-4', 'post-thumbnail');
  postThumbnail.innerHTML = `
      <div class="card">
          <img src="${imageUrl}" class="card-img-top" alt="Post image, with description of the post">
          <div class="card-body">
              <h6 class="card-title">${title}</h6>
          </div>
      </div>
  `;
  postList.appendChild(postThumbnail);
}

// example posts, not clickable
addPostThumbnail('Hightlighted photo of the week');
addPostThumbnail('Hightlighted post');
addPostThumbnail('This months treat');
addPostThumbnail('How to-post');
addPostThumbnail('UX/UI tips from a pro');
addPostThumbnail('More posts');





