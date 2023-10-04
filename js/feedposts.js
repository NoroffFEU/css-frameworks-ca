import { API_BASE_URL } from "./const.mjs";

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

      const postCard = document.createElement("a");
      postCard.href = `/feed/postSpecific.html?id=${post.id}`;
      postCard.classList.add(
        "card",
        "border",
        "border-secondary",
        "rounded",
        "mb-2",
        "text-decoration-none",
        "text-center"
      );

      const postCardBody = document.createElement("div");
      postCardBody.classList.add(
        "card-body",
        "d-flex",
        "flex-column-sm",
        "justify-content-start",
        "justify-content-lg-around",
        "align-items-center",
        "mb-3",
        "fw-bold"
      );

      const postAvatar = document.createElement("img");
      postAvatar.classList.add("img-fluid", "rounded-circle");
      postAvatar.style.width = "100px";

      if (
        post.author &&
        post.author.avatar &&
        post.author.avatar.trim() !== ""
      ) {
        postAvatar.src = post.author.avatar;
        // postAvatar.alt = "Profile-image";
      } else {
        postAvatar.src = "/images/profile.jpg";
      }

      const postAuthor = document.createElement("p");
      postAuthor.classList.add("postAuthor", "card-text", "text-sm");
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
      postTitle.classList.add(
        "postTitle",
        "fw-bolder",
        "fs-3",
        "text-center",
        "m-2"
      );

      postTitle.textContent = post.title;

      const postBody = document.createElement("p");
      postBody.classList.add("postBody", "m-2", "text-sm");
      postBody.textContent = post.body;

      postCard.appendChild(postCardBody);

      postCard.appendChild(postTitle);
      postCard.appendChild(postBody);

      if (post.media && post.media.trim() !== "") {
        const postMedia = document.createElement("img");
        postMedia.classList.add(
          "img-fluid",
          "align-self-center",
          "object-fit-contain",
          "p-5",
          "rounded"
        );

        postMedia.style.maxHeight = "500px";
        postMedia.src = post.media;
        postCard.appendChild(postMedia);
      }

      const iconContainer = document.createElement("div");
      iconContainer.classList.add(
        "icon-container",
        "d-flex",
        "justify-content-between"
      );

      const comments = document.createElement("p");
      comments.classList.add("ms-5", "text-primary");
      comments.textContent = "Comments:  " + post.comments.length;
      comments.style.fontSize = "20px";

      const heartIcon = document.createElement("i");
      heartIcon.classList.add("far", "fa-heart", "me-5", "p-1");
      heartIcon.textContent = " " + post.reactions.length;
      heartIcon.style.fontSize = "20px";
      heartIcon.style.color = "red";

      iconContainer.appendChild(comments);
      iconContainer.appendChild(heartIcon);

      postCard.appendChild(iconContainer);

      postWallContainer.appendChild(postCard);
    });

    // console.log(json);
    allPostsResult = json;
  } catch (error) {
    console.error("Error:", error);
  }
}

const allPosts = `${API_BASE_URL}social/posts?_author=true&_reactions=true`;
let allPostsResult = "";

export { fetchAllUserPosts, allPosts, allPostsResult };

// fetchAllUserPosts(allPosts);
