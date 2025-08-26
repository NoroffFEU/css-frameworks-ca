/**
 * Renders a single profile post.
 *
 * It takes a post object and creates a section element for the post.
 * It sets up the structure of the post, including the user info, options, title, text, and media.
 * The post is then appended to the parent element.
 * It also provides options to edit and delete the post.
 *
 * @param {Object} post - The post to be rendered. It should have an id, author with a name, created date, title, text, and media.
 */

import { getUserName } from "../utils/helpers/getUserName.js";

export function renderSingleProfilePost(parent, post) {
  const container = document.querySelector(parent);
  container.innerHTML = "";
  const loader = document.querySelector(".loader");

  const { title, body, created, media, id, author, likes } = post;
  const postLink = "#";

  // Main container
  const postSection = document.createElement("section");
  postSection.classList.add("mt-5", "container", "bg-light", "h-auto");

  // Top row for user info, date and options
  const topRow = document.createElement("div");
  topRow.classList.add("row", "pt-2", "align-items-center", "justify-content-between", "post-row-bottom");

  // User info column
  const userInfoCol = document.createElement("div");
  userInfoCol.classList.add("col");
  const currentUser = getUserName();
  userInfoCol.innerHTML = `
  <div class="d-flex align-items-center pb-1">
    <img src="/images/profile-pic3.png" alt="user picture" class="small-user-picture m-1 p-0" style="height: 45px; width: 45px">
    <div>
      <span class="pe-2 baloo mx-2 text-primary fs-5">${currentUser ?? "User"}</span>
      <div class="ms-2">${new Date(created).toLocaleDateString()}</div>
    </div>
  </div>`;
  topRow.append(userInfoCol);

  // options column
  const optionsCol = document.createElement("div");
  optionsCol.classList.add("col-auto", "d-flex", "align-items-center", "justify-content-end");

  // Dropdown container
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");

  // Dropdown toggle button
  const dropdownToggle = document.createElement("button");
  dropdownToggle.classList.add("btn", "btn-light", "dropdown-toggle");
  dropdownToggle.setAttribute("type", "button");
  dropdownToggle.setAttribute("id", "dropdownMenuButton" + id);
  dropdownToggle.setAttribute("data-bs-toggle", "dropdown");
  dropdownToggle.setAttribute("aria-expanded", "false");
  dropdownToggle.innerHTML = `<img src="/images/vertical-dots.png" alt="Options" style="height: 15px;"> Options`;

  //dropdown menu
  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu");
  dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuButton" + id);

  // Edit option
  const editOption = document.createElement("li");
  const editButton = document.createElement("a");
  editButton.classList.add("dropdown-item");
  editButton.href = `/profile/edit-post.html?id=${id}`;
  editButton.textContent = "Edit Post";
  editOption.append(editButton);

  //delete
  const deleteOption = document.createElement("li");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("dropdown-item");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("data-id", id);
  deleteButton.setAttribute("data-action", "delete");
  deleteButton.textContent = "Delete Post";
  deleteOption.append(deleteButton);

  dropdownMenu.append(editOption, deleteOption);
  dropdown.append(dropdownToggle, dropdownMenu);
  optionsCol.append(dropdown);
  topRow.append(userInfoCol, optionsCol);

  // Content Section
  const contentSection = document.createElement("div");
  contentSection.classList.add("pt-4", "pb-4");
  contentSection.innerHTML = `
     <h2 class="text-start text-dark pt-3 fs-5 fw-bold">${title ?? "Default Title"}</h2>
     <p class="text-start text-dark pt-3">${body ?? "No content"}</p>`;
  if (media) {
    contentSection.innerHTML += `
     <a href="${postLink}" target="_blank">
     <img src="${media}" alt="Post media" class="img-fluid mb-3 post-image mx-auto">
   </a>`;
  }

  postSection.append(contentSection);

  // Bottom row for actions and reactions
  const actionsRow = document.createElement("div");
  actionsRow.classList.add(
    "row",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "pt-4",
    "pb-4",
    "mt-3",
    "mb-3",
    "post-row-top"
  );

  // Left column for action buttons
  const actionButtonsCol = document.createElement("div");
  actionButtonsCol.classList.add("col-auto");
  actionButtonsCol.innerHTML = `
<button class="btn btn-outline-primary me-2">Love it!</button>
<button class="btn btn-outline-primary">Comment</button>`;

  // Right column for likes and comments
  const reactionsCol = document.createElement("div");
  reactionsCol.classList.add("col-auto", "d-flex", "align-items-center");
  reactionsCol.innerHTML = `
<span class="me-2 d-flex align-items-center">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
<span class="ms-1">${likes ?? 0}</span>
</span>
<span class="d-flex align-items-center">
<img src="/images/comments.png" alt="Comments" style="width: 20px; height: 20px; margin-right: 4px;">
<span>0</span>
</span>`;

  // Assembling the post
  actionsRow.append(actionButtonsCol, reactionsCol);
  postSection.append(topRow, contentSection, actionsRow);

  container.append(postSection);
  if (loader) {
    loader.style.display = "none";
  }

  return postSection;
}
