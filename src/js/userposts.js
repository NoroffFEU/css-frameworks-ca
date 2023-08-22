// Function to generate a random number between min (inclusive) and max (exclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Function to add a user post to the profile page
function addUserPost(title) {
    const userPosts = document.getElementById('user-posts');
    const userPost = document.createElement('div');
    userPost.classList.add('col-md-6', 'user-post');
    
    // Generate random dimensions for the placeholder image
    const randomWidth = getRandomNumber(300, 500);
    const randomHeight = getRandomNumber(300, 500);
    const placeholderPostImageUrl = `https://placebear.com/${randomWidth}/${randomHeight}`;
    
    userPost.innerHTML = `
        <div class="card">
            <img src="${placeholderPostImageUrl}" class="card-img-top" alt="Post Image">
            <div class="card-body">
                <h6 class="card-title">${title}</h6>
            </div>
        </div>
    `;
    userPosts.appendChild(userPost);
}

// Add example user posts
addUserPost('My First Post');
addUserPost('Memories from the Beach');
addUserPost('Exploring New Places');
