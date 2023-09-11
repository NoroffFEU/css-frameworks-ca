import endpoints from "./endpoints.js";

const queries = new URLSearchParams(window.location.search);
const userId = queries.get("user");
const endpoint = endpoints(userId);
const profileElements = {
  user: document.querySelector("#userName") as HTMLElement,
  email: document.querySelector("#email") as HTMLElement,
  img: document.querySelector("#profile--picture") as HTMLImageElement,
  background: document.querySelector("#profile--header") as HTMLElement,
};
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

function attachListenerMedia(input) {
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
  data.posts.forEach((element: postObject) => renderUserPosts(element));
  console.log(data);
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
  body: string;
  created: Date;
  tags: string[];
  title: string;
  owner: string;
}

function renderUserPosts({ body, created, tags, title, owner }: postObject) {
  const postContainer = document.querySelector("#container--posts");

  if (postContainer) {
    postContainer.innerHTML += `<div class="card bg-secondary p-2 w-percentage--95">
    <div class="row">
      <div class="col-3">
        <span class="text-primary fs-6">${owner}</span>
      </div>
      <div class="col-9">
      <h3>${title}</h3>
        <p class="card-text text-black">
${body}
        </p>${tags
          .map((tag) => `<span class="badge text-bg-primary m-1">${tag}</span>`)
          .join("")}
      </div>
    </div>
  </div>
    `;
  }
}
