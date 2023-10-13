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
import renderPosts from "./renderPost.js";
import filterPosts from "./filter.js";
import createSmileyPicker from "./emoji.js";
import reactToPost from "./reactToPost.js";
import fadeText from "./fadeText.js";
import commentButton from "./commentOnClick.js";
import deletePost from "./deleteOnClick.js";
import updatePost from "./updateOnClick.js";
const endpoint = endpointObject("Jarle");
const [setSmiley, setId, getSmiley, getId] = createSmileyPicker();
let modal = document.querySelector("#modal");
const closeModal = document.querySelector("[data-closeButton]");
closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});
const sortInput = document.querySelector("#sort--feed");
const sortOrder = document.querySelector("#sort--order");
const searchInput = document.querySelector("#search--feed");
const filterButton = document.querySelector("#filter--button");
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
    endpoint.filterUrl.resetCount();
    endpoint.sortAndPaginate.setSearch(searchInput.value);
});
filterButton === null || filterButton === void 0 ? void 0 : filterButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(endpoint.filterUrl.getCount());
    endpoint.filterUrl.resetCount();
    console.log(endpoint.filterUrl.getCount());
    postContainer.innerHTML = "";
    const allPosts = yield filterPosts(searchInput.value, sortInput.value);
    allPosts.forEach((post) => renderPosts(postContainer, post));
    emojiReactButton();
    commentButton();
}));
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
        emojiReactButton();
        commentButton();
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
            console.log(target);
        }
    }
    function isObserving(bool, obs) {
        console.log(target);
        bool ? obs.observe(target) : obs.unobserve(target);
    }
    return [setTarget, isObserving];
}
const [setTarget, isObserving] = observerTargetClosure();
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
const messageObject = {
    title: "",
    body: "",
    media: "",
    tags: [],
};
postButton === null || postButton === void 0 ? void 0 : postButton.addEventListener("click", () => {
    const message = optionFactory("POST", messageObject);
    callApi(endpoint.createPost, message);
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
        emojiReactButton();
        commentButton();
        isObserving(false, intersectionObserver);
        setTarget();
        isObserving(true, intersectionObserver);
    }
})), {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
});
function searchApi(array, category, count = 0, searchWord = null) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (!searchWord || count > 10) {
            return;
        }
        let foundWord;
        if ((_b = (_a = array[0]) === null || _a === void 0 ? void 0 : _a[category]) === null || _b === void 0 ? void 0 : _b.name) {
            console.log("author");
            foundWord = array.find((post) => post[category].name.toLowerCase() === searchWord.toLowerCase());
        }
        else if (Array.isArray((_c = array[0]) === null || _c === void 0 ? void 0 : _c[category])) {
            foundWord = array.find((post) => post.tags.some((element) => element.toLowerCase() === searchWord.toLowerCase()));
        }
        else {
            console.log("conventional route");
            foundWord = array.find((post) => { var _a; return ((_a = post[category]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === (searchWord === null || searchWord === void 0 ? void 0 : searchWord.toLowerCase()); });
        }
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
                console.log(error);
            }
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield callApi(endpoint.sortAndPaginate.setString(endpoint.generatePaginate(sortInput.value, sortOrder.value)), postOption);
    if (data.length === 1) {
        renderPosts(postContainer, data[0]);
    }
    else {
        data.forEach((element) => renderPosts(postContainer, element));
    }
    emojiReactButton();
    commentButton();
    deletePost();
    updatePost(data);
    const observedObj = document.querySelectorAll("[data-observed]");
    const target = observedObj[observedObj.length - 1];
    console.log(observedObj, target);
    setTarget();
    isObserving(true, intersectionObserver);
}))();
document.querySelectorAll("[data-buttonSelector]").forEach((button) => {
    button.addEventListener("click", () => {
        setSmiley(button.textContent);
        const smiley = getSmiley();
        const smileyId = getId();
        if (smiley && smileyId) {
            reactToPost(smiley, smileyId);
            fadeText();
            modal === null || modal === void 0 ? void 0 : modal.style.display = "none";
        }
    });
});
function emojiReactButton() {
    document.querySelectorAll("[data-id]").forEach((button) => {
        button.addEventListener("click", () => {
            console.log("clicked");
            let buttonRect = button.getBoundingClientRect();
            modal.style.top = buttonRect.top + "px";
            modal.style.left = buttonRect.left + "px";
            modal.style.display = "grid";
            setId(button.dataset.id);
            console.log(getId());
        });
    });
}
(function renderUserSpecific() {
    var _a;
    (_a = document.querySelector("[data-userName]")) === null || _a === void 0 ? void 0 : _a.textContent = JSON.parse(localStorage.getItem("currentUser"));
    document.querySelector("[data-userImg]").src = JSON.parse(localStorage.getItem("avatar"));
})();
