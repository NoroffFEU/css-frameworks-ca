import { setupEventListeners } from './uiService.js';
import { fetchPosts, fetchAllTags } from './postService.js';

let state = {
    currentFilter: 'newest',
    searchQuery: '',
    currentOffset: 0,
    limit: 10
};

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners(state);
    fetchAllTags();
    fetchPosts(state.limit, state.currentOffset, state.searchQuery, state.currentFilter);
});

