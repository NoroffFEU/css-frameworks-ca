export function renderPosts(parent, posts) {
  const container = document.querySelector(parent);
  const loader = document.querySelector(".loader");

  posts.forEach((post) => {
    const postContainer = createPost(post);
    container.appendChild(postContainer);
  });

  loader.style.display = "none";
  console.log(container, posts);
}

function createPost(post) {
  // Main container
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
  userInfoCol.appendChild(userImage);

  const userName = document.createElement("p");
  userName.classList.add("mb-0");
  userName.innerHTML = `<span class="pe-2 baloo text-primary fs-5">${post.userName || "User"}</span>${new Date(
    post.created
  ).toLocaleDateString()}`;
  userInfoCol.appendChild(userName);

  row.appendChild(userInfoCol);

  // Right column for Heart icon
  const heartCol = document.createElement("div");
  heartCol.classList.add("col-auto", "d-flex", "justify-content-end");

  const heartIcon = document.createElement("span");
  heartIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>`;
  heartCol.appendChild(heartIcon);

  row.appendChild(heartCol);

  // Post text
  const postTextDiv = document.createElement("div");
  const postText = document.createElement("p");
  postText.classList.add("text-start", "text-dark", "pt-3");
  postText.textContent = post.body || "No content";
  postTextDiv.appendChild(postText);

  row.appendChild(postTextDiv);

  // Check if there's media
  if (post.media) {
    const mediaDiv = document.createElement("div");
    mediaDiv.classList.add("col-12", "mb-3");

    const media = document.createElement("img");
    media.src = post.media;
    media.alt = "Post media";
    media.classList.add("img-fluid");
    mediaDiv.appendChild(media);

    // Comments section
    const commentsDiv = document.createElement("div");
    commentsDiv.classList.add("comments-section");

    if (post.comments && post.comments.length > 0) {
      post.comments.forEach((comment) => {
        const commentElement = document.createElement("p");
        commentElement.textContent = comment.text;
        commentsDiv.appendChild(commentElement);
      });
    } else {
      const noComments = document.createElement("p");
      noComments.textContent = "No comments";
      commentsDiv.appendChild(noComments);
    }

    row.appendChild(mediaDiv);
  }

  postSection.appendChild(row);

  return postSection;
}
