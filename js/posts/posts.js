
import { POSTS_URL } from '../shared/constans.js';
import { doFetch } from '../shared/fetch.js';
import { previewPosts } from '../ui/previewPosts.js';
import { detailPost } from '../ui/detailPost.js';
import { filterPostBySearchTerm } from '../handlers/search.js';
import { sortPost } from '../handlers/sort.js'; 

const SHOW_REACTIONS = false;


async function getPosts(searchTerm = '', sortType = '') {
    console.log('Getting posts');
    try {
        let posts = await doFetch(POSTS_URL, true);
        if (searchTerm) {
            posts = filterPostBySearchTerm(posts, searchTerm);
        }
        if (sortType) {
            posts = sortPost(posts, sortType);
        }
        if (posts) {
            displayPosts(posts);
        }
    } catch (error) {
        console.error('Failed to get posts:', error);
    }
}


function displayPosts(posts) {
    const postDisplayContainer = document.querySelector('#preview-post-container');
    postDisplayContainer.textContent = ''; 

    posts.forEach((post) => {
        const postHtml = previewPosts(post);
        postDisplayContainer.appendChild(postHtml);
        
    });
}


function displayDetailPost(post) {
    // console.log('hello world');
      const postDisplayContainer = document.querySelector(
        '#detail-post-container',
      );
      postDisplayContainer.append(detailPost(post));
    }
  
  
async function main() {      
    const searchParams = new URLSearchParams(window.location.search);
  
    if (searchParams.has('id')) {
        const postId = searchParams.get('id');
        const postUrl = `${POSTS_URL}/${postId}`;
        const post = await doFetch(postUrl, true);
  
        console.log(post.id);
  
        displayDetailPost(post);

    }  else {
        setupEventListeners();
        getPosts(); // Kaller getPosts for å hente alle poster ved oppstart
    }  
}
  

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        getPosts(searchTerm); // Oppdater getPosts for å ta imot et søkeord
    });
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const sortType = this.getAttribute('data-sort');
            getPosts(searchInput.value, sortType); // Oppdater getPosts for å inkludere sortType
        });
    });
}


main();





















