/**
 * Renders a single post.
 *
 * It takes a post object and creates a section element for the post.
 * It sets up the structure of the post, including the user info, options, title, and text.
 * The post is then appended to the parent element.
 *
 * @param {Object} post - The post to be rendered. It should have an id, author with a name, created date, title, and text.
 */

export function renderSinglePost(parent, post) {
  console.log("Post data:", post);

  const { title, body, created, media, id, author, likes } = post;
  const postLink = "#";

  const container = document.querySelector(parent);
  container.innerHTML = "";
  const loader = document.querySelector(".loader");

  // Main container for the post
  const postSection = document.createElement("section");
  postSection.classList.add("mt-5", "container", "bg-light", "h-auto");

  // Top row for user info and options
  const topRow = document.createElement("div");
  topRow.classList.add("row", "pt-2", "align-items-center", "justify-content-between", "post-row-bottom");

  // User info column
  const userInfoCol = document.createElement("div");
  userInfoCol.classList.add("col");
  userInfoCol.innerHTML = `
  <div class="d-flex align-items-center pb-1">
    <img src="/images/profile-pic3.png" alt="user picture" class="small-user-picture m-1 p-0" style="height: 45px; width: 45px">
    <div>
      <span class="baloo text-primary fs-5">User</span>
      <div class="ms-4">${new Date(created).toLocaleDateString()}</div>
    </div>
  </div>`;
  topRow.append(userInfoCol);

  // Options dropdown (right column)
  const optionsCol = document.createElement("div");
  optionsCol.classList.add("col-auto", "d-flex", "align-items-center", "justify-content-end");
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  const dropdownToggle = document.createElement("button");
  dropdownToggle.classList.add("btn", "btn-light", "dropdown-toggle");
  dropdownToggle.setAttribute("type", "button");
  dropdownToggle.setAttribute("id", "dropdownMenuButton" + id);
  dropdownToggle.setAttribute("data-bs-toggle", "dropdown");
  dropdownToggle.setAttribute("aria-expanded", "false");
  dropdownToggle.innerHTML = `<img src="/images/vertical-dots.png" alt="Options" style="height: 15px;"> Options`;

  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu");
  dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuButton" + id);

  //edit
  const editOption = document.createElement("li");
  const editLink = document.createElement("a");
  editLink.classList.add("dropdown-item");
  editLink.setAttribute("href", postLink);
  editLink.textContent = "Edit Post";
  editOption.append(editLink);

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

  // topRow.append(userInfoCol, optionsCol);
  topRow.append(userInfoCol);

  // title row
  const titleRow = document.createElement("div");
  titleRow.classList.add("row", "pt-2", "align-items-start");

  // Post title
  const postTitleDiv = document.createElement("div");
  postTitleDiv.classList.add("mt-2");
  const postTitle = document.createElement("h2");
  postTitle.classList.add("text-start", "text-dark", "pt-3", "fs-5", "fw-bold");
  postTitle.textContent = title ?? "Default Title";
  postTitleDiv.append(postTitle);

  titleRow.append(postTitleDiv);

  // text row
  const textRow = document.createElement("div");
  textRow.classList.add("row", "pt-2", "align-items-start");

  // Post text
  const postTextDiv = document.createElement("div");
  const postText = document.createElement("p");
  postText.classList.add("text-start", "text-dark", "pt-3");
  postText.textContent = body ?? "No content";
  postTextDiv.append(postText);

  textRow.append(postTextDiv);

  // media row
  const mediaRow = document.createElement("div");
  mediaRow.classList.add("row", "pt-2", "align-items-center");

  // media
  if (post.media) {
    const mediaDiv = document.createElement("div");
    mediaDiv.classList.add("col-12", "mb-3");

    const mediaAnchor = document.createElement("a");
    mediaAnchor.setAttribute("href", postLink);
    const media = document.createElement("img");
    media.src = post.media;
    media.alt = "Post media";
    media.classList.add("img-fluid", "mx-auto", "post-image");
    mediaAnchor.append(media);
    mediaDiv.append(mediaAnchor);
    mediaRow.append(mediaDiv);
  }
  postSection.append(topRow, titleRow, textRow, mediaRow);

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

  postSection.append(topRow, titleRow, textRow, mediaRow, actionsRow);

  container.append(postSection);
  if (loader) {
    loader.style.display = "none";
  }

  return postSection;
}
