export function renderAllPosts(posts) {
  const container = document.querySelector("#card");
  const loader = document.querySelector(".loader");

  container.innerHTML = "";
  const allPostsHtml = posts.map((post) => {
    return displayPost(post);
  });

  container.append(...allPostsHtml);

  loader.style.display = "none";
}

function displayPost(post) {
  // Click to go to post
  const goToPost = `/feed/posts/index.html?id=${post.id}`;
  const postLink = document.createElement("a");
  postLink.setAttribute("href", goToPost);
  postLink.classList.add("go-to-Post");
  postLink.style.textDecoration = "none";

  // fortsett å implementere for å vise poster

  // Main post section
  const postSection = document.createElement("div");
  postSection.classList.add("card", "p-3", "my-3");

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

  // User name - NOT WORKING
  const userName = document.createElement("p");
  userName.classList.add("user-name", "text-primary");
  userName.innerHTML = `<span class="pe-3 fs-5 text-dark">${
    post.userName || "Username"
  }</span>${new Date(post.created).toLocaleDateString()}`;
  userInformation.append(userName);

  row.append(userInformation);

  // Post media
  if (post.media) {
    const mediaElement = document.createElement("div");
    mediaElement.classList.add("col-12", "mt-3");
    const media = document.createElement("img");
    media.src = post.media;
    media.alt = "Post media";
    media.classList.add("img-fluid");
    mediaElement.append(media);

    row.append(mediaElement);
  }

  // Post text
  const postColumn = document.createElement("div");
  const postText = document.createElement("p");
  postText.classList.add("text-start", "text-dark", "mt-3");
  postText.textContent = post.body || "No content";
  postColumn.append(postText);

  row.append(postColumn);

  postLink.append(row);
  postSection.append(postLink);

  return postSection;
}
