import { API_BASE_URL } from "./const.mjs";

// const API_FEED_URL = "https://api.noroff.dev/api/v1/";

async function fetchAllUserPosts(url) {
  try {
    console.log(url);
    const token = localStorage.getItem("accessToken");
    const fetchAllUserPostsOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchAllUserPostsOptions);

    const json = await response.json();

    const postWallContainer = document.querySelector(".postsWall");

    postWallContainer.innerHTML = "";

    json.forEach((post) => {
      if (!post.title || !post.body) {
        return;
      }
      const postContainer = document.createElement("div");
      postContainer.classList.add("col-md-12", "mb-3");

      const postCard = document.createElement("div");
      postCard.classList.add("card", "border", "rounded");

      const postCardBody = document.createElement("div");
      postCardBody.classList.add(
        "card-body",
        "d-flex",
        "justify-content-start",
        "justify-content-md-between",
        "justify-content-sm-evenly",
        "align-items-center",
        "mb-3"
      );

      const postAvatar = document.createElement("img");
      postAvatar.classList.add("img-fluid", "rounded-circle");
      postAvatar.style.width = "60px";

      // Assuming post.author has an avatar property
      if (
        post.author &&
        post.author.avatar &&
        post.author.avatar.trim() !== ""
      ) {
        postAvatar.src = post.author.avatar;
      } else {
        postAvatar.src = "/images/profile.jpg";
      }

      const postAuthor = document.createElement("p");
      postAuthor.classList.add("card-text", "fw-bold");
      postAuthor.textContent = post.author.name;

      const createdDate = new Date(post.created);
      const formattedDate = createdDate.toLocaleDateString();
      const postDate = document.createElement("p");
      postDate.classList.add("card-text", "fst-italic", "d-none", "d-sm-block");
      postDate.textContent = formattedDate;

      postCardBody.appendChild(postAvatar);
      postCardBody.appendChild(postAuthor);
      postCardBody.appendChild(postDate);

      const postTitle = document.createElement("p");
      postTitle.classList.add("postTitle", "fw-bolder", "fs-3", "m-2");
      postTitle.textContent = post.title;

      const postBody = document.createElement("p");
      postBody.classList.add("postBody", "fs-4", "m-2");
      postBody.textContent = post.body;

      // Append the postCardBody to the postCard
      postCard.appendChild(postCardBody);

      postCard.appendChild(postTitle);
      postCard.appendChild(postBody);

      if (post.media && post.media.trim() !== "") {
        const postMedia = document.createElement("img");
        postMedia.classList.add(
          "img-fluid",
          "align-self-center",
          "m-5",
          "object-fit-contain",
          "rounded"
        );
        postMedia.src = post.media;
        postCard.appendChild(postMedia);
      }

      const iconContainer = document.createElement("div");
      iconContainer.classList.add(
        "icon-container",
        "d-flex",
        "justify-content-end"
      );

      const heartIcon = document.createElement("i");
      heartIcon.classList.add("far", "fa-heart", "m-3");
      heartIcon.style.fontSize = "40px";
      heartIcon.style.color = "red";

      iconContainer.appendChild(heartIcon);

      // Append the postCard to the postContainer
      postCard.appendChild(iconContainer);

      // Append each postContainer to the postsWall
      postWallContainer.appendChild(postCard);
    });

    console.log(json);
  } catch (error) {
    console.error("Error:", error);
  }
}

const allPosts = `${API_BASE_URL}social/posts?_author=true`;

export { fetchAllUserPosts, allPosts };
