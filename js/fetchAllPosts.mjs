import { apiBaseUrl, allPostsApi } from "./script.mjs";
import { fetchPostsWithToken } from "./accessToken.mjs";
import { createMessage } from "./errorMessage.mjs";




async function fetchAllPosts() {
    return await fetchPostsWithToken(`${apiBaseUrl}${allPostsApi}`);
}

fetchAllPosts();

//Create Card Post
function createCardAllPosts(postData) {
    const allPostsContainer = document.createElement("div");
    allPostsContainer.className = "container mt-4";

    const cardRowLayout = document.createElement("div");
    cardRowLayout.className = "row";
    allPostsContainer.appendChild(cardRowLayout);

    const cardColLayout = document.createElement("div");
    cardColLayout.className = "col-6 col-sm-6 col-md-4 col-lg-3";
    cardRowLayout.appendChild(cardColLayout);

    const cardPostContent = document.createElement("div");
    cardPostContent.className = "card h-80 my-3";
    cardColLayout.appendChild(cardPostContent);

    const cardPostImage = document.createElement("img");
    cardPostImage.src = postData.media;
    cardPostImage.className = "card-img-top feed-card-img";
    cardPostContent.appendChild(cardPostImage);

    const cardPostTextContent = document.createElement("div");
    cardPostTextContent.className = "card-body py-2 px-3";
    cardPostContent.appendChild(cardPostTextContent);

    const cardPostTitle = document.createElement("h6");
    cardPostTitle.className = "card-title";
    cardPostTextContent.appendChild(cardPostTitle);

    const userNameOnCardLayout = document.createElement("div");
    userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
    cardPostTextContent.appendChild(userNameOnCardLayout);

    const profileImageThumbnail = createElement("img");
    profileImageThumbnail.src = postData.media;
    profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail"
    // profileImageThumbnail.setAttribute("alt", )
    userNameOnCardLayout.appendChild(profileImageThumbnail);

    const userName = document.createElement("p");
    userName.src = postData.author.name;
    userName.className = "mb-0 d-flex align-items-center";
    userNameOnCardLayout.appendChild(userName);

    const cardPostDatePublishedWrapper = document.createElement("div");
    cardPostDatePublishedWrapper.className = "card-footer text-end";
    cardPostContent.appendChild(cardPostDatePublishedWrapper);

    const cardPostDatePublished = document.createElement("small");
    cardPostDatePublished.src = postData.created;
    cardPostDatePublished.className = "text-secondary";
    cardPostDatePublishedWrapper.appendChild(cardPostDatePublished);

    return allPostsContainer;
}


// Display Blog Cards
const loaderContainer = document.querySelector(".loader-container");
const allPostsContainer = document.querySelector(".all-posts_card-container");
const errorMessage = createMessage("error");



// Display blog cards
async function displayAllPostsCards() {
  try {
    //
    } catch (error) {
    console.log(error);
    allPostsContainer.innerHTML = errorMessage;
    throw new Error(error);
  } finally {
    loaderContainer.style.display = "none";
  }
}

displayAllPostsCards();