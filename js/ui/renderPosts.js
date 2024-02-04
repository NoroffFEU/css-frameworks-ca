export function renderPosts(parent, posts) {
  const container = document.querySelector(parent);
  const loader = document.querySelector(".loader");

  console.log(posts);

  container.innerHTML = "";
  const allPostsHtml = posts.map((post) => {
    return createPost(post);
  });

  container.append(...allPostsHtml);
  // console.log(...allPostsHtml);

  loader.style.display = "none";
}

function createPost(post) {
  // Anchor element
  const postLink = `/feed/post.html?id=${post.id}`;
  const anchor = document.createElement("a");
  anchor.setAttribute("href", postLink);
  anchor.classList.add("post-link"); // Add class for styling if needed

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
  userInfoCol.append(userImage);

  const userName = document.createElement("p");
  userName.classList.add("mb-0");
  userName.innerHTML = `<span class="pe-2 baloo text-primary fs-5">${post.userName || "User"}</span>${new Date(
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

  // Post text
  const postTextDiv = document.createElement("div");
  const postText = document.createElement("p");
  postText.classList.add("text-start", "text-dark", "pt-3");
  postText.textContent = post.body || "No content";
  postTextDiv.append(postText);

  row.append(postTextDiv);

  // Check if there's media
  if (post.media) {
    const mediaDiv = document.createElement("div");
    mediaDiv.classList.add("col-12", "mb-3");

    const media = document.createElement("img");
    media.src = post.media;
    media.alt = "Post media";
    media.classList.add("img-fluid");
    mediaDiv.append(media);

    // Comments section
    // const commentsDiv = document.createElement("div");
    // commentsDiv.classList.add("comments-section");

    // if (post.comments && post.comments.length > 0) {
    //   post.comments.forEach((comment) => {
    //     const commentElement = document.createElement("p");
    //     commentElement.textContent = comment.text;
    //     commentsDiv.append(commentElement);
    //   });
    // } else {
    //   const noComments = document.createElement("p");
    //   noComments.textContent = "No comments";
    //   commentsDiv.append(noComments);
    // }

    row.append(mediaDiv);
  }
  anchor.append(row);
  postSection.append(anchor);

  return postSection;
}
