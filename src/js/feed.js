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
import callApi from "./callApi.js";
const endpoint = endpointObject("Jarle");
const sortInput = document.querySelector("#sort--feed");
const sortOrder = document.querySelector("#sort--order");
const searchInput = document.querySelector("#search--feed");
const searchButton = document.querySelector("#search--button");
const createMessageTitle = document.querySelector("#title--feed");
const createMessageMessage = document.querySelector("#text-body--feed");
const createMessageMedia = document.querySelector("#media--feed");
const createMessageTags = document.querySelector("#tags--feed");
const postButton = document.querySelector("#post--button");
const postContainer = document.querySelector("#feed--container");
createMessageMedia === null || createMessageMedia === void 0 ? void 0 : createMessageMedia.addEventListener("input", () => {
    messageObject.media = createMessageMedia.value;
});
createMessageTitle === null || createMessageTitle === void 0 ? void 0 : createMessageTitle.addEventListener("input", () => {
    messageObject.title = createMessageTitle.value;
});
createMessageMessage === null || createMessageMessage === void 0 ? void 0 : createMessageMessage.addEventListener("input", () => {
    messageObject.body = createMessageMessage.value;
});
createMessageTags === null || createMessageTags === void 0 ? void 0 : createMessageTags.addEventListener("input", () => {
    const tagArr = createMessageTags.value.split("#");
    messageObject.tags = tagArr;
});
searchInput.addEventListener("input", () => {
    console.log(endpoint.sortAndPaginate.getSearch());
    endpoint.sortAndPaginate.setSearch(searchInput.value);
    console.log(endpoint.sortAndPaginate.getSearch());
});
searchButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const data = !searchInput.value
        ? yield callApi(endpoint.sortAndPaginate.setString(endpoint.generatePaginate(sortInput.value, sortOrder.value)), postOption)
        : yield callApi(endpoint.sortAndPaginate.setString(endpoint.generatePaginate(sortInput.value, sortOrder.value), 100, 100), postOption);
    console.log(data, searchInput.value);
    if (endpoint.sortAndPaginate.getCount() == 0) {
        postContainer.innerHTML = "";
    }
    if (searchInput.value) {
        let foundItem = yield searchApi(data, sortInput.value, 0, searchInput.value);
        console.log(foundItem ? "true" : "false");
        if (foundItem) {
            renderPosts(postContainer, foundItem);
        }
        else if (data.length === 1) {
            renderPosts(postContainer, data[0]);
        }
    }
    else {
        data.forEach((element) => renderPosts(postContainer, element));
        console.log("else route");
        const observedObj = document.querySelectorAll("[data-observed]");
        const target = observedObj[observedObj.length - 1];
        console.log(observedObj, target);
        setTarget();
        isObserving(true, intersectionObserver);
    }
}));
function observerTargetClosure() {
    let target;
    function setTarget() {
        if (document.querySelectorAll("[data-observed]")) {
            const observedObj = document.querySelectorAll("[data-observed]");
            target = observedObj[observedObj.length - 1];
        }
    }
    function isObserving(bool, obs) {
        console.log(target);
        bool ? obs.observe(target) : obs.unobserve(target);
    }
    return [setTarget, isObserving];
}
const [setTarget, isObserving] = observerTargetClosure();
function renderPosts(domEl, { id, title, body, tags, media, created, updated, _count, author }) {
    domEl.innerHTML += ` <div data-observed  class=" card mb-3 bg-secondary p-2 w-percentage--95">
    <div class="row">
      <a href="/src/profile/index.html?user=${author.name ? author.name : ""}" class="col-4">
        <img 
          class="rounded-circle w-25"
          src=${author.avatar ? author.avatar : ""}
          alt="Profile picture of Thistle" />
        <span class="text-primay fs-6">${author.name ? author.name : ""}</span>
      </a>
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield callApi(endpoint.sortAndPaginate.setString(endpoint.generatePaginate(sortInput.value, sortOrder.value)), postOption);
    if (data.length === 1) {
        renderPosts(postContainer, data[0]);
    }
    else {
        data.forEach((element) => renderPosts(postContainer, element));
    }
    const observedObj = document.querySelectorAll("[data-observed]");
    const target = observedObj[observedObj.length - 1];
    console.log(observedObj, target);
    setTarget();
    isObserving(true, intersectionObserver);
}))();
const messageObject = {
    title: "",
    body: "",
    media: "",
    tags: [],
};
postButton === null || postButton === void 0 ? void 0 : postButton.addEventListener("click", () => {
    const message = optionFactory("POST", messageObject);
    callApi(endpoint.createPost, (data) => {
        console.log(data);
    }, message);
});
const intersectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => __awaiter(void 0, void 0, void 0, function* () {
    if (entry.isIntersecting) {
        const data = yield callApi(endpoint.sortAndPaginate.setString(endpoint.generatePaginate(sortInput.value, sortOrder.value)), postOption);
        if (endpoint.sortAndPaginate.getCount() == 0) {
            postContainer.innerHTML = "";
        }
        if (data.length === 1) {
            renderPosts(postContainer, data[0]);
        }
        else
            data.forEach((element) => renderPosts(postContainer, element));
        isObserving(false, intersectionObserver);
        setTarget();
        isObserving(true, intersectionObserver);
    }
})), {
    root: null,
    rootMargin: "0px",
    threshold: 1,
});
function searchApi(array, category, count = 0, searchWord = null) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!searchWord || count > 10) {
            return;
        }
        const foundWord = array.find((string) => string[category].toLowerCase().includes(searchWord === null || searchWord === void 0 ? void 0 : searchWord.toLowerCase()));
        if (foundWord) {
            return foundWord;
        }
        else {
            try {
                const data = yield callApi(endpoint.sortAndPaginate.setString(endpoint.generatePaginate(sortInput.value, sortOrder.value), 100, 100), postOption);
                console.log(endpoint.sortAndPaginate.getString(), endpoint.sortAndPaginate.getCount());
                if (data && data.length > 1) {
                    return searchApi(data, category, count + 1, searchWord);
                }
            }
            catch (error) {
                throw error;
            }
        }
    });
}
