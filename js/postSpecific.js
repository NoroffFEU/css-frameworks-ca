import { API_BASE_URL, setUpHTML } from "./const.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get("id");

/**
 * Fetches and displays a specific post based on the provided post ID.
 *
 * @returns {void}
 */
async function singlePost() {
  try {
    const token = localStorage.getItem("accessToken");
    const specificPostUrl = `${API_BASE_URL}social/posts/${postId}?_author=true&_reactions=true&_comments=true`;

    const fetchSpecificPost = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(specificPostUrl, fetchSpecificPost);

    if (!response.ok) {
      console.error(
        `Error fetching post with ID ${postId}: ${response.statusText}`
      );
      return;
    }

    const specificPost = await response.json();

    // console.log(specificPost);

    document.title = specificPost.title;

    const container = document.querySelector(".specificPostContainer");
    container.innerHTML = "";

    const postContainer = document.createElement("div");
    postContainer.classList.add("p-3");

    const postCard = document.createElement("div");
    postCard.classList.add("mb-2", "border");
    postContainer.appendChild(postCard);

    const postCardBody = document.createElement("div");
    postCardBody.classList.add(
      "d-flex",
      "justify-content-around",
      "align-items-center",
      "mb-3",
      "fs-1",
      "mt-3"
    );

    const postAvatar = document.createElement("img");
    postAvatar.classList.add("img-fluid", "rounded-circle");
    postAvatar.style.width = "120px";
    postAvatar.style.height = "120px";

    if (
      specificPost.author &&
      specificPost.author.avatar &&
      specificPost.author.avatar.trim() !== ""
    ) {
      postAvatar.src = specificPost.author.avatar;
      postAvatar.alt = "Profile-image of " + specificPost.author;
    } else {
      postAvatar.src = "/images/profile-image-2.jpg";
      postAvatar.alt = "Profile-image of " + specificPost.author;
    }

    const postAuthor = document.createElement("p");
    postAuthor.classList.add("postAuthor", "card-text", "fw-bold", "fs-1");
    postAuthor.textContent = specificPost.author.name;

    const createdDate = new Date(specificPost.created);
    const formattedDate = createdDate.toLocaleDateString();
    const postDate = document.createElement("p");
    postDate.classList.add("card-text", "fst-italic", "d-none", "d-sm-block");
    postDate.textContent = formattedDate;

    postCardBody.appendChild(postAvatar);
    postCardBody.appendChild(postAuthor);
    postCardBody.appendChild(postDate);

    const postTitle = document.createElement("p");
    postTitle.classList.add("text-center", "fs-2");
    postTitle.textContent = specificPost.title;

    const postBody = document.createElement("p");
    postBody.classList.add("postBody", "fs-4", "m-2", "text-center");
    postBody.textContent = specificPost.body;

    postCard.appendChild(postCardBody);

    postCard.appendChild(postTitle);
    postCard.appendChild(postBody);

    if (specificPost.media && specificPost.media.trim() !== "") {
      const postMedia = document.createElement("img");
      postMedia.classList.add(
        "img-fluid",
        "object-fit-contain",
        "rounded",
        "mt-5",
        "mb-5",
        "mx-auto",
        "d-block"
      );

      postMedia.style.maxHeight = "400px";
      postMedia.src = specificPost.media;
      postCard.appendChild(postMedia);
    }

    container.appendChild(postContainer);

    const commentsContainer = document.querySelector(".commentSection");
    commentsContainer.innerHTML = "";

    const commentsSection = document.createElement("div");
    commentsSection.classList.add("p-2");

    specificPost.comments.forEach((comment) => {
      const commentCard = document.createElement("div");
      commentCard.classList.add("mb-2", "border");
      commentsSection.appendChild(commentCard);

      const commentCardBody = document.createElement("div");
      commentCardBody.classList.add(
        "card-body",
        "d-flex",
        "justify-content-around",
        "align-items-center",
        "mb-3",
        "mt-3",
        "mb-3"
      );

      const commentAvatar = document.createElement("img");
      commentAvatar.classList.add("img-fluid", "rounded-circle");
      commentAvatar.style.width = "100px";

      if (
        comment.author &&
        comment.author.avatar &&
        comment.author.avatar.trim() !== ""
      ) {
        commentAvatar.src = comment.author.avatar;
        commentAvatar.alt = "Profile-Image";
      } else {
        commentAvatar.src = "/images/profile-image-template.jpg";
      }

      const commentAuthor = document.createElement("p");
      commentAuthor.classList.add("card-text", "fw-bold", "fs-4");
      commentAuthor.textContent = comment.author.name;

      const createdDate = new Date(comment.created);
      const formattedDate = createdDate.toLocaleDateString();
      const commentDate = document.createElement("p");
      commentDate.classList.add(
        "card-text",
        "fst-italic",
        "fs-5",
        "d-none",
        "d-sm-block"
      );
      commentDate.textContent = formattedDate;

      commentCardBody.appendChild(commentAvatar);
      commentCardBody.appendChild(commentAuthor);
      commentCardBody.appendChild(commentDate);

      commentCard.appendChild(commentCardBody);

      const commentText = document.createElement("p");
      commentText.classList.add("fs-5", "m-2", "text-center");
      commentText.textContent = comment.body;

      commentCard.appendChild(commentText);
    });

    commentsContainer.appendChild(commentsSection);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function main() {
  try {
    await singlePost();
  } catch (error) {}
}

main();
