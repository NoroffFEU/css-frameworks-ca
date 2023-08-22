// Use a placeholder URL for post images
const placeholderPostImageUrl = 'https://placekitten.com/300/300';

// Function to add a new post thumbnail to the feed
function addPostThumbnail(title, imageUrl) {
    const postList = document.getElementById('post-list');
    const postThumbnail = document.createElement('div');
    postThumbnail.classList.add('col-md-4', 'post-thumbnail');
    postThumbnail.innerHTML = `
        <div class="card">
            <img src="${imageUrl}" class="card-img-top" alt="Post Image">
            <div class="card-body">
                <h6 class="card-title">${title}</h6>
            </div>
        </div>
    `;
    postList.appendChild(postThumbnail);
}

// Add example posts
addPostThumbnail('Cute Kitten 1', placeholderPostImageUrl);
addPostThumbnail('Adorable Cat 2', placeholderPostImageUrl);
addPostThumbnail('Playful Kitty 3', placeholderPostImageUrl);
addPostThumbnail('Sweet Feline 4', placeholderPostImageUrl);
