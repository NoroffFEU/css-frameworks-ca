/**
 * Renders a list of posts.
 *
 * It takes an array of post objects and creates a section element for each post.
 * It sets up the structure of the post, including the user info, options, title, and text.
 * Each post is then appended to the parent element.
 *
 * @param {Array} posts - The posts to be rendered. Each post should have an id, author with a name, created date, title, and text.
 */

export function renderPosts(parent, posts) {
  const container = document.querySelector(parent);
  const loader = document.querySelector(".loader");

  console.log(posts);

  container.innerHTML = "";
  const allPostsHtml = posts.map((post) => {
    return createPost(post);
  });

  container.append(...allPostsHtml);

  loader.style.display = "none";
}

function createPost(post) {
  const { title, body, created, media, id, likes, author } = post;

  // Anchor element for the post link
  const postLink = `/feed/post.html?id=${id}`;

  // Main container for the post
  const postSection = document.createElement("section");
  postSection.classList.add("mt-5", "container", "bg-light", "h-auto", "post-section");

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
      <span class="baloo ms-1 text-primary fs-5">User</span>
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

  //View option
  const viewOption = document.createElement("li");
  const viewLink = document.createElement("a");
  viewLink.classList.add("dropdown-item");
  viewLink.setAttribute("href", postLink);
  viewLink.textContent = "View Post";
  viewOption.append(viewLink);

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

  // dropdownMenu.append(viewOption, editOption, deleteOption);
  dropdownMenu.append(viewOption);
  dropdown.append(dropdownToggle, dropdownMenu);
  optionsCol.append(dropdown);

  topRow.append(userInfoCol, optionsCol);

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

  return postSection;
}

// export function renderPosts(parent, posts) {
//   const container = document.querySelector(parent);
//   const loader = document.querySelector(".loader");

//   console.log(posts);

//   container.innerHTML = "";
//   const allPostsHtml = posts.map((post) => {
//     return createPost(post);
//   });

//   container.append(...allPostsHtml);

//   loader.style.display = "none";
// }

// function createPost(post) {
//   console.log("Author Data:", post.author);

//   const { title, body, created, media, id } = post;

//   // Anchor element
//   const postLink = `/feed/post.html?id=${id}`;

//   // Main container
//   const postSection = document.createElement("section");
//   postSection.classList.add("mt-5", "container", "bg-light", "h-auto");

//   // Main row
//   const topRow = document.createElement("div");
//   topRow.classList.add("row", "pt-2", "align-items-center", "justify-content-between", "post-row");

//   // Left column for User info
//   const userInfoCol = document.createElement("div");
//   userInfoCol.classList.add("col", "d-flex", "align-items-center");

//   const userImage = document.createElement("img");
//   userImage.src = "/images/profile-pic3.png"; // default user image
//   userImage.alt = "user picture";
//   userImage.classList.add("small-user-picture", "m-1", "p-0");
//   userInfoCol.append(userImage);

//   const userName = document.createElement("p");
//   userName.classList.add("mb-0");
//   const authorName = post.author && post.author.name ? post.author.name : "Anonymous User";
//   userName.innerHTML = `<span class="pe-2 baloo mx-2 text-primary fs-5">${authorName}</span>${new Date(
//     created
//   ).toLocaleDateString()}`;

//   userInfoCol.append(userName);

//   topRow.append(userInfoCol);

//   // Right column for Heart icon
//   const heartCol = document.createElement("div");
//   heartCol.classList.add("col-auto", "d-flex", "justify-content-end");

//   const heartIcon = document.createElement("span");
//   heartIcon.innerHTML = `
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
//       <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
//     </svg>`;
//   heartCol.append(heartIcon);
//   topRow.append(heartCol);

//   // title row
//   const titleRow = document.createElement("div");
//   titleRow.classList.add("row", "pt-2", "align-items-start");

//   // Post title
//   const postTitleDiv = document.createElement("div");
//   postTitleDiv.classList.add("mt-2");
//   const postTitle = document.createElement("h2");
//   postTitle.classList.add("text-start", "text-dark", "pt-3", "fs-5", "fw-bold");
//   postTitle.textContent = title ?? "Default Title";
//   postTitleDiv.append(postTitle);

//   titleRow.append(postTitleDiv);

//   // text row
//   const textRow = document.createElement("div");
//   textRow.classList.add("row", "pt-2", "align-items-start");

//   // Post text
//   const postTextDiv = document.createElement("div");
//   const postText = document.createElement("p");
//   postText.classList.add("text-start", "text-dark", "pt-3");
//   postText.textContent = body ?? "No content";
//   postTextDiv.append(postText);

//   textRow.append(postTextDiv);

//   // media row
//   const mediaRow = document.createElement("div");
//   mediaRow.classList.add("row", "pt-2", "align-items-center");

//   // media
//   if (post.media) {
//     const mediaDiv = document.createElement("div");
//     mediaDiv.classList.add("col-12", "mb-3");

//     const mediaAnchor = document.createElement("a");
//     mediaAnchor.setAttribute("href", postLink);
//     const media = document.createElement("img");
//     media.src = post.media;
//     media.alt = "Post media";
//     media.classList.add("img-fluid");
//     mediaAnchor.append(media);
//     mediaDiv.append(mediaAnchor);

//     mediaRow.append(mediaDiv);
//   }
//   postSection.append(topRow, titleRow, textRow, mediaRow);

//   // Adding a "View Post" button
//   const buttonDiv = document.createElement("div");
//   buttonDiv.classList.add("d-flex", "justify-content-start", "mt-3", "mb-3");

//   const viewPostButton = document.createElement("a");
//   viewPostButton.setAttribute("href", postLink); // Link to single post
//   viewPostButton.classList.add("btn", "btn-light", "border-primary", "mb-3", "view-post-button", "pt-1", "pb-1"); // Add classes for styling
//   viewPostButton.textContent = "View Post";

//   buttonDiv.append(viewPostButton);
//   postSection.append(buttonDiv);

//   return postSection;
// }
