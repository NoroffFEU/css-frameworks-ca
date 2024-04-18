function filterPosts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const posts = document.querySelectorAll('.card');

    posts.forEach(post => {
        const text = post.textContent.toLowerCase();
        post.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function sortPosts() {
    const sortBy = document.getElementById('sortSelect').value;
    const postsContainer = document.querySelector('.row');
    let posts = Array.from(postsContainer.getElementsByClassName('card'));

    if (sortBy === 'title') {
        posts.sort((a, b) => a.querySelector('.card-title').textContent.localeCompare(b.querySelector('.card-title').textContent));
    } else if (sortBy === 'date') {
        posts.sort((a, b) => new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date')));
    }

    
    posts.forEach(post => postsContainer.appendChild(post));
}

