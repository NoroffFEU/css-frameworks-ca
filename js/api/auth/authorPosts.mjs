import { API_SOCIAL_URL } from "../api_constants.mjs";

/**
 * This function takes posts as a parameter that is an array containing post objects. The function then iterates over each post object
 * using a forEach method. Each post object with its properties is created, styled and displayed to the user.
 * 
 * @param {String} container The container of where the post cards will be displayed.
 * @param {Array} posts An array displaying post objects.
 * @param {Object} post An object containing {Image, title, date, avatar and name}.
 * @param {String} mediaImg Uses the ternary operator to see if user uploaded an image. If not, a default image will be assigned.
 * @param {String} avatarImg Uses the ternary operator to see if user uploaded an avatar image. If not, a default image will be assigned.
 */

function displayPosts(posts) {
  const container = document.querySelector(".container-profile");

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("card-body");
    postElement.classList.add("m-2");
    postElement.style.width = "23rem";
    postElement.classList.add("cursor-pointer");

    let mediaImg = post.media
      ? `<img class="card-img-top" src="${post.media}" alt="Post media">`
      : '<img class="card-img-top" src="https://www.wellingmobilityscooters.co.uk/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default-large.jpg">';
    let avatarImg = post.avatar
      ? `<img class="mx-auto d-block rounded-circle border border-custom-col height="60" src="${post.avatar}" alt="avatar profile">`
      : '<img class="mx-auto d-block rounded-circle" height="30" src="/images/ape-logo.png">';

    /**
    * Fetching the user post creation date and formatting it into a readable date.
    * 
    * @var {Number} date Storing the fetched date into date variable.
    * @var {Number} year Will return the year of the date data.
    * @var {Number} month Will return the month of the date. Since .getMonth() returns a zero based value, I added +1 so 1 represents January.
    * .toString() method converts the month from a number to a string value. This is needed because the .padStart() method only accepts string values.
    * @var {Number} day Similar to month, expect we don't need to change the initial value. Since .getMonth() returns a zero based value, I added +1 so 1 represents January.
    * @var {String} newDate The entire date formatted with template literals.
    */

    const date = new Date(post.created);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const newDate = `${day}.${month}.${year}`;

    postElement.innerHTML = `
      ${mediaImg}
        <div class="seperator p-4">
          <div class="d-flex flex-column">
            <h4 class="card-title">${post.title}</h4>
            <p>${newDate}</p>
            ${avatarImg}
          </div>
          <p class="m-0 d-flex justify-content-center">${post.author.name}</p>
        </div>
        <button type="button" class="btn btn-success m-4" data-id="${post.id}">Edit</button>
        <button type="button" class="btn btn-danger " data-id="${post.id}">Delete</button>`;

    container.appendChild(postElement);

    postElement.addEventListener("click", function (event) {
      if (!event.target.closest('button')) {
        event.preventDefault();
        window.location.href = `/post/index.html?id=${post.id}`;
      }
    });
  });
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-success')) {
      const id = event.target.dataset.id;
      window.location.href = `/post/edit/index.html?id=${id}`;
    }
  });
}
getPosts();

/**
 * This function will fetch post(s) only from the logged in user. 
 * If there's an issue with the API, the function will catch and display the error to the user.
 * 
 * @param {String} action API endpoint.
 * @param {String} authorName Retrieving the user name from the localstorage.
 * @param {String} accessToken Retrieving the JWT token from the localstorage.
 * @param {String} getPostUrl The entire API link stored in the variable.
 * @param {String} response The response sends a GET request method to the API to fetch the posts
 * @throws {Error} Throws an error if there's an issue with fetching the posts.
 */

async function getPosts() {
  const action = "/posts";

  const authorName = localStorage.getItem("name");
  const accessToken = localStorage.getItem("accessToken");
  const getPostsUrl = `${API_SOCIAL_URL}/profiles/${authorName}${action}?_author=true`;
  const bodyMessage = document.querySelector("main");

  try {
    const response = await fetch(getPostsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const posts = await response.json();
      displayPosts(posts);
    } else {
      throw new Error("Failed to fetch posts 😔");
    }

  } catch (error) {
    bodyMessage.innerHTML = `
    <div class="alert alert-danger text-center w-50 mx-auto fs-4" role="alert">
        ${error}<br><a class="text-dark text-center mx-auto fs-4" href="/profile/">`;
  }
}