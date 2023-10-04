import { API_BASE_URL } from "./const.mjs";

// Obtain the post ID from the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get("id");

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
      // Handle the case when the post with the given ID is not found or other errors
      console.error(
        `Error fetching post with ID ${postId}: ${response.statusText}`
      );
      return;
    }

    const specificPost = await response.json();

    console.log(specificPost);

    document.title = specificPost.title;

    const container = document.querySelector(".specificPostContainer");
    container.innerHTML = "";

    const postContainer = document.createElement("div");
    postContainer.classList.add("col-md-12", "mb-3", "p-5");

    // Create and append the postCard element
    const postCard = document.createElement("div");
    postCard.classList.add("mb-2");
    postContainer.appendChild(postCard);

    const postCardBody = document.createElement("div");
    postCardBody.classList.add(
      "card-body",
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
      postAvatar.alt = "Profile-image";
    } else {
      postAvatar.src = "/images/profile.jpg";
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
    postBody.classList.add("postBody", "fs-4", "m-2", "text-start");
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

      //   postMedia.style.maxWidth = "500px";
      postMedia.style.maxHeight = "400px";
      postMedia.src = specificPost.media;
      postCard.appendChild(postMedia);
    }

    const commentSection = document.createElement("div");
    commentSection.classList.add(
      "bg.primary",
      "d-flex",
      "justify-content-between"
    );

    const comments = document.createElement("p");
    comments.classList.add("ms-5");
    comments.textContent = post.comments.body;
    comments.style.fontSize = "25px";
    comments.style.color = "blue";

    postCard.appendChild(commentSection);

    // Add more elements as needed

    container.appendChild(postContainer);

    // Add more elements as needed
  } catch (error) {
    console.error("Error:", error);
  }
}

async function main() {
  try {
    await singlePost();
  } catch (error) {
    // Handle any errors here
  }
}

main();
