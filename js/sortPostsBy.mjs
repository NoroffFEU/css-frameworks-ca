import { fetchPostsWithToken } from "./accessToken.mjs";
import { apiBaseUrl, allPostsApi } from "./variables.mjs";
import { formatDateString } from "./formatDate.mjs";

// Array to store fetched posts
let posts = [];

// URL to the fetch API
const APIURL = `${apiBaseUrl}${allPostsApi}?_author=true`;

/**
 * Renders all the posts in the selected container.
 *
 * @param {Object[]} posts An array of post objects to be rendered.
 * @example
 * Assume filteredPosts is an array of post objects obtained through some filtering mechanism.
 * renderPosts(filteredPosts);
 */
const renderPosts = (posts) => {
  const postsContainer = document.querySelector(".all-posts_card-container");
  postsContainer.innerHTML = "";

  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value;

  if (posts.length === 0) {
    // If no posts are found, display a message
    const noResultsMessage = document.createElement("p");
    noResultsMessage.className = "d-flex justify-content-center bold";
    noResultsMessage.innerText = `Search result "${searchTerm}" not found.`;
    postsContainer.appendChild(noResultsMessage);
    console.log(noResultsMessage);
  } else {
    // Render the posts
    posts.forEach((postData) => {
      const cardColLayout = document.createElement("div");
      cardColLayout.className = "col-6 col-sm-6 col-md-4 col-lg-3";

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
      // Set the source (src) attribute of the image. Use the postData.author.avatar if it's truthy,
      // if not, use the fallback image "../images/no_avatar.jpg"
      profileImageThumbnail.src = !!postData.author.avatar ? postData.author.avatar : "../images/no_avatar.jpg";
      profileImageThumbnail.className = "rounded-circle me-1 profile-img-thumbnail";
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

      postsContainer.appendChild(cardColLayout);
    });
  }
};

function sortPostsNewest(posts) {
  const sortedArray = posts.sort(function (a, b) {
    const timeA = new Date(a.updated);
    const timeB = new Date(b.updated);
    return timeB - timeA; // Compare timestamps in descending order
  });
  return sortedArray;
}

function sortPostsOldest(posts) {
  const sortedArray = posts.sort(function (a, b) {
    const timeA = new Date(a.updated);
    const timeB = new Date(b.updated);
    return timeA - timeB; // Compare timestamps in ascending order
  });
  return sortedArray;
}

const sortButtonsContainer = document.querySelector("#sort-buttons");

sortButtonsContainer.addEventListener("click", function (event) {
  if (event.target.id === "newest") {
    const sortedArray = sortPostsNewest(posts);
    renderPosts(sortedArray);
  } else if (event.target.id === "oldest") {
    const sortedArray = sortPostsOldest(posts);
    renderPosts(sortedArray);
  }
});

const initializeSortPosts = async () => {
  try {
    // Fetch posts from the API
    posts = await fetchPostsWithToken(APIURL);
    // Render the fetched posts
    renderPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// Call the initialize function to start the app
initializeSortPosts();
