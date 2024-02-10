export function renderSinglePost(parent, post) {
  console.log("Post data:", post);
  const container = document.querySelector(parent);
  container.innerHTML = "";
  const loader = document.querySelector(".loader");

  // Main container for the post
  const postSection = document.createElement("section");
  postSection.classList.add("mt-5", "container", "bg-light", "h-auto");

  // Main row
  const topRow = document.createElement("div");
  topRow.classList.add("row", "pt-2", "align-items-center", "justify-content-between", "post-row");

  // Left column for User info
  const userInfoCol = document.createElement("div");
  userInfoCol.classList.add("col", "d-flex", "align-items-center");

  const userImage = document.createElement("img");
  userImage.src = "/images/profile-pic3.png";
  userImage.alt = "user picture";
  userImage.classList.add("small-user-picture", "m-1", "p-0");
  userInfoCol.append(userImage);

  const userName = document.createElement("p");
  userName.classList.add("mb-0");
  const authorName = post.author && post.author.name ? post.author.name : "Anonymous User";
  userName.innerHTML = `<span class="pe-2 baloo text-primary fs-5">${authorName}</span>${new Date(
    post.created
  ).toLocaleDateString()}`;
  userInfoCol.append(userName);
  topRow.append(userInfoCol);

  // Right column for Heart icon
  const heartCol = document.createElement("div");
  heartCol.classList.add("col-auto", "d-flex", "justify-content-end");

  const heartIcon = document.createElement("span");
  heartIcon.innerHTML = `
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
     <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
   </svg>`;
  heartCol.append(heartIcon);
  topRow.append(heartCol);

  // title row
  const titleRow = document.createElement("div");
  titleRow.classList.add("row", "pt-2", "align-items-start");

  // Post title
  const postTitleDiv = document.createElement("div");
  postTitleDiv.classList.add("mt-2");
  const postTitle = document.createElement("h2");
  postTitle.classList.add("text-start", "text-dark", "pt-3", "fs-5", "fw-bold");
  postTitle.textContent = post.title || "Default Title";
  postTitleDiv.append(postTitle);

  titleRow.append(postTitleDiv);

  // text row
  const textRow = document.createElement("div");
  textRow.classList.add("row", "pt-2", "align-items-start");

  // Post text
  const postTextDiv = document.createElement("div");
  const postText = document.createElement("p");
  postText.classList.add("text-start", "text-dark", "pt-3");
  postText.textContent = post.body || "No content";
  postTextDiv.append(postText);

  textRow.append(postTextDiv);

  // media row
  const mediaRow = document.createElement("div");
  mediaRow.classList.add("row", "pt-2", "align-items-center");

  // Append the constructed elements to the postSection
  if (post.media) {
    const mediaDiv = document.createElement("div");
    mediaDiv.classList.add("col-12", "mb-3");

    const media = document.createElement("img");
    media.src = post.media;
    media.alt = "Post media";
    media.classList.add("img-fluid");
    mediaDiv.append(media);

    mediaRow.append(mediaDiv);
  }

  postSection.append(topRow, titleRow, textRow, mediaRow);
  container.append(postSection);
  if (loader) {
    loader.style.display = "none";
  }

  return postSection;
}
