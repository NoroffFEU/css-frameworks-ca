import endpoints from "./endpoints.js";
import renderPosts from "./renderPost.js";
import commentButton from "./commentOnClick.js";
import deletePost from "./deleteOnClick.js";
import updatePost from "./updateOnClick.js";
import reactToPostTwo from "./reactToPost.js";

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
      return { ...post, author: { name: post.owner } };
    })
    .forEach((post: postObject) => renderPosts(postContainer, post));
  commentButton();
  deletePost();
  updatePost();
  reactToPostTwo();
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
