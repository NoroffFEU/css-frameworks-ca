import { getPosts } from "../../api/posts/get.mjs";
import { renderPostTemplate } from "../../templates/index.mjs";
import { displayPosts } from "./displayPosts.mjs";
import { showMessage } from "../../utils/messages.mjs";

const sortOptionsSelect = document.getElementById("sortOptions");

// Function to handle sort option change
export async function handleSortOptionChange() {
  const selectedValue = sortOptionsSelect.value;
  const container = document.querySelector("#posts");
  container.innerHTML = ""; // Clear the existing content

  try {
    if (selectedValue === "mostLiked") {
      await sortReactionPosts(container); // Sort posts by likes
    } else if (selectedValue === "mostComments") {
      await sortCommentPosts(container, "comments"); // Sort posts by comments
    } else if (selectedValue === "withImage") {
      await sortImagePosts(container); // Sort posts by images
    } else if (selectedValue === "newestPosts") {
      await displayPosts(container); // Display all posts
    } else if (selectedValue === "oldestposts") {
      await sortOldestPosts(container);
    }
  } catch (error) {
    console.error("Error sorting posts:", error);
    showMessage("Failed to sort posts. Please try again.", "error");
  }
}

// Function to sort and render posts based on reactions
export async function sortReactionPosts(container) {
  try {
    const posts = await getPosts();

    const sortedPosts = posts.sort(
      (a, b) => b._count.reactions - a._count.reactions
    );

    sortedPosts.forEach((post) => {
      renderPostTemplate(post, container);
    });
  } catch (error) {
    console.error("Error sorting posts:", error);
    showMessage("Failed to sort posts. Please try again.", "error");
  }
}

// Function to sort and render posts based on comments
export async function sortCommentPosts(container) {
  try {
    const posts = await getPosts();

    const sortedPosts = posts.sort(
      (a, b) => b._count.comments - a._count.comments
    );

    sortedPosts.forEach((post) => {
      renderPostTemplate(post, container);
    });
  } catch (error) {
    console.error("Error sorting posts:", error);
    showMessage("Failed to sort posts. Please try again.", "error");
  }
}

// Function to sort and render posts based on images
export async function sortImagePosts(container) {
  try {
    const posts = await getPosts();

    const sortedPosts = posts.filter(
      (post) => post.media && post.media.length > 0
    );

    sortedPosts.forEach((post) => {
      renderPostTemplate(post, container);
    });
  } catch (error) {
    console.error("Error sorting posts:", error);
    showMessage("Failed to sort posts. Please try again.", "error");
  }
}

export async function sortOldestPosts(container) {
  try {
    const posts = await getPosts();

    const sortedPosts = posts.sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return dateA - dateB;
    });

    sortedPosts.forEach((post) => {
      renderPostTemplate(post, container);
    });
  } catch (error) {
    console.error("Error sorting posts:", error);
    showMessage("Failed to sort posts. Please try again.", "error");
  }
}

if (sortOptionsSelect) {
  sortOptionsSelect.addEventListener("change", handleSortOptionChange);
}

// Reset sort upon page load
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#posts");
  if (container) {
    // Set the default value for the sort options
    const sortOptionsSelect = document.getElementById("sortOptions");
    if (sortOptionsSelect) {
      sortOptionsSelect.value = "newestPosts";
      sortOptionsSelect.dispatchEvent(new Event("change"));
    }
  }
});
