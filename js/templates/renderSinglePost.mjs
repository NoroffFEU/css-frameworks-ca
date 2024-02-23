export function displaySinglePost(posts) {
  const container = document.querySelector("#card-single");
  const spinner = document.querySelector(".spinner-border");

  container.innerHTML = "";
  const singlePostsHtml = posts.map((post) => {
    return displaySinglePost(post);
  });

  container.append(...singlePostsHtml);

  spinner.style.display = "none";
}

export function renderSinglePost(post) {
  console.log("Post data:", post);

  const postLink = document.createElement("a");
  postLink.style.textDecoration = "none";
  postLink.href = "#";

  const div = document.createElement("div");

  postLink.appendChild(div);

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

  // User name

  const userNameElement = document.createElement("p");
  userNameElement.classList.add("user-name", "text-primary");
  const authorName = post.author.name || "Anonymous";
  userNameElement.innerHTML = `<span class="pe-3 fs-5 text-dark">${authorName}</span>${new Date(
    post.created
  ).toLocaleDateString()}`;
  userInformation.append(userNameElement);

  row.append(userInformation);

  // Post media
  if (post.media) {
    const mediaElement = document.createElement("div");
    mediaElement.classList.add("col-12", "mt-3");
    const media = document.createElement("img");
    media.src = post.media;
    media.alt = "Post image";
    media.classList.add("img-fluid");
    mediaElement.append(media);

    row.append(mediaElement);
  }

  // Post text
  const postColumn = document.createElement("div");

  // Post title
  const postTitle = document.createElement("h5");
  postTitle.classList.add("text-start", "text-dark", "mt-3");
  postTitle.textContent = post.title || "No title";
  postColumn.prepend(postTitle);

  // post body
  const postText = document.createElement("p");
  postText.classList.add("text-start", "text-dark", "mt-3");
  postText.textContent = post.body || "No content";
  postColumn.append(postText);

  row.append(postColumn);

  postLink.append(row);
  postSection.append(postLink);

  return postSection;
}
