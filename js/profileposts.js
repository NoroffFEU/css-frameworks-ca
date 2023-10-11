import { API_BASE_URL } from "./const.mjs";
const userName = localStorage.getItem("userName");

async function gatherUserPosts(url) {
  try {
    // console.log(url);
    const token = localStorage.getItem("accessToken");
    const fetchUserPosts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchUserPosts);
    // console.log(response);
    const json = await response.json();

    //Adding posts.
    const profilePosts = document.querySelector(".profilePosts");

    profilePosts.innerHTML = "";

    json.forEach((post) => {
      const postContainer = document.createElement("a");
      postContainer.href = `/feed/postSpecific.html?id=${post.id}`;
      postContainer.classList.add(
        "post-container",
        "border",
        "border-black",
        "mb-2",
        "p-3",
        "d-flex",
        "flex-column",
        "text-decoration-none",
        "text-secondary"
      );

      // Create a container for the post content (image, name, date)
      const posterInfo = document.createElement("div");
      posterInfo.href = `/feed/postSpecific.html?id=${post.id}`;
      posterInfo.classList.add(
        "d-flex",
        "justify-content-start",
        "justify-content-md-between",
        "justify-content-sm-evenly",
        "align-items-center",
        "mb-3"
      );

      // Create and style the postAvatar element
      const postAvatar = document.createElement("img");
      postAvatar.classList.add("img-fluid", "rounded-circle");
      postAvatar.style.width = "60px";

      if (json.avatar && json.avatar.trim() !== "") {
        postAvatar.src = json.avatar;
      } else {
        postAvatar.src = "/images/profile.jpg";
      }

      const postAuthor = document.createElement("p");
      postAuthor.classList.add("text-start", "fw-bold");
      postAuthor.textContent = post.author.name;

      const createdDate = new Date(post.created);
      const formattedDate = createdDate.toLocaleDateString();
      const postDate = document.createElement("p");
      postDate.classList.add("fst-italic", "d-none", "d-sm-block");
      postDate.textContent = `${formattedDate}`;

      // Append the elements to the postContentContainer
      posterInfo.appendChild(postAvatar);
      posterInfo.appendChild(postAuthor);
      posterInfo.appendChild(postDate);

      const postTitle = document.createElement("p");
      postTitle.classList.add("text-start", "fs-5", "mt-1");
      postTitle.textContent = post.title;

      const postBody = document.createElement("p");
      postBody.classList.add("fs-5", "fw-lighter");
      postBody.textContent = post.body;

      // Append the post content container to the main postContainer
      postContainer.appendChild(posterInfo);

      // Append the titleElement to the post content container
      postContainer.appendChild(postTitle);
      postContainer.appendChild(postBody);

      if (post.media && post.media.trim() !== "") {
        const postMedia = document.createElement("img");
        postMedia.classList.add(
          "img-fluid",
          "align-self-center",
          "object-fit-contain",
          "mb-2"
        );
        postMedia.src = post.media;
        postContainer.appendChild(postMedia);
      }

      const iconContainer = document.createElement("div");
      iconContainer.classList.add(
        "icon-container",
        "d-flex",
        "justify-content-evenly",
        "align-items-center",
        "flex-shrink"
      );

      const comments = document.createElement("p");
      comments.classList.add("ms-5", "text-primary", "margin-unset");
      comments.textContent = "Comments:  " + post.comments.length;
      comments.style.fontSize = "20px";

      const heartIcon = document.createElement("i");
      heartIcon.classList.add("fa-regular", "fa-heart");
      heartIcon.textContent = " " + post.reactions.length;
      heartIcon.style.fontSize = "20px";
      heartIcon.style.color = "red";

      const openModal = document.createElement("button");
      openModal.id = post.id;
      openModal.classList.add("btn", "btn-primary", "btn-sm");
      openModal.textContent = "Edit";

      const modal = document.getElementById("myModal");

      openModal.addEventListener("click", (e) => {
        e.preventDefault();

        const postTitleInput = modal.querySelector("#postTitle");
        const postBodyTextarea = modal.querySelector("#postBodyArea");
        const postMediaInput = modal.querySelector("#postMedia");

        postTitleInput.value = post.title;
        postBodyTextarea.value = post.body;
        postMediaInput.value = post.media;

        modal.setAttribute("data-post-id", post.id);

        modal.classList.add("show");
        modal.style.display = "block";
      });

      const closeModal = document.getElementById("myModal");
      closeModal.addEventListener("click", (e) => {
        if (
          e.target === closeModal ||
          e.target.classList.contains("btn-close")
        ) {
          closeModal.classList.remove("show");
          closeModal.style.display = "none";
        }
      });

      iconContainer.appendChild(comments);
      iconContainer.appendChild(heartIcon);

      postContainer.appendChild(iconContainer);
      postContainer.appendChild(openModal);

      profilePosts.appendChild(postContainer);
    });

    // console.log(json);
  } catch (error) {
    console.log(error);
  }
}

const userPosts = `${API_BASE_URL}social/profiles/${userName}/posts?_author=true&_reactions=true&_comments=true`;

gatherUserPosts(userPosts);
