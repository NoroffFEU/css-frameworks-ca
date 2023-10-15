import { getPosts } from "../components/fetch-token.mjs";
import { timeAgo } from "../components/time-calculator.mjs";

const postsContentContainer = document.querySelector(".posts");

async function showPosts(url) {
  const posts = await getPosts(url);
  localStorage.setItem("currentPosts", JSON.stringify(posts));
  postsHtml(posts);
}

function postsHtml(posts) {
  for (let i = 0; i < posts.length; i++) {
    const { title, body, author, created, _count, media, id } = posts[i];
    const { name, avatar } = author;
    const { comments, reactions } = _count;

    const postHeadContainer = document.createElement("div");
    postHeadContainer.classList.add("d-flex", "flex-row", "align-items-center");

    const postAvatar = document.createElement("div");
    postAvatar.classList.add("custom-user-shape", "col-1");
    const authorAvatar = document.createElement("div");
    authorAvatar.classList.add("custom-user");

    if (avatar === null || !avatar) {
      const authorIcon = document.createElement("i");
      authorIcon.classList.add("fas", "fa-user");
      authorAvatar.append(authorIcon);
    } else {
      const authorImage = document.createElement("img");
      authorImage.src = avatar;
      authorImage.alt = "User";
      authorAvatar.append(authorImage);
    }

    postAvatar.append(authorAvatar);

    const authorContainer = document.createElement("div");
    authorContainer.classList.add("ps-2");
    const authorName = document.createElement("h4");
    authorName.classList.add("m-0", "font-weight-bold");
    const createdDate = document.createElement("p");
    createdDate.classList.add("m-0", "text-muted");
    authorName.innerText = name;
    createdDate.innerText = timeAgo(created);
    authorContainer.append(authorName, createdDate);
    postHeadContainer.append(postAvatar, authorContainer);

    const content = document.createElement("div");
    content.classList.add("p-3", "bg-white", "mb-2");
    content.addEventListener("mouseover", function () {
      content.style.cursor = "pointer";
      content.classList.remove("bg-white");
      content.style.backgroundColor = "#f8f9fa";
    });
    content.addEventListener("mouseout", function () {
      content.classList.add("bg-white");
    });
    content.addEventListener("click", function () {
      window.location.href = "../feed/post.html?id=" + id;
    });

    const postTitle = document.createElement("h5");
    const postBody = document.createElement("p");
    const postMedia = document.createElement("img");
    postMedia.classList.add("w-100", "w-md-50");
    postBody.classList.add("text-break");
    postTitle.classList.add("text-break");
    postTitle.innerText = title;
    postBody.innerText = body;

    if (media === null || !media) {
      postMedia.style.display = "none";
    } else {
      postMedia.src = media;
    }
    postMedia.alt = "user post image";

    content.append(postHeadContainer, postTitle, postBody, postMedia);
    postsContentContainer.append(content);
  }
}

export { showPosts, postsHtml, postsContentContainer };
