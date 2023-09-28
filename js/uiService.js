import { fetchPosts, updatePost, deletePost, createPost } from './postService.js';
/**
 * Sets up event listeners for various UI elements.
 * @function
 * @param {Object} state - The state object containing current filter, search query, offset, and limit.
 */
export function setupEventListeners(state) {
    const searchBar = document.getElementById('searchBar');
    const nextPage = document.getElementById('nextPage');
    const prevPage = document.getElementById('prevPage');
    const sortNewest = document.getElementById('sortNewest');
    const sortOldest = document.getElementById('sortOldest');
    const sortPopular = document.getElementById('sortPopular');
    const tagFilter = document.getElementById('tagFilter');
    const postForm = document.getElementById('postForm');

    if (searchBar) {
        searchBar.addEventListener('input', (event) => {
            event.preventDefault();
            searchQuery = event.target.value;
            window.history.pushState(null, '', `?searchQuery=${searchQuery}`);
            fetchPosts();
        });
    }

    if (nextPage) {
        nextPage.addEventListener('click', () => {
            currentOffset += limit;
            fetchPosts();
        });
    }

    if (prevPage) {
        prevPage.addEventListener('click', () => {
            currentOffset = Math.max(0, currentOffset - limit);
            fetchPosts();
        });
    }

    if (sortNewest) {
        sortNewest.addEventListener('click', () => {
            currentFilter = 'newest';
            fetchPosts();
        });
    }

    if (sortOldest) {
        sortOldest.addEventListener('click', () => {
            currentFilter = 'oldest';
            fetchPosts();
        });
    }

    if (sortPopular) {
        sortPopular.addEventListener('click', () => {
            currentFilter = 'popular';
            fetchPosts();
        });
    }

    if (tagFilter) {
        tagFilter.addEventListener('change', () => {
            currentOffset = 0;
            fetchPosts();
        });
    }

    document.addEventListener('DOMContentLoaded', fetchPosts);

    if (postForm) {
        postForm.addEventListener('submit', createPost);
    }

    document.addEventListener('DOMContentLoaded', () => {
        fetchAllTags();
        fetchPosts();
    });
}

