import * as handlers from "../handlers/index.mjs";
import { Counter } from "../handlers/index.mjs";
import { subject } from "../handlers/observers/commonObservers.mjs";
import { load } from "../storage/index.mjs";

/**
 * Creates a post element based on the provided post data.
 * @param {Object} postData - The data of the post.
 * @returns {HTMLElement} - The created post element.
 */
export function createPostElement(postData) {
  try {
    const userProfile = load("profile");

    const post = document.createElement("div");
    post.classList.add("card-body", "mb-3");
    post.addEventListener("click", (event) => {
      if (!event.target.closest(".btn")) {
        handlers.handleViewPostButtonClick(event, postData.id);
      }
    });

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

    // Comment Content
    const comment = document.createElement("div");
    comment.textContent = "comments:";
    comment.classList.add("card-body", "border-top", "p-3", "mt-3");

    if (postData.comments && postData.comments.length > 0) {
      postData.comments.forEach((commentData) => {
        const currentUserEmail = userProfile.email;
        const commentAuthorEmail = commentData.author.email;

        const commentRow = document.createElement("div");
        commentRow.classList.add("row", "g-0");

        const commentProfileImgCol = document.createElement("div");
        commentProfileImgCol.classList.add("col-2");

        const commentProfileImg = document.createElement("img");
        commentProfileImg.src =
          commentData.author.avatar || "../../image/default-avatar.JPG";
        commentProfileImg.classList.add("img-thumbnail");
        commentProfileImg.alt = "Profile image";

        commentProfileImgCol.appendChild(commentProfileImg);
        commentRow.appendChild(commentProfileImgCol);

        const commentContentCol = document.createElement("div");
        commentContentCol.classList.add("col-10");

        const commentAuthorName = document.createElement("p");
        commentAuthorName.classList.add("font-weight-bold", "mb-0", "ms-2");
        commentAuthorName.textContent = commentData.author.name || "User name";

        const commentTimestamp = document.createElement("p");
        commentTimestamp.classList.add("small", "text-muted", "ms-3");
        commentTimestamp.textContent = commentData.created || "Timestamp";

        const commentBody = document.createElement("p");
        commentBody.classList.add("mb-2", "ms-2");
        commentBody.textContent = commentData.body || "Comment content";

        const commentButtonsDiv = document.createElement("div");
        const commentLikeButton = document.createElement("button");
        commentLikeButton.classList.add("btn", "btn-link", "btn-sm");
        commentLikeButton.innerHTML = "👍 Like this";

        const commentReplyButton = document.createElement("button");
        commentReplyButton.classList.add("btn", "btn-link", "btn-sm");
        commentReplyButton.innerHTML = '<i class="fa fa-reply"></i> Reply';

        commentButtonsDiv.appendChild(commentLikeButton);
        commentButtonsDiv.appendChild(commentReplyButton);

        commentContentCol.appendChild(commentAuthorName);
        commentContentCol.appendChild(commentTimestamp);
        commentContentCol.appendChild(commentBody);
        commentContentCol.appendChild(commentButtonsDiv);
        if (currentUserEmail === commentAuthorEmail) {
          const deleteCommentButton = document.createElement("button");
          deleteCommentButton.classList.add("btn", "btn-link", "btn-sm");
          deleteCommentButton.innerHTML =
            '<i class="fa-regular fa-trash-can text-danger"></i>';
          deleteCommentButton.addEventListener("click", (event) => {
            handlers.handleDeleteCommentButtonClick(
              event,
              postData.id,
              commentData.id
            );
          });
          commentButtonsDiv.appendChild(deleteCommentButton);
        }
        commentRow.appendChild(commentContentCol);
        comment.appendChild(commentRow);
      });
    } else {
      const noCommentText = document.createElement("p");
      noCommentText.textContent = "No comments for this post yet.";
      noCommentText.classList.add("card-body");
      comment.appendChild(noCommentText);
    }

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
        handlers.handleEditButtonClick(event, postData);
      });

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-link", "me-2");
      deleteButton.innerHTML = '<i class="fas fa-trash-alt text-danger"></i>';
      deleteButton.value = postData.id;
      deleteButton.addEventListener("click", (event) => {
        handlers.handleDeleteButtonClick(event, postData.id);
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
    image.classList.add(
      "card-img",
      "text-center",
      "w-50",
      "mx-auto",
      "d-block"
    );
    image.alt = "Post image";

    const body = document.createElement("p");
    body.classList.add("card-text", "text-center");
    body.textContent = postData.body;

    const countersDiv = document.createElement("div");
    countersDiv.classList.add("text-center");

    const likeCountElement = document.createElement("span");
    likeCountElement.classList.add("like-count", "me-2");
    likeCountElement.innerHTML = `<i class="fa fa-thumbs-up"></i> <span class="like-count-number">${
      postData._count.reactions || 0
    }`;

    const commentCountElement = document.createElement("span");
    commentCountElement.classList.add("comment-count", "ms-2");
    commentCountElement.innerHTML = `<i class="fa fa-comments"></i> <span class="comment-count-number">${
      postData._count.comments || 0
    }`;

    countersDiv.appendChild(likeCountElement);
    countersDiv.appendChild(commentCountElement);

    const likeCount = new Counter(likeCountElement, postData.id, "reactions");
    const commentCount = new Counter(
      commentCountElement,
      postData.id,
      "comments"
    );

    likeCount.setSubject(subject);
    commentCount.setSubject(subject);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("text-center");

    const likeButton = document.createElement("button");
    likeButton.classList.add("btn", "btn-link", "btn-sm");
    likeButton.innerHTML = "👍 Like this!";
    likeButton.addEventListener("click", (event) => {
      handlers.handleLikeButtonClick(event, postData.id, "👍");
    });

    const commentButton = document.createElement("button");
    commentButton.classList.add("btn", "btn-link", "btn-sm");
    commentButton.innerHTML = '<i class="fa fa-comments"></i> Comment';
    commentButton.addEventListener("click", (event) => {
      handlers.handleCommentButtonClick(event, postData.id);
    });

    usernameAndButtons.appendChild(username);
    usernameAndButtons.appendChild(buttonsContainer);

    actionsDiv.appendChild(likeButton);
    actionsDiv.appendChild(commentButton);

    innerContent.appendChild(usernameAndButtons);
    innerContent.appendChild(timestamp);
    innerContent.appendChild(title);
    innerContent.appendChild(image);
    innerContent.appendChild(body);
    innerContent.appendChild(countersDiv);
    innerContent.appendChild(actionsDiv);
    innerContent.appendChild(comment);

    cardBody.appendChild(innerContent);
    postContentCol.appendChild(cardBody);

    row.appendChild(postContentCol);
    post.appendChild(row);

    return post;
  } catch (error) {
    console.error("Error creating post element:", error);
    return null; // Return null in case of error
  }
}

/**
 * Renders a single post template inside the specified parent element.
 * @param {Object} postData - The data of the post to render.
 * @param {HTMLElement} parent - The parent element to append the post template to.
 */
export function renderPostTemplate(postData, parent) {
  const postElement = createPostElement(postData);
  const existingPostElement = parent.querySelector(
    `[data-post-id="${postData.id}"]`
  );
  if (existingPostElement) {
    // If post element already exists, replace it with the new one
    parent.replaceChild(postElement, existingPostElement);
  } else {
    // Otherwise, append the new post element
    parent.appendChild(postElement);
  }
}
/**
 * Renders post templates for a list of post data inside the specified parent element.
 * @param {Object[]} postDataList - The list of post data to render.
 * @param {HTMLElement} parent - The parent element to append the post templates to.
 */
export function renderPostTemplates(postDataList, parent) {
  parent.innerHTML = ""; // Clear the existing content
  postDataList.forEach((postData) => {
    renderPostTemplate(postData, parent);
  });
}
