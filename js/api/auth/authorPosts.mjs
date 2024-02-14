import { API_SOCIAL_URL } from "../api_constants.mjs";

async function getPosts() {
  const action = "/posts";

  const authorName = localStorage.getItem("name");
  const accessToken = localStorage.getItem("accessToken");
  const getPostsUrl = `${API_SOCIAL_URL}/profiles/${authorName}${action}?_author=true`;

  try {
    const response = await fetch(getPostsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
}

export function displayPosts(posts) {
  const container = document.querySelector(".container-profile");
  container.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("card");
    postElement.style.width = "23rem";
    postElement.style.marginTop = "50px";
    postElement.style.marginBottom = "20px";

    let mediaIMG = post.media
      ? `<img class="card-img-top" src="${post.media}" alt="Post media">`
      : '<img class="card-img-top" src="https://www.wellingmobilityscooters.co.uk/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default-large.jpg">';
    let avatarIMG = post.avatar
      ? `<img class="mx-auto d-block rounded-circle border border-custom-col height="60" src="${post.avatar}" alt="avatar profile">`
      : '<img class="mx-auto d-block rounded-circle" height="30" src="/images/ape-logo.png">';

    const date = new Date(post.created);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const newDate = `${day}.${month}.${year}`;

    postElement.innerHTML = `
      ${mediaIMG}
      <div class="card-body">
        <div class="seperator">
          <div class="d-flex flex-column">
            <h4 class="card-title">${post.title}</h4>
            <p>${newDate}</p>
            ${avatarIMG}
          </div>
          <p class="m-0 d-flex justify-content-center">${post.author.name}</p>
        </div>
        <button type="button" class="btn btn-success" data-id="${post.id}">Edit</button>
        <button type="button" class="btn btn-danger" data-id="${post.id}">Delete</button>
      </div>`;

    container.appendChild(postElement);

    postElement.addEventListener("click", function (event) {
    
      if (!event.target.closest('button')) {
        event.preventDefault();
        window.location.href = `/post/index.html?id=${post.id}`;
      }
    });
  });

  
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-success')) {
      const id = event.target.dataset.id;
      window.location.href = `/post/edit/index.html?id=${id}`;
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  getPosts();
});
