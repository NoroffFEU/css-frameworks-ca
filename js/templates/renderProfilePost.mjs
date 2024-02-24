import { getUserName } from "../handler/storage.mjs";

/**
 * Renders all posts of the currently logged in user.
 * It gets the username from storage, filters the posts by the username, and appends the posts to the container.
 * It also displays the username and hides the spinner.
 *
 * @param {Array} posts - The posts to render.
 */

export function renderProfilePosts(posts) {
  const username = getUserName();
  const userPosts = posts.filter((post) => post.author.name === username);
  const container = document.querySelector("#card");
  const spinner = document.querySelector(".spinner-border");

  const showUserName = document.querySelector("#show-username");
  showUserName.textContent = username;

  // container.innerHTML = "";
  const allPostsHtml = userPosts.map((post) => {
    return displayPost(post);
  });

  container.append(...allPostsHtml);

  spinner.style.display = "none";
}
/**
 * Generates the HTML for a post.
 * It creates a new div element for the post, adds the necessary classes, and populates it with the post data.
 * It also creates a dropdown menu for each post with options to edit and delete the post.
 *
 * @param {Object} post - The post data.
 * @returns {HTMLDivElement} The post's HTML.
 */

function displayPost(post) {
  const postLink = document.createElement("div");

  // Main post section
  const postSection = document.createElement("div");
  postSection.classList.add("card", "p-3", "my-3");

  // handle post miniMenu
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown", "position-absolute", "end-0", "me-3");

  // handle button
  const dropdownButton = document.createElement("button");
  dropdownButton.classList.add("btn", "btn-sm", "text-dark", "dropdown-toggle");
  dropdownButton.setAttribute("type", "button");
  dropdownButton.setAttribute("id", "dropdown-mini");
  dropdownButton.setAttribute("data-bs-toggle", "dropdown");
  dropdownButton.setAttribute("aria-expanded", "false");
  dropdownButton.innerHTML = `<i class="bi bi-gear"></i>`;

  // handle menu
  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu", "dropdown-menu-end");
  dropdownMenu.setAttribute("aria-labelledby", "dropdown-mini");

  // handle edit post click
  const editPostClick = document.createElement("li");
  const editPostLink = document.createElement("a");
  editPostLink.classList.add("dropdown-item");
  editPostLink.href = "/profile/edit.html?id=" + post.id;
  editPostLink.innerHTML = "Edit Post";
  editPostClick.append(editPostLink);

  // handle delete post click
  const deletePostClick = document.createElement("li");
  const deletePostLink = document.createElement("button");
  deletePostLink.classList.add("dropdown-item");
  deletePostLink.setAttribute("data-id", post.id);
  deletePostLink.setAttribute("data-action", "delete");
  deletePostLink.innerHTML = "Delete Post";
  deletePostClick.append(deletePostLink);

  dropdownMenu.append(editPostClick, deletePostClick);
  dropdown.append(dropdownButton, dropdownMenu);
  postSection.append(dropdown);

  // Post header
  const row = document.createElement("div");
  row.classList.add("row", "align-items-center");

  // User information
  const userInformation = document.createElement("div");
  userInformation.classList.add("col", "d-flex", "align-items-center");

  // User image
  const userImage = document.createElement("img");
  userImage.src =
    "https://fastly.picsum.photos/id/516/60/60.jpg?hmac=QDpbuv9iywOzqMna964O5vBvk_3YUaT9NeBwgn5rwHE";
  userImage.alt = "user picture";
  userImage.classList.add("rounded-circle", "shadow-1-strong", "me-3");
  userImage.setAttribute("width", "60");
  userImage.setAttribute("height", "60");
  userInformation.append(userImage);

  // User name

  const userNameElement = document.createElement("p");
  userNameElement.classList.add("user-name", "text-primary");
  const authorName = post.author.name || "Anonymous";
  userNameElement.innerHTML = `<span class="pe-3 fs-5 text-dark">${authorName}</span>${new Date(
    post.created
  ).toLocaleDateString()}`;
  userInformation.append(userNameElement);

  row.append(userInformation);

  // Post media
  if (post.media) {
    const mediaElement = document.createElement("div");
    mediaElement.classList.add("col-12", "mt-3");
    const media = document.createElement("img");
    media.src = post.media;
    media.alt = "Post image";
    media.classList.add("img-fluid");
    mediaElement.append(media);

    row.append(mediaElement);
  }

  // Post text
  const postColumn = document.createElement("div");

  // Post title
  const postTitle = document.createElement("h5");
  postTitle.classList.add("text-start", "text-dark", "mt-3");
  postTitle.textContent = post.title || "No title";
  postColumn.prepend(postTitle);

  // post body
  const postText = document.createElement("p");
  postText.classList.add("text-start", "text-dark", "mt-3");
  postText.textContent = post.body || "No content";
  postColumn.append(postText);

  row.append(postColumn);

  postLink.append(row);
  postSection.append(postLink);

  return postSection;
}
