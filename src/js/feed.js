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
const sortInput = document.querySelector("#sort--feed");
const sortOrder = document.querySelector("#sort--order");
const searchInput = document.querySelector("#search--feed");
const searchButton = document.querySelector("#search--button");
searchButton.addEventListener("click", () => {
    callApi(endpoint.sortAndPaginate.setString(endpoint.generatePaginate(sortInput.value, sortOrder.value)), (data) => {
        if (searchInput.value) {
            if (searchApi(data, sortInput.value, searchInput.value)) {
                renderPosts(postContainer, searchApi(data, sortInput.value, searchInput.value));
            }
            else if (data.length === 1) {
                renderPosts(postContainer, data[0]);
            }
        }
        else {
            data.forEach((element) => renderPosts(postContainer, element));
            console.log("else route");
        }
        const observedObj = document.querySelectorAll("[data-observed]");
        const target = observedObj[observedObj.length - 1];
        console.log(observedObj, target);
        setTarget();
        isObserving(true, intersectionObserver);
    }, postOption);
});
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
function callApi(endpoint, callBack, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(endpoint, options);
        const data = yield response.json();
        callBack(data);
    });
}
function renderPosts(domEl, { id, title, body, tags, media, created, updated, _count, author }) {
    domEl.innerHTML += ` <div data-observed  class=" card mb-3 bg-secondary p-2 w-percentage--95">
    <div class="row">
      <a href="/src/profile/index.html?user=${author.name}" class="col-4">
        <img 
          class="rounded-circle w-25"
          src=${author.avatar}
          alt="Profile picture of Thistle" />
        <span class="text-primay fs-6">${author.name}</span>
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
callApi(endpoint.sortAndPaginate.setString(endpoint.generatePaginate(sortInput.value, sortOrder.value)), (data) => {
    console.log(data);
    if (searchInput.value) {
        if (searchApi(data, sortInput.value, searchInput.value)) {
            renderPosts(postContainer, searchApi(data, sortInput.value, searchInput.value));
        }
        else if (data.length === 1) {
            renderPosts(postContainer, data[0]);
        }
    }
    else {
        data.forEach((element) => renderPosts(postContainer, element));
        console.log("else route");
    }
    //console.log(data);
    const observedObj = document.querySelectorAll("[data-observed]");
    const target = observedObj[observedObj.length - 1];
    console.log(observedObj, target);
    setTarget();
    isObserving(true, intersectionObserver);
}, postOption);
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
    tags: [],
};
postButton === null || postButton === void 0 ? void 0 : postButton.addEventListener("click", () => {
    const message = optionFactory("POST", messageObject);
    callApi(endpoint.createPost, (data) => {
        console.log(data);
    }, message);
});
/*
const options = optionFactory("GET", {}, endpoint);
const searchSelect = document.querySelector(
  "#select--search--feed"
) as HTMLSelectElement;
const sortInput = document.querySelector("#search--feed") as HTMLInputElement;
const searchButton = document.querySelector(
  "#search--button"
) as HTMLButtonElement;

type searchCategory = "user" | "created" | "title" | "tags";

searchButton?.addEventListener("click", () => {
  const category: searchCategory = searchSelect.value;
  const query: string = searchInput.value;
  console.log(endpoint.searchFor(category, query));
  callApi(
    endpoint.searchFor(category, query),
    (data) => {
      console.log(data);
    },
    options
  );
});
*/
const intersectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
        callApi(endpoint.sortAndPaginate.setString(endpoint.generatePaginate(sortInput.value, sortOrder.value)), (data) => {
            if (data.length === 1) {
                renderPosts(postContainer, data[0]);
            }
            else
                data.forEach((element) => renderPosts(postContainer, element));
            isObserving(false, intersectionObserver);
            setTarget();
            isObserving(true, intersectionObserver);
            console.log("string=" + endpoint.sortAndPaginate.getString(), "count=" + endpoint.sortAndPaginate.getCount(), data);
        }, postOption),
            {
                root: null,
                rootMargin: "0px",
                threshold: 1,
            };
    }
}));
function searchApi(array, category, searchWord) {
    if (!searchWord || !category) {
        console.log("returned early");
        return;
    }
    console.log("category=", category, searchWord);
    let searchedItem = array.find((object) => { var _a; return (_a = object[category]) === null || _a === void 0 ? void 0 : _a.includes(searchWord); });
    console.log(searchedItem, "11111111111111111111111111111");
    if (searchedItem) {
        return searchedItem;
    }
    else {
        console.log("fail");
        callApi(endpoint.sortAndPaginate.setString(endpoint.generatePaginate(sortInput.value, sortOrder.value)), (data) => {
            if (searchInput.value)
                searchedItem = array.find((object) => { var _a; return (_a = object[category]) === null || _a === void 0 ? void 0 : _a.includes(searchWord); });
            console.log(searchedItem, "11111111111111111111111111111");
            if (searchedItem) {
                renderPosts(postContainer, searchedItem);
            }
            else if (data.length === 1) {
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
        }, postOption);
    }
}
if (searchInput.value) {
    console.log("TESTerewrewrewr");
}
