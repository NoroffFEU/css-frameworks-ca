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
                editObject.id = element.id;
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
      <button id="button--${id}" class="${currentUser === userId ? "" : "hide"} btn btn-success">delete</button>
      <button  data-id=${id} id="button--edit--${id}" class="${currentUser === userId ? "" : "hide"} btn btn-outline-primary">update</button>
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
        callApi(endpoint.getId(id), (data) => {
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
const modalTitle = document.querySelector("#title__modal--edit");
const modalBody = document.querySelector("#body__modal--edit");
const modalTags = document.querySelector("#tags__modal--edit");
function getPostText(id) {
    var _a, _b, _c, _d;
    modalTitle.value = (_a = document.querySelector(`#title${id}`)) === null || _a === void 0 ? void 0 : _a.innerText;
    modalBody.value = (_b = document.querySelector(`#body${id}`)) === null || _b === void 0 ? void 0 : _b.innerText;
    const tagArr = Array.from(document.querySelectorAll(`.tag${id}`));
    modalTags.value = tagArr.map((tag) => tag.innerText).join("#");
    editObject.setAll((_c = document.querySelector(`#body${id}`)) === null || _c === void 0 ? void 0 : _c.innerText, (_d = document.querySelector(`#title${id}`)) === null || _d === void 0 ? void 0 : _d.innerText, tagArr.map((element) => element.innerText));
    console.log(tagArr);
}
const editObject = {
    body: "",
    title: "",
    tags: [],
    media: "",
    id: 0,
    setAll: function (title, body, tags, media) {
        if (body)
            this.body = body;
        if (title)
            this.title = title;
        if (tags.length > 0)
            this.tags = tags;
        if (media)
            this.media = media;
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
updateButton === null || updateButton === void 0 ? void 0 : updateButton.addEventListener("click", () => {
    const editOption = optionFactory("PUT", editObject, endpoint);
    callApi(endpoint.getId(editObject.id), (data) => {
        console.log(data);
    }, editOption);
});
