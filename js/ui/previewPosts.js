
import { deletePost } from '../posts/delete.js';

const DEFAULT_PROFILE_IMAGE_URL = 'https://www.m-boe.com/wp-content/uploads/2024/02/17436199_10155874895574186_1503564674971498559_o.jpg';

export function previewPosts(posts) {
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container', 'col-12', 'p-4', 'bg-light');

    // Klikkbar link som omslutter brukernavn og bilde
    const postLink = document.createElement('a');
    postLink.href = `../../html/feed/singlepost.html?id=${posts.id}`; // Endre URL etter behov
    postLink.classList.add('text-decoration-none', 'text-dark');

    // Brukernavn og tidspunkt
    // const userInfoDiv = document.createElement('div');
    // userInfoDiv.classList.add('d-flex', 'gap-2');
    // const usernameP = document.createElement('p');
    // usernameP.textContent = 'Username'; 
    // const timeAgoP = document.createElement('p');
    // timeAgoP.textContent = 'Time ago'; 
    // userInfoDiv.append(usernameP, timeAgoP);

     // Tittel for posten
     const postTitle = document.createElement('h5');
     postTitle.textContent = posts.title;
    //  postTitle.textContent = post.title ?? 'Post Title'; // Eksempel, erstatt med faktisk data
     postTitle.classList.add('post-title');

    
    // Bilde
    const customImgContainer = document.createElement('div');
    customImgContainer.classList.add('custom-img-container');

    const img = document.createElement('img');
    img.src = posts.media ?? DEFAULT_PROFILE_IMAGE_URL; // Bruk post.media eller en standard URL
    img.alt = 'Image of post';
    img.classList.add('custom-img');

    // Post tekst
    const postTextP = document.createElement('p');
    postTextP.textContent = posts.body; // Bruk postens innholdstekst

    // Ikonene for liker/kommentarer/bookmark
    const iconsDiv = document.createElement('div');
    iconsDiv.classList.add('icons-div', 'm-4', 'd-flex', 'justify-content-around');
    const likeIcon = document.createElement('i');
    likeIcon.classList.add('fa-regular', 'fa-heart', 'px-5');
    const commentIcon = document.createElement('i');
    commentIcon.classList.add('fa-regular', 'fa-comment', 'px-5');
    const bookmarkIcon = document.createElement('i');
    bookmarkIcon.classList.add('fa-regular', 'fa-bookmark', 'px-5');
    iconsDiv.append(likeIcon, commentIcon, bookmarkIcon);

    // Slette- og redigeringsknapper
    const updateButton = document.createElement('button');
    updateButton.textContent = '🌳 Edit';
    updateButton.className = 'btn btn-light btn-custom-size';
    updateButton.addEventListener('click', () => window.location.href = `../../html/feed/singlepost.html?id=${posts.id}`); 

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🌵 Delete';
    deleteButton.className = 'btn btn-light btn-custom-size'
    deleteButton.addEventListener('click', () => deletePost(posts.id));

    // Legger til innhold i postLink og deretter i postContainer
    customImgContainer.appendChild(img);
    postLink.append(postTitle, img, postTextP);
    postContainer.append(postLink, iconsDiv, updateButton, deleteButton);

    return postContainer;
}
