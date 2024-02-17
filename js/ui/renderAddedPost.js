/**
 * Renders a post that has been added.
 *
 * It takes a post object and creates a section element for the post.
 * It sets up the structure of the post, including the user info and the heart icon.
 * The post is then appended to the parent element.
 *
 * @param {Object} post - The post to be rendered. It should have an author with a name and a created date.
 */

export function renderAddedPost(post) {
  // Main post section
  const postSection = document.createElement("section");
  postSection.classList.add("mt-5", "container", "bg-light", "h-auto");

  // Main row
  const row = document.createElement("div");
  row.classList.add("row", "pt-2", "align-items-center", "justify-content-between");

  // Left column for User info
  const userInfoCol = document.createElement("div");
  userInfoCol.classList.add("col", "d-flex", "align-items-center");

  const userImage = document.createElement("img");
  userImage.src = "/images/profile-pic3.png"; // default user image
  userImage.alt = "user picture";
  userImage.classList.add("small-user-picture", "m-1", "p-0");
  userInfoCol.append(userImage);

  const userName = document.createElement("p");
  userName.classList.add("mb-0");
  userName.innerHTML = `<span class="pe-2 baloo text-primary fs-5">${post.author.name || "User"}</span>${new Date(
    post.created
  ).toLocaleDateString()}`;
  userInfoCol.append(userName);

  row.append(userInfoCol);

  // Right column for Heart icon
  const heartCol = document.createElement("div");
  heartCol.classList.add("col-auto", "d-flex", "justify-content-end");

  const heartIcon = document.createElement("span");
  heartIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg>`;
  heartCol.append(heartIcon);

  row.append(heartCol);
  postSection.append(row);

  // Add the post content
  const postContent = document.createElement("p");
  postContent.classList.add("p-3");
  postContent.textContent = post.body;
  postSection.append(postContent);

  // media row
  const mediaRow = document.createElement("div");
  mediaRow.classList.add("row", "pt-2", "align-items-center");

  // Check if there's media
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

  // Add the post to the DOM
  const postsContainer = document.querySelector("#postsContainer");
  postsContainer.append(postSection);
}
