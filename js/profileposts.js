const API_Profiles_URL = "https://api.noroff.dev/api/v1/social/profiles";

async function gatherUserPosts(url) {
  try {
    console.log(url);
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
      // Create a main container for each post with border
      const postContainer = document.createElement("div");
      postContainer.classList.add(
        "post-container",
        "border",
        "mb-1",
        "p-3",
        "d-flex",
        "flex-column"
      );

      // Create a container for the post content (image, name, date)
      const posterInfo = document.createElement("div");
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
        postMedia.classList.add("img-fluid", "align-self-center");
        postMedia.src = post.media;
        postMedia.style.width = "100px";
        postContainer.appendChild(postMedia);
      }

      const iconContainer = document.createElement("div");
      iconContainer.classList.add(
        "icon-container",
        "d-flex",
        "justify-content-end"
      );

      const heartIcon = document.createElement("i");
      heartIcon.classList.add("fa-regular", "fa-heart");
      heartIcon.style.fontSize = "25px";
      heartIcon.style.color = "red";

      iconContainer.appendChild(heartIcon);

      // Append the icon container to the post container
      postContainer.appendChild(iconContainer);

      // Append the main postContainer to profilePosts
      profilePosts.appendChild(postContainer);
    });

    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
//added a limit of 10 posts just so the page did not get flooded
const userPosts = `${API_Profiles_URL}/${userName}/posts?_author=true&_sort=created&_limit=10`;

gatherUserPosts(userPosts);
