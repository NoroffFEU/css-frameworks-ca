export function renderProfilePosts(parent, posts) {
  const container = document.querySelector(parent);
  const loader = document.querySelector(".loader");

  const allPostsHtml = posts.map((post) => {
    return createProfilePost(post);
  });

  container.append(...allPostsHtml);

  loader.style.display = "none";
}

function createProfilePost(post) {
  const { title, body, author, created, media, id, likes, comments } = post;
  const postLink = `/profile/post.html?id=${post.id}`;

  // Main container
  const postSection = document.createElement("section");
  postSection.classList.add("mt-5", "container", "bg-light", "h-auto");

  // Top row for User info and Date
  const topRow = document.createElement("div");
  topRow.classList.add("row", "pt-2", "align-items-center", "justify-content-between", "post-row-bottom");

  // User info column
  const userInfoCol = document.createElement("div");
  userInfoCol.classList.add("col");
  userInfoCol.innerHTML = `
    <img src="/images/profile-pic3.png" alt="user picture" class="small-user-picture m-1 p-0">
    <span class="pe-2 baloo mx-2 text-primary fs-5">${author.name ?? "User"}</span>
    ${new Date(created).toLocaleDateString()}`;
  topRow.append(userInfoCol);

  // At the end of setting up the top row in the createProfilePost function
  const optionsCol = document.createElement("div");
  optionsCol.classList.add("col-auto", "d-flex", "align-items-center", "justify-content-end");

  // Dropdown container
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");

  // Dropdown toggle button
  const dropdownToggle = document.createElement("button");
  dropdownToggle.classList.add("btn", "btn-light", "dropdown-toggle");
  dropdownToggle.setAttribute("type", "button");
  dropdownToggle.setAttribute("id", "dropdownMenuButton" + id); // Ensure unique ID
  dropdownToggle.setAttribute("data-bs-toggle", "dropdown");
  dropdownToggle.setAttribute("aria-expanded", "false");
  dropdownToggle.innerHTML = `<img src="/images/vertical-dots.png" alt="Options" style="height: 20px;"> Options`;

  // Dropdown menu
  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu");
  dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuButton" + id);

  //View option
  const viewOption = document.createElement("li");
  const viewLink = document.createElement("a");
  viewLink.classList.add("dropdown-item");
  viewLink.setAttribute("href", postLink);
  viewLink.textContent = "View Post";
  viewOption.append(viewLink);

  // Edit option
  const editOption = document.createElement("li");
  const editLink = document.createElement("a");
  editLink.classList.add("dropdown-item");
  editLink.setAttribute("href", postLink);
  editLink.textContent = "Edit Post";
  editOption.append(editLink);

  // Delete option
  const deleteOption = document.createElement("li");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("dropdown-item");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("data-id", id);
  deleteButton.setAttribute("data-action", "delete");
  deleteButton.textContent = "Delete Post";
  deleteOption.append(deleteButton);

  dropdownMenu.append(viewOption, editOption, deleteOption);
  dropdown.append(dropdownToggle, dropdownMenu);
  optionsCol.append(dropdown);
  topRow.append(optionsCol);

  // Content Section
  const contentSection = document.createElement("div");
  contentSection.classList.add("pt-4", "pb-4");
  contentSection.innerHTML = `
    <h2 class="text-start text-dark pt-3 fs-5 fw-bold">${title ?? "Default Title"}</h2>
    <p class="text-start text-dark pt-3">${body ?? "No content"}</p>`;
  if (media) {
    contentSection.innerHTML += `
      <img src="${media}" alt="Post media" class="img-fluid mb-3">`;
  }

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

  return postSection;
}

//  // buttons row
//  const buttonsRow = document.createElement("div");
//  buttonsRow.classList.add("row", "d-flex", "justify-content-start", "pt-2", "mt-3", "mb-3");

//  // Column for the "Edit" button
//  const editButtonCol = document.createElement("div");
//  editButtonCol.classList.add("col-auto", "mb-2");

//  // Adding a "edit" button
//  const editButtonLink = document.createElement("a");
//  editButtonLink.setAttribute("href", postLink);
//  editButtonLink.classList.add("btn", "btn-light", "border-primary", "view-post-button", "pt-1", "pb-1");
//  editButtonLink.textContent = "Edit Post";
//  editButtonCol.append(editButtonLink);

//  // Adding a "delete" button
//  const deleteButtonCol = document.createElement("div");
//  deleteButtonCol.classList.add("col-auto", "mb-2");
//  const deleteButton = document.createElement("button");
//  deleteButton.setAttribute("type", "button");
//  deleteButton.setAttribute("data-id", id);
//  deleteButton.setAttribute("data-action", "delete");
//  deleteButton.classList.add("btn", "btn-light", "border-primary", "view-post-button", "pt-1", "pb-1");
//  deleteButton.textContent = "Delete Post";
//  deleteButtonCol.append(deleteButton);

//  buttonsRow.append(editButtonCol, deleteButtonCol);
