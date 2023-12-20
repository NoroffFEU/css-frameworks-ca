import { apiBaseUrl, profileUrl } from "./variables.mjs"; 
import { fetchWithToken } from "./accessToken.mjs";
import { createMessage } from "./errorMessage.mjs";
import { formatDateString } from "./formatDate.mjs";

const user = JSON.parse(localStorage.getItem("userProfile"))

async function fetchUserProfilePosts() {
  return await fetchWithToken(`${apiBaseUrl}${profileUrl}${user.name}?_author=true&_posts=true`);
  
}



/**
 * Creates an HTML card element for a single post.
 * @param {Object} postData The data for the post.
 * @returns {HTMLElement} The generated HTML card element.
 */
const createCardAllPosts = (postData) => {

  console.log(postData);

  const cardColLayout = document.createElement("div");
  cardColLayout.className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3";

  const cardPostContent = document.createElement("a");
  cardPostContent.href = `../post/index.html?id=${postData.id}`;
  cardPostContent.className = "card h-100 my-3";
  cardColLayout.appendChild(cardPostContent);

  const cardPostImage = document.createElement("img");
  // Set the source (src) attribute of the image. Use the postData.media if it's truthy,
  // if not, use the fallback image "../images/no_img.jpg"
  cardPostImage.src = !!postData.media ? postData.media : "../images/no_img.jpg";
  cardPostImage.className = "card-img-top feed-card-img";
  cardPostContent.appendChild(cardPostImage);

  const cardPostTextContent = document.createElement("div");
  cardPostTextContent.className = "card-body px-3 pt-3 pb-0";
  cardPostContent.appendChild(cardPostTextContent);

  const cardPostTitle = document.createElement("h5");
  cardPostTitle.innerText = postData.title;
  cardPostTitle.className = "card-title mb-2";
  cardPostTextContent.appendChild(cardPostTitle);

  const userNameOnCardLayout = document.createElement("div");
  userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
  cardPostTextContent.appendChild(userNameOnCardLayout);

  const profileImageThumbnail = document.createElement("img");
  // Set the source (src) attribute of the image. Use the postData.author.avatar if it's truthy,
  // if not, use the fallback image "../images/no_avatar.jpg"
  profileImageThumbnail.src = !!postData.avatar ? postData.avatar : "../images/no_avatar.jpg";
  profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail";
  userNameOnCardLayout.appendChild(profileImageThumbnail);

  const userName = document.createElement("p");
  userName.innerText = postData.owner;
  userName.className = "mb-0";
  userNameOnCardLayout.appendChild(userName);

  const cardFooterWrapper = document.createElement("div");
  cardFooterWrapper.className = "d-flex align-items-center justify-content-between p-3";
  cardPostContent.appendChild(cardFooterWrapper);

  const cardPostDatePublished = document.createElement("small");
  const formattedDate = formatDateString(postData.created);
  cardPostDatePublished.innerText = formattedDate;
  cardPostDatePublished.className = "text-secondary";
  cardFooterWrapper.appendChild(cardPostDatePublished);

  const sortByButtonWrapper = document.createElement("div");
  sortByButtonWrapper.className = "btn-group";
  cardFooterWrapper.appendChild(sortByButtonWrapper);

  const sortByButton = document.createElement("button");
  sortByButton.className = "btn btn-outline-secondary btn-sm dropdown-toggle d-flex align-items-center";
  sortByButton.type = "button";
  sortByButton.setAttribute("data-bs-toggle", "dropdown");
  sortByButton.setAttribute("aria-expanded", "false");
  sortByButtonWrapper.appendChild(sortByButton);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("fill", "currentColor");
  svg.classList = "bi bi-gear mr-2";
  svg.setAttribute("viewBox", "0 0 16 16");
  sortByButton.appendChild(svg);

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
  );
  svg.appendChild(path1);

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute(
    "d",
    "M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a.873.873 0 0 1 1.255.52l.292-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a.873.873 0 0 1-1.116.291l-.318-.094c-.835-.246-.835-1.428 0-1.674l.319-.094a.873.873 0 0 1 1.115-1.116l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319c-.246-.835-1.428-.835-1.674 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a.873.873 0 0 1-1.116.291l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094a.873.873 0 0 1 1.115-1.116l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
  );
  svg.appendChild(path2);


  const dropDownMenu = document.createElement("div");
  dropDownMenu.className = "dropdown-menu";
  sortByButtonWrapper.appendChild(dropDownMenu);

  const dropDownItemEditPost = document.createElement("a");
  dropDownItemEditPost.className = "dropdown-item";
  dropDownItemEditPost.innerText = "Edit post";
  dropDownItemEditPost.id = "edit-post";

const editPostUrl = `/post/edit.html?id=${postData.id}`;
dropDownItemEditPost.href = editPostUrl;

  dropDownMenu.appendChild(dropDownItemEditPost);

  const dropDownItemDeletePost = document.createElement("a");
  dropDownItemDeletePost.className = "dropdown-item";
  dropDownItemDeletePost.innerText = "Delete post";
  dropDownItemDeletePost.id = "delete-post";
  dropDownMenu.appendChild(dropDownItemDeletePost);

  return cardColLayout;
};

// Targeting DOM elements
const loaderContainer = document.querySelector(".loader-container");
const userPostsContainer = document.querySelector(".user-posts_profile-page");
const errorMessage = createMessage("error");

// Flag to prevent multiple simultaneous loading requests
let loadingPosts = false;

/**
 * Displays post cards by fetching and rendering posts.
 *
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 */
async function displayAllPostsCards() {
  try {
    // If posts are already being loaded, return
    if (loadingPosts) {
      return;
    }

    // Set loading flag to true
    loadingPosts = true;

    // Display loader while posts are being fetched
    loaderContainer.style.display = "block";

    const userObject = await fetchUserProfilePosts();

    userPostsContainer.innerHTML = "";

    const posts = userObject.posts;


    // Iterate over each post data and create a card for each post
    posts.forEach((postData) => {
      // Create a card element for the current post data
      const postCard = createCardAllPosts(postData);
      // Append the generated card to the container for all posts
      userPostsContainer.appendChild(postCard);
    });
  } catch (error) {
    console.log(error);
    // Display error message in case of an error

    userPostsContainer.innerHTML = errorMessage;
    // Rethrow the error for external handling, if necessary
    /*   throw new Error(error); */
  } finally {
    // Reset loading flag and hide loader
    loadingPosts = false;
    loaderContainer.style.display = "none";
  }
}

// Initial call to display blog cards
displayAllPostsCards();
