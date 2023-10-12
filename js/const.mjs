export const API_BASE_URL = "https://api.noroff.dev/api/v1/";
export const token = localStorage.getItem("accessToken");

export function setUpHTML(post, postWallContainer) {
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

  if (post.author && post.author.avatar && post.author.avatar.trim() !== "") {
    postAvatar.src = post.author.avatar;
    postAvatar.alt = "Profile-image";
  } else {
    postAvatar.src = "/images/profile-image-2.jpg";
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
}

export function likeHeartFunction(iconId, postId, token) {
  const heartIcon = document.getElementById(iconId);

  if (heartIcon) {
    heartIcon.addEventListener("click", function (e) {
      e.preventDefault();
      // console.log("Heart clicked");

      if (heartIcon.classList.contains("far")) {
        heartIcon.classList.remove("far", "fa-heart");
        heartIcon.classList.add("fas", "fa-heart");

        const ReactionURL = `${API_BASE_URL}social/posts/${postId}/react/❤️`;
        const sendReaction = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        };

        fetch(ReactionURL, sendReaction)
          .then((response) => {
            if (response.ok) {
              window.location.reload();
              return response.json();
            } else {
              throw new Error("PUT request failed");
            }
          })
          .then((data) => {})
          .catch((error) => {
            console.error(error);
          });
      } else {
        heartIcon.classList.remove("fas", "fa-heart");
        heartIcon.classList.add("far", "fa-heart");
      }
    });
  }
}

// export function starFunction(iconId, postId, token, userName) {
//   const starIcon = document.getElementById(iconId);
//   console.log(starIcon); // Add this line

//   if (starIcon) {
//     starIcon.addEventListener("click", function (e) {
//       e.preventDefault();

//       if (starIcon.classList.contains("fa-regular")) {
//         starIcon.classList.remove("fa-regular");
//         starIcon.classList.add("fa-solid");

//         const LikeURL = `${API_BASE_URL}social/posts/${postId}/like`;
//         const sendLikeRequest = {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({}),
//         };

//         fetch(LikeURL, sendLikeRequest)
//           .then((response) => {
//             if (response.ok) {
//               // Update the UI or perform any necessary actions
//               return response.json();
//             } else {
//               throw new Error("Like request failed");
//             }
//           })
//           .then((data) => {
//             // Handle the response data as needed
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       } else {
//         // If the star icon is solid (fa-solid), change it to outlined (fa-regular)
//         starIcon.classList.remove("fa-solid");
//         starIcon.classList.add("fa-regular");

//         const unFollowURL = `${API_BASE_URL}social/profiles/${userName}/unfollow`;
//         const sendFollowRequest = {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({}),
//         };

//         fetch(unFollowURL, sendFollowRequest)
//           .then((response) => {
//             if (response.ok) {
//               return response.json();
//             } else {
//               throw new Error("Follow request failed");
//             }
//           })
//           .then((data) => {
//             // Handle the response data as needed
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }
//     });
//   }
// }

export async function fetchFriends(friendsURL) {
  try {
    const token = localStorage.getItem("accessToken");
    const friendsURL = `${API_BASE_URL}social/posts/following`;
    const fetchAllFriends = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(friendsURL, fetchAllFriends);
    const json = await response.json();

    const friendsBox = document.querySelector(".friendsBox");
    friendsBox.innerHTML = "";

    json.forEach((friend) => {
      const friendsContainer = document.createElement("div");
      friendsContainer.classList.add("row", "text-center");
      friendsContainer.id = friend.id;
      friendsBox.append(friendsContainer);
    });

    allPostsResult = json;
  } catch (error) {
    console.error("Error:", error);
  }
}
