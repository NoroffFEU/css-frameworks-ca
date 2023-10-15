import { authorParam, createPostUrl } from "./components/api-url.mjs";
import { getPosts, deletePost, updatePost } from "./components/fetch-token.mjs";
import { timeAgo } from "./components/time-calculator.mjs";
import { showUserName, currentUserName, showAvatar } from "./my-profile/show-user.mjs";
import { loader, message } from "./components/message.mjs";

const querryString = document.location.search;
const param = new URLSearchParams(querryString);
const id = param.get("id");

const postUrl = createPostUrl + "/" + id + authorParam;
const editUrl = createPostUrl + "/" + id;

const postContentContainer = document.querySelector(".post");
const editForm = document.querySelector(".edit-post-form");

const updateForm = document.querySelector(".update-form");
updateForm.classList.add("d-none");

async function showSinglePost(url) {
  try {
    loader.innerHTML = "";
    const post = await getPosts(url);

    const { title, body, author, created, _count, media, tags } = post;
    const { name, avatar } = author;

    const postHead = document.createElement("div");
    postHead.classList.add("d-flex", "flex-row", "align-items-center", "col-8", "col-lg-10");

    const headContainer = document.createElement("div");
    const postOptions = document.createElement("select");
    headContainer.classList.add("d-flex", "flex-row", "col-12");
    postOptions.classList.add("form-select", "custom-sort");
    postOptions.ariaLabel = "filter options";

    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Options";
    defaultOption.value = "";
    const optionOne = document.createElement("option");
    optionOne.value = "edit";
    optionOne.textContent = "Edit";
    const optionTwo = document.createElement("option");
    optionTwo.value = "delete";
    optionTwo.textContent = "Delete";

    postOptions.append(defaultOption, optionOne, optionTwo);

    if (name !== currentUserName) {
      postOptions.classList.add("d-none");
    } else {
      postOptions.classList.remove("d-none");
    }
    headContainer.append(postHead, postOptions);

    postOptions.addEventListener("change", function () {
      const selectedValue = postOptions.value;
      if (selectedValue === "delete") {
        deletePost(editUrl);
        alert("Deleted!");
        window.location.href = "./index.html";
      } else if (selectedValue === "edit") {
        updateForm.classList.remove("d-none");
        postContentContainer.classList.add("d-none");

        editForm.title.value = title;
        editForm.body.value = body;
        editForm.media.value = media;
        editForm.tags.value = tags;
      }
    });

    editForm.addEventListener("submit", function updateSinglePost(event) {
      try {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const tags = formData.get("tags");
        const tagsArray = tags.split(",").map((tag) => tag.trim());

        const updatedPost = Object.fromEntries(formData.entries());
        updatedPost.tags = tagsArray;

        updatePost(editUrl, updatedPost);
        alert("Updated!!");
        window.location.reload();
      } catch (error) {
        loader.classList.add("text-danger");
        loader.innerHTML = message("error", error);
      }
    });

    const postAvatar = document.createElement("div");
    postAvatar.classList.add("custom-user-shape", "col-2", "col-lg-1");
    const authorAvatar = document.createElement("div");
    authorAvatar.classList.add("custom-user");
    const authorImage = document.createElement("img");
    if (avatar === null || !avatar) {
      authorImage.src = "./asset/profile-pic.jpg";
    } else {
      authorImage.src = avatar;
    }
    authorImage.alt = "User";
    authorAvatar.append(authorImage);
    postAvatar.append(authorAvatar);

    const authorContainer = document.createElement("div");
    authorContainer.classList.add("ps-2", "col-12");
    const authorName = document.createElement("h4");
    authorName.classList.add("mt-0", "font-weight-bold");
    const createdDate = document.createElement("p");
    createdDate.classList.add("m-0", "text-muted");
    authorName.innerText = name;
    createdDate.innerText = timeAgo(created);
    authorContainer.append(authorName, createdDate);
    postHead.append(postAvatar, authorContainer);

    const content = document.createElement("div");
    content.classList.add("p-3", "bg-white", "mb-2");

    const postTitle = document.createElement("h5");
    const postBody = document.createElement("p");
    const postMedia = document.createElement("img");
    postMedia.classList.add("w-50", "w-md-25");
    postBody.classList.add("small", "mt-3", "text-break");
    postTitle.classList.add("text-break");
    postTitle.innerText = title;
    postBody.innerText = body;
    if (media === null || !media) {
      postMedia.style.display = "none";
    } else {
      postMedia.src = media;
    }
    postMedia.alt = "User Image";

    content.append(headContainer, postTitle, postBody, postMedia);
    postContentContainer.append(content);
  } catch (error) {
    loader.classList.add("text-danger");
    loader.innerHTML = message("error", error);
  }
}
showSinglePost(postUrl);

showUserName();

const cancelButton = document.querySelector("#cancel-form-button");
cancelButton.addEventListener("click", function (event) {
  event.preventDefault();
  updateForm.classList.add("d-none");
  postContentContainer.classList.add("d-block");
  window.location.reload();
});
showAvatar();
