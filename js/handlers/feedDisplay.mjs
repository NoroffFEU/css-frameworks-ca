import { getPosts } from "../api/posts/get.mjs";
import { renderPostTemplate, renderPostTemplates } from "../templates/post.mjs";



export async function displayPosts() {
  try {
    const posts = await getPosts();
    const container = document.querySelector("#posts");
    container.innerHTML = ""; // Clear the existing content
    posts.forEach(postData => {
      const postElement = createPostElement(postData);
      container.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}

export function createPostElement(postData) {
  const post = document.createElement("div");
  post.classList.add("card-body", "mb-3");

  const row = document.createElement("div");
  row.classList.add("row", "g-0");

  const profileImgCol = document.createElement("div");
  profileImgCol.classList.add("col-2", "d-flex", "justify-content-center", "align-items-start"); // Align items to the top

  const profileImg = document.createElement("img");
  profileImg.src = postData.author.avatar || "../../image/default-avatar.JPG";
  profileImg.classList.add("img-thumbnail");
  profileImg.alt = "Profile image";

  profileImgCol.appendChild(profileImg);
  row.appendChild(profileImgCol);

  const postContentCol = document.createElement("div");
  postContentCol.classList.add("card", "col-10", "bg-light", "text-dark");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const innerContent = document.createElement("div");
  innerContent.classList.add("bg-white", "pt-2");

  const username = document.createElement("p");
  username.classList.add("font-weight-bold", "mb-0", "ms-3");
  username.textContent = postData.author.name || "User name";

  const timestamp = document.createElement("p");
  timestamp.classList.add("small", "text-muted", "ms-3");
  timestamp.textContent = postData.created || "Timestamp";

  const title = document.createElement("h4");
  title.classList.add("card-title", "text-center");
  title.textContent = postData.title || "Title";

  const image = document.createElement("img");
  image.src = postData.media;
  image.classList.add("card-img", "text-center", "w-50", "mx-auto", "d-block"); // Center the image horizontally
  image.alt = "Post image";

  const body = document.createElement("p");
  body.classList.add("card-text", "text-center");
  body.textContent = postData.body;

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("text-center");

  const likeButton = document.createElement("button");
  likeButton.classList.add("btn", "btn-outline-primary", "btn-sm");
  likeButton.innerHTML = '<i class="fa fa-thumbs-up"></i> Like this!';

  const commentButton = document.createElement("button");
  commentButton.classList.add("btn", "btn-outline-primary", "btn-sm");
  commentButton.innerHTML = '<i class="fa fa-comments"></i> Comment';

  actionsDiv.appendChild(likeButton);
  actionsDiv.appendChild(commentButton);

  innerContent.appendChild(username);
  innerContent.appendChild(timestamp);
  innerContent.appendChild(title);
  innerContent.appendChild(image);
  innerContent.appendChild(body);
  innerContent.appendChild(actionsDiv);

  cardBody.appendChild(innerContent);
  postContentCol.appendChild(cardBody);

  row.appendChild(postContentCol);
  post.appendChild(row);

  return post;
}
