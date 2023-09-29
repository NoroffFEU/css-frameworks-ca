import { fetchPosts, updatePost, deletePost, createPost } from './postService.js';
import { fetchAllTags } from './postService.js';
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
    const tagFilter = document.getElementById('tagFilter');
    const postForm = document.getElementById('postForm');

    if (searchBar) {
        searchBar.addEventListener('input', (event) => {
            event.preventDefault();
            state.searchQuery = event.target.value;
            window.history.pushState(null, '', `?searchQuery=${state.searchQuery}`);
            fetchPosts(state.limit, state.currentOffset, state.searchQuery, state.currentFilter);
        });
    }

    if (nextPage) {
        nextPage.addEventListener('click', () => {
            state.currentOffset += state.limit;
            fetchPosts(state.limit, state.currentOffset, state.searchQuery, state.currentFilter);
        });
    }

    if (prevPage) {
        prevPage.addEventListener('click', () => {
            state.currentOffset = Math.max(0, state.currentOffset - state.limit);
            fetchPosts(state.limit, state.currentOffset, state.searchQuery, state.currentFilter);
        });
    }

    if (sortNewest) {
        sortNewest.addEventListener('click', () => {
            state.currentFilter = 'newest';
            fetchPosts(state.limit, state.currentOffset, state.searchQuery, state.currentFilter);
        });
    }


    if (sortOldest) {
        sortOldest.addEventListener('click', () => {
            state.currentFilter = 'oldest';
            fetchPosts(state.limit, state.currentOffset, state.searchQuery, state.currentFilter);
        });
    }
    if (tagFilter) {
        tagFilter.addEventListener('change', () => {
            const selectedTag = tagFilter.value; // Get the selected tag
            state.currentOffset = 0;
            fetchPosts(state.limit, state.currentOffset, state.searchQuery, state.currentFilter, selectedTag);
        });
    }

    document.addEventListener('DOMContentLoaded', () => fetchPosts(state.limit, state.currentOffset, state.searchQuery, state.currentFilter));

    if (postForm) {
        postForm.addEventListener('submit', createPost);
    }

    document.addEventListener('DOMContentLoaded', () => {
        fetchAllTags();
        fetchPosts(state.limit, state.currentOffset, state.searchQuery, state.currentFilter);
    });
}

