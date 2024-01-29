export function renderSinglePost(parent, post) {
  console.log("Post data:", post);
  const container = document.querySelector(parent);
  container.innerHTML = "";
  const loader = document.querySelector(".loader");

  // Main container for the post
  const postSection = document.createElement("section");
  postSection.classList.add("mt-5", "container", "bg-light", "h-auto");

  // Main row
  const row = document.createElement("div");
  row.classList.add("row", "pt-2", "align-items-center", "justify-content-between");

  // Left column for User info
  const userInfoCol = document.createElement("div");
  userInfoCol.classList.add("col", "d-flex", "align-items-center");

  const userImage = document.createElement("img");
  userImage.src = "/images/profile-pic3.png"; // Replace with actual user image source
  userImage.alt = "user picture";
  userImage.classList.add("small-user-picture", "m-1", "p-0");
  userInfoCol.append(userImage);

  const userName = document.createElement("p");
  userName.classList.add("mb-0");
  userName.textContent = post.userName || "User";
  userInfoCol.append(userName);

  // Heart icon (modify as needed)
  const heartCol = document.createElement("div");
  heartCol.classList.add("col-auto", "d-flex", "justify-content-end");

  // ... define heartCol content ...

  // Post text
  const postTextDiv = document.createElement("div");
  const postText = document.createElement("p");
  postText.classList.add("text-start", "text-dark", "pt-3");
  postText.textContent = post.body || "No content";
  postTextDiv.append(postText);

  row.append(userInfoCol, heartCol, postTextDiv);

  // Append the constructed elements to the postSection
  if (post.media) {
    const mediaDiv = document.createElement("div");
    mediaDiv.classList.add("col-12", "mb-3");

    const media = document.createElement("img");
    media.src = post.media;
    media.alt = "Post media";
    media.classList.add("img-fluid");
    mediaDiv.append(media);

    row.append(mediaDiv);
  }

  postSection.append(row);
  container.append(postSection);
  if (loader) {
    loader.style.display = "none";
  }

  return postSection;
}
