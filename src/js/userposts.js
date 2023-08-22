//placeholders for the user posts

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
} // to make sure the posts gets randomised images

function addUserPost(title) {
    const userPosts = document.getElementById('user-posts');
    const userPost = document.createElement('div');
    userPost.classList.add('col-md-6', 'user-post');
    
    const randomWidth = getRandomNumber(300, 400);
    const randomHeight = getRandomNumber(300, 400);
    const placeholderPostImageUrl = `https://placebear.com/${randomWidth}/${randomHeight}`;
    
    userPost.innerHTML = `
        <div class="card">
            <img src="${placeholderPostImageUrl}" class="card-img-top" alt="Post image">
            <div class="card-body">
                <h6 class="card-title">${title}</h6>
            </div>
        </div>
    `;
    userPosts.appendChild(userPost);
}

//example 

addUserPost('Life of a UX/UI developer');
addUserPost('Explroing the Bjørnepark');
addUserPost('New week, new day');
addUserPost('Curiousities in the UX world')
