import { getPosts } from "../../api/posts/get.mjs";
import { renderPostTemplate } from "../../templates/index.mjs";
import { displayPosts } from "../../handlers/posts/displayPosts.mjs";
import { showMessage } from "../../utils/messages.mjs";

const sortOptionsSelect = document.getElementById("sortOptions");

// Function to handle sort option change
export async function handleSortOptionChange() {
  const selectedValue = sortOptionsSelect.value;
  const container = document.querySelector("#posts");
  container.innerHTML = ""; // Clear the existing content

  try {
    if (selectedValue === "mostLiked") {
      await filterReactionPosts(container); // Sort posts by likes
    } else if (selectedValue === "mostComments") {
      await filterCommentPosts(container); // Sort posts by comments
    } else if (selectedValue === "withImage") {
      await filerImagePosts(container); // Sort posts by images
    } else {
      await displayPosts(container); // Display all posts
    }
  } catch (error) {
    console.error("Error filtering posts:", error);
    showMessage("Failed to filter posts. Please try again.", "error");
  }
}

// Function to filter and render posts based on reactions
export async function filterReactionPosts(container) {
  try {
    const posts = await getPosts();

    const sortedPosts = posts.sort(
      (a, b) => b._count.reactions - a._count.reactions
    );

    sortedPosts.forEach((post) => {
      renderPostTemplate(post, container);
    });
  } catch (error) {
    console.error("Error filtering posts:", error);
    showMessage("Failed to filter posts. Please try again.", "error");
  }
}

// Function to filter and render posts based on comments
export async function filterCommentPosts(container) {
  try {
    const posts = await getPosts();

    const sortedPosts = posts.sort(
      (a, b) => b._count.comments - a._count.comments
    );

    sortedPosts.forEach((post) => {
      renderPostTemplate(post, container);
    });
  } catch (error) {
    console.error("Error filtering posts:", error);
showMessage("Failed to filter posts. Please try again.", "error");
  }
}

// Function to filter and render posts based on images
export async function filerImagePosts(container) {
  try {
    const posts = await getPosts();

    const sortedPosts = posts.filter(
      (post) => post.media && post.media.length > 0
    );

    sortedPosts.forEach((post) => {
      renderPostTemplate(post, container);
    });
  } catch (error) {
    console.error("Error filtering posts:", error);
showMessage("Failed to filter posts. Please try again.", "error");
  }
}

if (sortOptionsSelect) {

sortOptionsSelect.addEventListener("change", handleSortOptionChange);
}