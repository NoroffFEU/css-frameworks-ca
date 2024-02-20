// Funksjoner for å håndtere opprettelse, visning, redigering, og sletting av innlegg



// Modal 

// // Få modalen
// var modal = document.getElementById("createPostModal");

// // Få knappen som åpner modalen
// var btn = document.getElementById("myBtn");

// // Få <span> elementet som lukker modalen
// var span = document.getElementsByClassName("close-button")[0];

// // Når brukeren klikker på knappen, åpne modalen
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// // Når brukeren klikker på <span> (x), lukk modalen
// span.onclick = function() {
//     modal.style.display = "none";
// }

// // Når brukeren klikker hvor som helst utenfor modalen, lukk den
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }






// export async function getPosts() {
//     const response = await fetch(BASE_URL +"/social/posts", {
//         headers: {
//             Authorization: `Bearer ${load("token")}`
//         }
//     });
//     return await response.json();
// }




import { POSTS_URL } from '../shared/constans.js';
import { doFetch } from '../handlers/fetch.js';

const DEFAULT_PROFILE_IMAGE_URL = 'https://www.m-boe.com/wp-content/uploads/2024/02/17436199_10155874895574186_1503564674971498559_o.jpg';

const generateSinglePostHtml = (post) => {
    console.log(post);
    const postContainer = document.createElement('div');

    const postLink = document.createElement('a');
    postLink.href = `../../html/feed/singlepost.html?id=${post.id}`;

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;

    postLink.append(postTitle);

    const postBody = document.createElement('p');
    postBody.textContent = post.body;

    const postImageContainer = document.createElement('div');

    let postImageUrl = post.media ?? DEFAULT_PROFILE_IMAGE_URL;
    const postImage = document.createElement('img');
    postImage.src = postImageUrl;

    postImageContainer.append(postImage);

    postContainer.append(postLink, postBody, postImageContainer);

    return postContainer;
    
}

const SHOW_REACTIONS = false;

// function filterReactionPosts() {
    
// }


function displayPost(post) {
    const postDisplayContainer = document.querySelector(
        '#post-display-container',
        );

    postDisplayContainer.textContent = ''; //clear the container
    // console.log(post);

    post
        .filter((post) => {
            if (SHOW_REACTIONS) {
                if (post._count.reactions > 0) {
                    return true;
                }
            } else {
                return true;
            }
        })

    post.forEach ((post) => {
        const postHtml = generateSinglePostHtml(post);
        postDisplayContainer.appendChild(postHtml);
    });
}

// function displayPosts();
// console.log(posts);

async function getPost() {
    console.log('Getting post');
    const post = await doFetch(POSTS_URL, true);
    if (post) {
        displayPost(post);
    }
    // console.log(post);
}

function main() {
    getPost();
}

main();