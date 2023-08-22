function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function addUserPost(title) {
    const userPosts = document.getElementById('user-posts');
    const userPost = document.createElement('div');
    userPost.classList.add('col-md-6', 'user-post');
    
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

addUserPost('Life of a UX/UI developer');
addUserPost('Explroing the Bjørnepark');
addUserPost('New week, new day');
addUserPost('Curiousities in the UX world')
