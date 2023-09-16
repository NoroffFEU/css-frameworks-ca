var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import endpointObject from "./endpoints.js";
const endpoint = endpointObject("Jarle");
function callApi(endpoint, callBack, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(endpoint, options);
        const data = yield response.json();
        callBack(data);
    });
}
function renderPosts(domEl, { id, title, body, tags, media, created, updated, _count, author }) {
    domEl.innerHTML += ` <div class="card mb-3 bg-secondary p-2 w-percentage--95">
    <div class="row">
      <div class="col-4">
        <img
          class="rounded-circle w-25"
          src=${author.avatar}
          alt="Profile picture of Thistle" />
        <span class="text-primay fs-6">${author.name}</span>
      </div>
      <div class="col-8">
      <h3>${title}</h3>
        <p class="card-text text-black">
          ${body}${media && media}
        </p>
        ${tags
        .map((element) => `<span class="badge text-bg-primary m-1">${element}</span>`)
        .join("")}
          <span class="fs-6">${created}</span>
      </div>
    </div>
  </div>`;
}
function optionFactory(method, body) {
    const newObject = {
        method: method,
        headers: {
            Authorization: `Bearer ${endpoint.getToken()}`,
            "Content-type": "application/json",
        },
    };
    if (Object.keys(body).length !== 0) {
        newObject.body = JSON.stringify(body);
    }
    return newObject;
}
const postOption = optionFactory("GET", {});
console.log(postOption);
callApi(endpoint.allPostsFollowed, (data) => {
    data.forEach((element) => renderPosts(document.querySelector("#feed--container"), element));
}, postOption);
const createMessageTitle = document.querySelector("#title--feed");
const createMessageMessage = document.querySelector("#text-body--feed");
const createMessageMedia = document.querySelector("#media--feed");
const createMessageTags = document.querySelector("#tags--feed");
const postButton = document.querySelector("#post--button");
createMessageMedia === null || createMessageMedia === void 0 ? void 0 : createMessageMedia.addEventListener("input", () => {
    messageObject.media = createMessageMedia.value;
});
createMessageTitle === null || createMessageTitle === void 0 ? void 0 : createMessageTitle.addEventListener("input", () => {
    messageObject.title = createMessageTitle.value;
});
createMessageMessage === null || createMessageMessage === void 0 ? void 0 : createMessageMessage.addEventListener("input", () => {
    messageObject.body = createMessageMessage.value;
    console.log(messageObject);
});
createMessageTags === null || createMessageTags === void 0 ? void 0 : createMessageTags.addEventListener("input", () => {
    const tagArr = createMessageTags.value.split("#");
    messageObject.tags = tagArr;
    console.log(messageObject);
});
const messageObject = {
    title: "",
    body: "",
    media: "",
};
postButton === null || postButton === void 0 ? void 0 : postButton.addEventListener("click", () => {
    const message = optionFactory("POST", messageObject);
    callApi(endpoint.createPost, (data) => {
        console.log(data);
    }, message);
});
