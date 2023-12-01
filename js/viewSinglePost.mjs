import { apiBaseUrl, allPostsApi } from "./script.mjs";
import { createMessage } from "./errorMessage.mjs";
import { formatDateString } from "./formatDate.mjs";
import { fetchPostsWithToken } from "./accessToken.mjs";


// Query string parameter
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");


async function fetchSinglePost(id) {
    return await fetchPostsWithToken(`${apiBaseUrl}${allPostsApi}/${id}?_author=true`);
}



function createCardSinglePost(postData) {
    const cardColLayout = document.createElement("div");
    cardColLayout.className = "col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5";

    const cardPostContent = document.createElement("div");
    cardPostContent.className = "card mb-5";
    cardColLayout.appendChild(cardPostContent);

    const cardPostImage = document.createElement("img");
      if (postData.media) {
        cardPostImage.src = postData.media;
      } else {
        cardPostImage.src = "../images/no_img.jpg";
      }
    cardPostImage.className = "card-img-top single-post-img";
    cardPostContent.appendChild(cardPostImage);

    const cardPostTextContent = document.createElement("div");
    cardPostTextContent.className = "card-body";
    cardPostContent.appendChild(cardPostTextContent);

    const cardPostTitle = document.createElement("h5");
    cardPostTitle.innerText = postData.title;
    cardPostTitle.className = "card-title mb-2 text-to-uppercase";
    cardPostTextContent.appendChild(cardPostTitle);

    const userNameOnCardLayout = document.createElement("div");
    userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
    cardPostTextContent.appendChild(userNameOnCardLayout);

    const profileImageThumbnail = document.createElement("img");
      if (postData.media) {
        profileImageThumbnail.src = postData.author.avatar;
      } else {
        profileImageThumbnail.src = "../images/no_avatar.jpg";
      } 
    profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail"
    userNameOnCardLayout.appendChild(profileImageThumbnail);

    const userName = document.createElement("p");
    userName.innerText = postData.author.name;
    userName.className = "mb-0";
    userNameOnCardLayout.appendChild(userName);

    const cardPostText = document.createElement("p");
    cardPostText.innerText = postData.body;
    cardPostText.className = "card-text";
    cardPostTextContent.appendChild(cardPostText)

    const cardPostDatePublishedWrapper = document.createElement("div");
    cardPostDatePublishedWrapper.className = "card-footer text-end";
    cardPostContent.appendChild(cardPostDatePublishedWrapper);

    const cardPostDatePublished = document.createElement("small");
    const formattedDate = formatDateString(postData.created);
    cardPostDatePublished.innerText = formattedDate;
    cardPostDatePublished.className = "text-secondary";
    cardPostDatePublishedWrapper.appendChild(cardPostDatePublished);

    return cardColLayout;
}

// Targeting DOM elements
const loaderContainer = document.querySelector(".loader-container");
const singlePostContainer = document.querySelector("#post-single-container");
const errorMessage = createMessage("error");


async function displaySinglePostCard() {
  try {
    const jsonSpecific = await fetchSinglePost(id);
    const singlePostCard = createCardSinglePost(jsonSpecific);
    singlePostContainer.appendChild(singlePostCard);
  } catch (error) {
    console.log(error);

    singlePostContainer.innerHTML = errorMessage;
    throw new Error(error);
  } finally {
    loaderContainer.style.display = "none";
 
  }
}

displaySinglePostCard();