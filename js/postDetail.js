document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (postId) {
        fetchPostById(postId);
    }
});


async function fetchPostById(id) {
    const response = await fetch(`/social/posts/${id}`);
    const post = await response.json();
    displayPostDetails(post);
}

function displayPostDetails(post) {
    const postDetailsDiv = document.getElementById('postDetails');
    postDetailsDiv.innerHTML = `
        <div class="card">
            <img src="${post.media || '/img/panda.jpg'}" class="card-img-top" alt="Post Image">
            <div class="card-body">
                <h1 class="card-title">${post.title}</h1>
                <p class="card-text">${post.body}</p>
        </div>
    `;
}
