/**
 * Checks if there is an accesToken in local storage and directs to login if not found
 */

export function checkLogin() {
  if (!accessToken) {
    window.location.href = "/login/";
  }
}

import { accessToken, postUrl } from "./constants.js";

export function getNameFromJwt(token) {
  const tokenParts = token.split(".");
  const header = tokenParts[0];
  const payload = tokenParts[1];
  const signature = tokenParts[2];

  const base64UrlPayload = payload;
  const base64Payload = base64UrlPayload.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = atob(base64Payload);

  const payloadObject = JSON.parse(jsonPayload);
  return payloadObject;
}

export function getProfile(url, name) {
  console.log(url, name);
  return fetch(url + name, {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function getPosts(url) {
  return fetch(url, {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function deletePost(id) {
  return fetch(postUrl + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

const postsContainer = document.getElementById("posts-container");
export function createHTML(posts) {
  posts.forEach(({ author, body, comments, created, id, media, reactions, tags, title, updated, _count }) => {
    const postWrapper = document.createElement("div");
    postWrapper.classList.add("row", "bg-light", "border", "rounded-4", "py-2", "mb-3", "post-wrapper");

    const avatar = document.createElement("a");
    avatar.classList.add("p-3", "rounded-5", "col-auto");

    const postContent = document.createElement("div");
    postContent.classList.add("col", "me-4");

    const infoLine = document.createElement("div");
    infoLine.classList.add("mb-2", "row", "justify-content-between");
    const postTitle = document.createElement("p");
    postTitle.append(title);
    const postBody = document.createElement("p");
    postBody.append(body);
    const interactLine = document.createElement("div");
    interactLine.classList.add("row");

    const authorName = document.createElement("span");
    authorName.classList.add("col-auto", "fw-bold", "rounded-3");

    const ellipsis = document.createElement("i");
    ellipsis.classList.add("fa-solid", "fa-ellipsis", "col-auto", "p-0");
    ellipsis.setAttribute("role", "button");
    ellipsis.setAttribute("data-id", id);

    const reactButton = document.createElement("a");
    const reactIcon = document.createElement("i");
    const commentButton = document.createElement("a");
    const commentIcon = document.createElement("i");
    reactButton.classList.add("col-auto", "reactions");
    commentButton.classList.add("col-auto");
    reactIcon.classList.add("fa-regular", "fa-heart", "me-1");
    commentIcon.classList.add("fa-regular", "fa-comment", "me-1");

    postsContainer.appendChild(postWrapper);

    postWrapper.append(avatar, postContent);

    postContent.append(infoLine, postTitle, postBody, interactLine);

    infoLine.append(authorName, ellipsis);

    authorName.append(author.name);
    // ellipsisContainer.append(ellipsis, postOptions);
    // postOptions.append(editButton, deleteButton);

    interactLine.append(reactButton, commentButton);
    reactButton.append(reactIcon, _count.reactions);
    commentButton.append(commentIcon, _count.comments);
  });
}
