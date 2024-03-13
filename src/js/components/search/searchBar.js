import { searchPosts } from "../../api/posts/searchPosts.js";

export function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchTemplate = document.getElementById('searchTemplate');

    searchResults.classList.add('d-none');


    searchInput.addEventListener('input', async (event) => {
        const searchText = event.target.value.trim();

        searchResults.innerHTML = '';

        if (searchText.length > 0) {
            try {
                const searchResultsData = await searchPosts(searchText);
                renderSearchResults(searchResultsData, searchTemplate);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
    });
}

function renderSearchResults(results, searchTemplate) {
    searchResults.innerHTML = '';
    searchResults.style.maxHeight = '200px';
    searchResults.style.overflowY = 'auto';


    results.data.forEach(result => {
        const searchPosts = searchTemplate.cloneNode(true);
        searchPosts.classList.remove('d-none');
        searchResults.classList.remove('d-none');


        searchPosts.setAttribute('href', `post/?id=${result.id}`);
        searchPosts.setAttribute('data-post-index', result.id);

        searchPosts.querySelector('.search-title').textContent = result.title;
        searchPosts.querySelector('.search-author').textContent = `By: ${result.author.name}`;

        searchResults.appendChild(searchPosts);
    });
}

