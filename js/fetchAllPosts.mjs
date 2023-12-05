import { apiBaseUrl, allPostsApi } from "./script.mjs";
import { fetchPostsWithToken } from "./accessToken.mjs";
import { createMessage } from "./errorMessage.mjs";
import { formatDateString } from "./formatDate.mjs";


/**
 * Fetches all posts with an access token, applying pagination using limit and offset.
 * @param {number} limit The maximum number of posts to fetch.
 * @param {number} offset The offset for paginating through posts.
 * @returns {Promise} A promise representing the asynchronous operation of fetching posts.
 * @example
 * // Example: Fetch all posts with a limit of 10 and offset of 0
 * const posts = await fetchAllPosts(10, 0);
 */
async function fetchAllPosts(limit, offset) {
    return await fetchPostsWithToken(`${apiBaseUrl}${allPostsApi}?_author=true&limit=${limit}&offset=${offset}`);
}

/**
 * Creates an HTML card element for a social app post.
 *
 * @param {Object} postData The data for the post.
 * @returns {HTMLElement} The generated HTML card element.
 */
export function createCardAllPosts(postData) {
    const cardColLayout = document.createElement("div");
    cardColLayout.className = "col-6 col-sm-6 col-md-4 col-lg-3";

    const cardPostContent = document.createElement("a");
    cardPostContent.href = `../post/index.html?id=${postData.id}`
    cardPostContent.className = "card h-100 my-3";
    cardColLayout.appendChild(cardPostContent);


    const cardPostImage = document.createElement("img");
    cardPostImage.src = postData.media;

    
    // Handle errors in case the image fails to load
    cardPostImage.onerror = () => {
       // Remove the error handler to prevent an infinite loop
      cardPostImage.onerror = null;
      // Set the source of the image to a default image when an error occurs
      cardPostImage.src = "../images/no_img.jpg";
    };
    cardPostImage.className = "card-img-top feed-card-img";
    cardPostContent.appendChild(cardPostImage);

    const cardPostTextContent = document.createElement("div");
    cardPostTextContent.className = "card-body py-2 px-3";
    cardPostContent.appendChild(cardPostTextContent);

    const cardPostTitle = document.createElement("h6");
    cardPostTitle.innerText = postData.title;
    cardPostTitle.className = "card-title text-to-uppercase";
    cardPostTextContent.appendChild(cardPostTitle);

    const userNameOnCardLayout = document.createElement("div");
    userNameOnCardLayout.className = "d-flex flex-row align-items-center mb-1";
    cardPostTextContent.appendChild(userNameOnCardLayout);

    const profileImageThumbnail = document.createElement("img");
    profileImageThumbnail.src = postData.author.avatar;
    
    // Handle errors in case the image fails to load
    profileImageThumbnail.onerror = () => {
    // Remove the error handler to prevent an infinite loop
    profileImageThumbnail.onerror = null;
    // Set the source of the image to a default image when an error occurs
    profileImageThumbnail.src = "../images/no_avatar.jpg";
    };
    profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail"
    userNameOnCardLayout.appendChild(profileImageThumbnail);

    const userName = document.createElement("p");
    userName.innerText = postData.author.name;
    userName.className = "mb-0 d-flex align-items-center";
    userNameOnCardLayout.appendChild(userName);

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
const allPostsContainer = document.querySelector(".all-posts_card-container");
const errorMessage = createMessage("error");

// Flag to prevent multiple simultaneous loading requests
let loadingPosts = false;

// Pagination settings
const limit = 99;
const offset = 0;


/**
 * Displays post cards by fetching and rendering posts.
 *
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
*/
async function displayAllPostsCards() {

  try {
  // If posts are already being loaded, return  
  if(loadingPosts) {
    return;
    }

    // Set loading flag to true
    loadingPosts = true;

    // Display loader while posts are being fetched
    loaderContainer.style.display = "block";

     // Fetch posts
    const posts = await fetchAllPosts(limit, offset);
   // Log limit and offset values
   console.log("Limit:", limit);
   console.log("Offset:", offset);
   console.log("Received posts:", posts);  
   // Clear existing cards from the container
   allPostsContainer.innerHTML = '';


    posts.forEach((postData) => {
      const postCard = createCardAllPosts(postData);
      allPostsContainer.appendChild(postCard);
    });

    } catch (error) {
    console.log(error);
    // Display error message in case of an error

    allPostsContainer.innerHTML = errorMessage;
    // Rethrow the error for external handling, if necessary
    throw new Error(error);
  } finally {
    // Reset loading flag and hide loader
    loadingPosts = false;
    loaderContainer.style.display = "none";
  }
} 

// Initial call to display blog cards
displayAllPostsCards();

