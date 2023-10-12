import endpoints from "./endpoints.js";
import callApi from "./callApi.js";
import optionFactory from "./optionFactory.js";
import createElementFactory from "./createElementFactory.js";
import renderPosts from "./renderPost.js";
import commentButton from "./commentOnClick.js";

const queries = new URLSearchParams(window.location.search);
const userId = queries.get("user");
const currentUser: string = JSON.parse(localStorage.getItem("currentUser"));
const endpoint = endpoints(userId);
const profileElements = {
  user: document.querySelector("#userName") as HTMLElement,
  email: document.querySelector("#email") as HTMLElement,
  img: document.querySelector("#profile--picture") as HTMLImageElement,
  background: document.querySelector("#profile--header") as HTMLElement,
};

const postContainer = document.querySelector("#container--posts");

const changeAvatarinput = document.querySelector(
  "#change-picture--profile"
) as HTMLInputElement;
const changeAvatarButton = document.querySelector(
  "#change-picture--profile--button"
) as HTMLButtonElement;
const changeBannerinput = document.querySelector(
  "#change-picture--banner"
) as HTMLInputElement;
const changeBannerButton = document.querySelector(
  "#change-picture--banner--button"
) as HTMLButtonElement;
const changeMediaObject: { avatar: string; banner: string } = {
  avatar: changeAvatarinput.value,
  banner: changeAvatarinput.value,
};

console.log(userId, currentUser);

function attachListenerMedia(input: HTMLInputElement) {
  input.addEventListener("input", () => {
    if (input.value) {
      input === changeAvatarinput
        ? (changeMediaObject.avatar = input.value)
        : (changeMediaObject.banner = input.value);
    }
    console.log(changeMediaObject);
  });
}

document.querySelectorAll("button[data-mediaSelector]").forEach((button) => {
  button.addEventListener("click", () => {
    changeMedia(changeMediaObject);
  });
});

attachListenerMedia(changeAvatarinput);
attachListenerMedia(changeBannerinput);

interface profileInfo {
  name: string | null;
  email: string | null;
  banner: string | null;
  avatar: string | null;
}

function updateProfile({
  name = "Thistlebeard the Tipsy",
  email = "@TipsyThistle",
  banner,
  avatar,
}: profileInfo) {
  profileElements.user.textContent = name;
  profileElements.email.textContent = email;
  avatar
    ? (profileElements.img.src = avatar)
    : (profileElements.img.src = "/src/assets/profile.jpeg");
  banner
    ? (profileElements.background.style.backgroundImage = `url(${banner})`)
    : (profileElements.background.style.backgroundImage =
        "/src/assets/background.jpeg");
}

async function fetchPosts(url: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${endpoint.getToken()}`,
      "Content-type": "application/json",
    },
  });
  const data = await response.json();
  updateProfile(data);
  data.posts
    .map((post) => {
      return { ...post, author: { name: post.name } };
    })
    .forEach((post: postObject) => renderPosts(postContainer, post));
    commentButton()
  data.posts.forEach((element: postObject) => {
    buttonDeleteListener(
      document.querySelector(`#button--${element.id}`),
      element.id
    );
    document
      .querySelector(`#button--edit--${element.id}`)
      ?.addEventListener("click", () => {
        showModal();
        editObject.id = element.id;
        getPostText(element.id);
      });
  });
  followUnfollow(data.followers);
  console.log(data, data.followers);
}
fetchPosts(endpoint.profileOneUserAllEnabled);

async function changeMedia({
  avatar,
  banner,
}: {
  avatar: string;
  banner: string;
}) {
  const response = await fetch(endpoint.changeMedia, {
    method: "PUT",
    body: JSON.stringify({ avatar, banner }),
    headers: {
      Authorization: `Bearer ${endpoint.getToken()}`,
      "Content-type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
}

interface postObject {
  id: number;
  body: string;
  created: Date;
  tags: string[];
  title: string;
  owner: string;
}

function renderUserPosts({
  body,
  created,
  tags,
  title,
  owner,
  id,
}: postObject) {
  const postContainer = document.querySelector("#container--posts");

  if (postContainer) {
    postContainer.innerHTML += `<div id="div${id}" class="card bg-secondary p-2 w-percentage--95">
    <div class="row">
      <div class="col-3">
        <span class="text-primary fs-6">${owner}</span>
      </div>
      <div class="col-9">
    <div>
      <h3 id="title${id}">${title}</h3>
      <div>
      <button id="button--${id}" class="${
      currentUser === userId ? "" : "hide"
    } btn btn-success">delete</button>
      <button  data-id=${id} id="button--edit--${id}" class="${
      currentUser === userId ? "" : "hide"
    } btn btn-outline-primary">update</button>
      </div>
      </div>  
      <p id="body${id}" class="card-text text-black">
${body}
        </p>${tags
          .map(
            (tag) =>
              `<span class="badge text-bg-primary m-1 tag${id}">${tag}</span>`
          )
          .join("")}
      </div>
    </div>
  </div>
    `;
  }
}

const deleteOption = optionFactory("DELETE", {}, endpoint);

function buttonDeleteListener(button: HTMLButtonElement, id: number) {
  button.addEventListener("click", () => {
    callApi(endpoint.getId(id), deleteOption);
    document.querySelector(`#div${id}`).style.display = "none";
  });
}
if (currentUser === userId) {
  document.querySelector("#follow--button").style.display = "none";
  document.querySelector("[data-custom-input-Container]").style.display =
    "block";
}
function followUnfollow(followers: { name: string }[]) {
  const button = document.querySelector("#follow--button") as HTMLButtonElement;
  console.log(
    followers.some((element) => element.name === currentUser),
    followers
  );
  button.textContent = followers.some((element) => element.name === currentUser)
    ? "unfollow"
    : "follow";
  console.log(button.textContent);
  button.addEventListener("click", () => {
    follow(button);
  });
}

async function follow(button: HTMLButtonElement) {
  if (button.textContent && button.textContent in endpoint) {
    console.log(endpoint[button.textContent]);
    const response = await fetch(endpoint[button.textContent?.trim()], {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${endpoint.getToken()}`,
      },
    });
    const data = await response.json();
    button.textContent === "follow"
      ? (button.textContent = "unfollow")
      : (button.textContent = "follow");
    console.log(data);
  }
}

function showModal() {
  document.querySelector("#modal").style.display = "block";
}

document.querySelector("#close-modal")?.addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
});

const modalTitle = document.querySelector(
  "#title__modal--edit"
) as HTMLInputElement;
const modalBody = document.querySelector(
  "#body__modal--edit"
) as HTMLInputElement;
const modalTags = document.querySelector(
  "#tags__modal--edit"
) as HTMLInputElement;

function getPostText(id) {
  modalTitle.value = document.querySelector(`#title${id}`)?.innerText;
  modalBody.value = document.querySelector(`#body${id}`)?.innerText;
  const tagArr = Array.from(document.querySelectorAll(`.tag${id}`));

  modalTags.value = tagArr.map((tag) => tag.innerText).join("#");
  editObject.setAll(
    document.querySelector(`#body${id}`)?.innerText,
    document.querySelector(`#title${id}`)?.innerText,
    tagArr.map((element) => element.innerText)
  );
  console.log(tagArr);
}

const editObject: {
  title: string;
  body: string;
  tags: string[];
  media?: string;
  id: number;
  setAll: Function;
} = {
  body: "",
  title: "",
  tags: [],
  media: "",
  id: 0,
  setAll: function (
    title: string,
    body: string,
    tags: string[],
    media: string
  ) {
    if (body) this.body = body;
    if (title) this.title = title;
    if (tags.length > 0) this.tags = tags;
    if (media) this.media = media;
  },
};

modalBody.addEventListener("input", () => {
  editObject.body = modalBody.value;
  console.log(editObject);
});
modalTitle.addEventListener("input", () => {
  editObject.title = modalTitle.value;
});
modalTags.addEventListener("input", () => {
  editObject.tags = modalBody.value.split("#");
});

const updateButton = document.querySelector("#post__modal--edit");

updateButton?.addEventListener("click", () => {
  const editOption = optionFactory("PUT", editObject, endpoint);
  callApi(endpoint.getId(editObject.id), editOption);
});
