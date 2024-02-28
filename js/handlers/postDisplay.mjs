import { getPosts } from "../api/posts/get.mjs";
import { renderPostTemplate } from "../templates/post.mjs";
import { load } from "../storage/index.mjs";

export async function displayPosts() {
  try {
    const posts = await getPosts();
    const container = document.querySelector("#posts");
    container.innerHTML = ""; // Clear the existing content
    posts.forEach((postData) => {
      renderPostTemplate(postData, container);
    });
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}

// displaying users posts on profile page
const postLimit = 10;
let displayedUserPostsCount = 0;
let userPosts = [];

export async function displayUserPosts() {
  try {
    userPosts = await getPosts();
    const container = document.querySelector("#userPosts");
    const showMoreBtn = document.querySelector("#showMoreBtn");
    container.innerHTML = ""; // Clear the existing content

    const userProfile = load("profile");
    const currentUserEmail = userProfile.email;

    let displayedCount = 0;

    userPosts.forEach((postData) => {
      if (
        displayedCount < displayedUserPostsCount + postLimit &&
        postData.author.email === currentUserEmail
      ) {
        renderPostTemplate(postData, container);
        displayedCount++;
      }
    });

    displayedUserPostsCount = displayedCount;

    // Show more button
    showMoreBtn.style.display =
      displayedUserPostsCount < userPosts.length ? "block" : "none";

    showMoreBtn.addEventListener("click", () => {
      appendMoreUserPosts(container, currentUserEmail);
    });
  } catch (error) {
    console.error("Error fetching and displaying user posts:", error);
  }
}

// Function to append more user posts when "Show More" button is clicked
function appendMoreUserPosts(container, currentUserEmail) {
  let additionalPostsCount = 0;

  // Filter out posts that do not match the current user's email
  const userPostsToAppend = userPosts.filter(
    (postData) => postData.author.email === currentUserEmail
  );

  for (
    let i = displayedUserPostsCount;
    i < userPostsToAppend.length && additionalPostsCount < postLimit;
    i++
  ) {
    const postData = userPostsToAppend[i];
    renderPostTemplate(postData, container);
    additionalPostsCount++;
  }

  displayedUserPostsCount += additionalPostsCount;

  // Update the display of the "Show More" button
  const showMoreBtn = document.querySelector("#showMoreBtn");
  if (displayedUserPostsCount >= userPostsToAppend.length) {
    showMoreBtn.disabled = true; // Disable the button if all posts have been displayed
  } else {
    showMoreBtn.disabled = false; // Enable the button if there are more posts to display
  }
}
