var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import endpoints from "./endpoints.js";
import callApi from "./callApi.js";
import optionFactory from "./optionFactory.js";
const queries = new URLSearchParams(window.location.search);
const userId = queries.get("user");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const endpoint = endpoints(userId);
const profileElements = {
    user: document.querySelector("#userName"),
    email: document.querySelector("#email"),
    img: document.querySelector("#profile--picture"),
    background: document.querySelector("#profile--header"),
};
const changeAvatarinput = document.querySelector("#change-picture--profile");
const changeAvatarButton = document.querySelector("#change-picture--profile--button");
const changeBannerinput = document.querySelector("#change-picture--banner");
const changeBannerButton = document.querySelector("#change-picture--banner--button");
const changeMediaObject = {
    avatar: changeAvatarinput.value,
    banner: changeAvatarinput.value,
};
console.log(userId, currentUser);
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
function updateProfile({ name = "Thistlebeard the Tipsy", email = "@TipsyThistle", banner, avatar, }) {
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
function fetchPosts(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            headers: {
                Authorization: `Bearer ${endpoint.getToken()}`,
                "Content-type": "application/json",
            },
        });
        const data = yield response.json();
        updateProfile(data);
        data.posts.forEach((element) => renderUserPosts(element));
        data.posts.forEach((element) => {
            var _a;
            buttonDeleteListener(document.querySelector(`#button--${element.id}`), element.id);
            (_a = document
                .querySelector(`#button--edit--${element.id}`)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                showModal();
                getPostText(element.id);
            });
        });
        followUnfollow(data.followers);
        console.log(data, data.followers);
    });
}
fetchPosts(endpoint.profileOneUserAllEnabled);
function changeMedia({ avatar, banner, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(endpoint.changeMedia, {
            method: "PUT",
            body: JSON.stringify({ avatar, banner }),
            headers: {
                Authorization: `Bearer ${endpoint.getToken()}`,
                "Content-type": "application/json",
            },
        });
        const data = yield response.json();
        console.log(data);
    });
}
function renderUserPosts({ body, created, tags, title, owner, id, }) {
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
      <button id="button--${id}" class="btn btn-success">delete</button>
      <button id="button--edit--${id}" btn btn-outline-success>update</button>
      </div>
      </div>  
      <p id="body${id}" class="card-text text-black">
${body}
        </p>${tags
            .map((tag) => `<span class="badge text-bg-primary m-1 tag${id}">${tag}</span>`)
            .join("")}
      </div>
    </div>
  </div>
    `;
    }
}
const deleteOption = optionFactory("DELETE", {}, endpoint);
function buttonDeleteListener(button, id) {
    button.addEventListener("click", () => {
        callApi(endpoint.delete(id), (data) => {
            console.log(data, "deleted");
        }, deleteOption);
        document.querySelector(`#div${id}`).style.display = "none";
    });
}
function followUnfollow(followers) {
    const button = document.querySelector("#follow--button");
    console.log(followers.some((element) => element.name === currentUser), followers);
    button.textContent = followers.some((element) => element.name === currentUser)
        ? "unfollow"
        : "follow";
    console.log(button.textContent);
    button.addEventListener("click", () => {
        follow(button);
    });
}
function follow(button) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (button.textContent && button.textContent in endpoint) {
            console.log(endpoint[button.textContent]);
            const response = yield fetch(endpoint[(_a = button.textContent) === null || _a === void 0 ? void 0 : _a.trim()], {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${endpoint.getToken()}`,
                },
            });
            const data = yield response.json();
            button.textContent === "follow"
                ? (button.textContent = "unfollow")
                : (button.textContent = "follow");
            console.log(data);
        }
    });
}
function showModal() {
    document.querySelector("#modal").style.display = "block";
}
(_a = document.querySelector("#close-modal")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    document.querySelector("#modal").style.display = "none";
});
function getPostText(id) {
    var _a;
    document.querySelector("#title__modal--edit").value = document.querySelector(`#title${id}`).textContent;
    document.querySelector("#body__modal--edit").value = (_a = document.querySelector(`#body${id}`)) === null || _a === void 0 ? void 0 : _a.textContent;
    const tagArr = Array.from(document.querySelectorAll(`.tag${id}`));
    document.querySelector("#tags__modal--edit").value = tagArr
        .map((tag) => tag.textContent)
        .join("#");
    console.log(tagArr);
}
