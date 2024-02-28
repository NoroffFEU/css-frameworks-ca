import { handleEditButtonClick } from "../handlers/handleEditButton.mjs";
import { handleDeleteButtonClick } from "../handlers/handleDeleteButtonClick.mjs";
import { load } from "../storage/index.mjs";

export function createPostElement(postData) {
  const userProfile = load("profile");

  const post = document.createElement("div");
  post.classList.add("card-body", "mb-3");

  const row = document.createElement("div");
  row.classList.add("row", "g-0");

  const currentUserEmail = userProfile.email;
  const postAuthorEmail = postData.author.email;

  const profileImgCol = document.createElement("div");
  profileImgCol.classList.add(
    "col-2",
    "d-flex",
    "justify-content-center",
    "align-items-start"
  );

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

  const usernameAndButtons = document.createElement("div");
  usernameAndButtons.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );

  const username = document.createElement("p");
  username.classList.add("font-weight-bold", "mb-0", "ms-3");
  username.textContent = postData.author.name || "User name";
  // Buttons container
  const buttonsContainer = document.createElement("div");

  // Append the edit and delete buttons only if the current user is the author
  if (currentUserEmail === postAuthorEmail) {
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-link", "me-2");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.value = postData.id;
    editButton.addEventListener("click", (event) => {
      handleEditButtonClick(event, postData);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-link", "me-2");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt text-danger"></i>';
    deleteButton.value = postData.id;
    deleteButton.addEventListener("click", (event) => {
      handleDeleteButtonClick(event, postData.id);
    });

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);
  }

  const timestamp = document.createElement("p");
  timestamp.classList.add("small", "text-muted", "ms-3");
  timestamp.textContent = postData.created || "Timestamp";

  const title = document.createElement("h4");
  title.classList.add("card-title", "text-center");
  title.textContent = postData.title || "Title";

  const image = document.createElement("img");
  image.src = postData.media;
  image.classList.add("card-img", "text-center", "w-50", "mx-auto", "d-block");
  image.alt = "Post image";

  const body = document.createElement("p");
  body.classList.add("card-text", "text-center");
  body.textContent = postData.body;

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("text-center");

  const likeButton = document.createElement("button");
  likeButton.classList.add("btn", "btn-link", "btn-sm");
  likeButton.innerHTML = '<i class="fa fa-thumbs-up"></i> Like this!';

  const commentButton = document.createElement("button");
  commentButton.classList.add("btn", "btn-link", "btn-sm");
  commentButton.innerHTML = '<i class="fa fa-comments"></i> Comment';

  usernameAndButtons.appendChild(username);
  usernameAndButtons.appendChild(buttonsContainer);

  actionsDiv.appendChild(likeButton);
  actionsDiv.appendChild(commentButton);

  innerContent.appendChild(usernameAndButtons);
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
export function renderPostTemplate(postData, parent) {
  const postElement = createPostElement(postData);
  parent.appendChild(postElement);
}

export function renderPostTemplates(postDataList, parent) {
  parent.innerHTML = ""; // Clear the existing content
  postDataList.forEach((postData) => {
    renderPostTemplate(postData, parent);
  });
}
