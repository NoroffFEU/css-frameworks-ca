import { API_ALL_POSTS } from "../common/constant.mjs";

const postContainer = document.querySelector("#post-container");

async function getPosts(url) {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.log('Access token is missing. Redirect to login page.');
            return;
        }

        const queryParams = new URLSearchParams({
            _author: true,
        });

        const fullUrl = `${url}?${queryParams.toString()}`;

        const getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(fullUrl, getOptions);

        if (response.ok) {
            const json = await response.json();
            console.log(json);

            displayPosts(json);
        } else {
            console.log('Error response:', response.status, await response.json());
        }
    } catch (error) {
        console.log(error);
    }
}

getPosts(API_ALL_POSTS);

function createPostHTML(post) {
    const { body, media, created, id, author } = post;

    const card = document.createElement("div");
    card.classList.add("card", "mb-4");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("justify-content-between", "align-items-center", "d-flex");

    const dateContainer = document.createElement("div");

    const userNameElement = document.createElement("h4");
    userNameElement.classList.add("card-title", "user-name");
    userNameElement.innerText = `@${author.name}`;

    const likeButton = document.createElement("button");
    likeButton.classList.add("btn", "btn-link", "like-button");
    likeButton.innerHTML = '<i class="far fa-heart"></i>';

    const postCreated = document.createElement("h6");
    postCreated.classList.add("card-text");
    const createdDate = new Date(created);
    const formattedDateTime = createdDate.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    postCreated.innerText = formattedDateTime;

    cardHeader.appendChild(userNameElement);
    cardHeader.appendChild(likeButton);

    dateContainer.appendChild(postCreated);

    const cardText = document.createElement("p");
    cardText.classList.add("card-text", "my-3");
    cardText.innerText = body;

    cardBody.appendChild(cardHeader);
    cardBody.appendChild(dateContainer);
    cardBody.appendChild(cardText);

    if (media) {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("text-center", "post-image-container");
        imageContainer.style.height = "400px";

        const imageElement = document.createElement("img");
        imageElement.classList.add("post-image", "img-fluid");
        imageElement.style.maxWidth = "100%";
        imageElement.style.maxHeight = "100%";
        imageElement.src = media;

        imageContainer.appendChild(imageElement);
        cardBody.appendChild(imageContainer);
    }

    card.appendChild(cardBody);

    return card;
}


function displayPosts(postsToDisplay) {
    const fragment = document.createDocumentFragment();

    postsToDisplay.forEach((post) => {
        const postHTML = createPostHTML(post);
        fragment.append(postHTML);
    });

    postContainer.innerHTML = '';
    postContainer.append(fragment);
}
