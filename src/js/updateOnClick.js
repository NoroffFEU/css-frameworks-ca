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
import optionFactory from "./optionFactory.js";
import callApi from "./callApi.js";
import renderModal from "./renderModal.js";
const endpoint = endpointObject(JSON.parse(localStorage.getItem("currentUser")));
function showModal() {
    document.querySelector("#modalEdit").style.display = "block";
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
function getPostText(id) {
    var _a, _b, _c, _d;
    const modalTitle = document.querySelector("#title__modal--edit");
    const modalBody = document.querySelector("#body__modal--edit");
    const modalTags = document.querySelector("#tags__modal--edit");
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
    modalTitle.value = (_a = document.querySelector(`#title${id}`)) === null || _a === void 0 ? void 0 : _a.innerText;
    modalBody.value = (_b = document.querySelector(`#body${id}`)) === null || _b === void 0 ? void 0 : _b.innerText;
    const tagArr = Array.from(document.querySelectorAll(`.tag${id}`));
    modalTags.value = tagArr.map((tag) => tag.innerText).join("#");
    editObject.setAll((_c = document.querySelector(`#body${id}`)) === null || _c === void 0 ? void 0 : _c.innerText, (_d = document.querySelector(`#title${id}`)) === null || _d === void 0 ? void 0 : _d.innerText, tagArr.map((element) => element.innerText));
    console.log(tagArr);
}
export default function updatePost(posts) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const test = yield renderModal(1);
        document.querySelectorAll("[data-update-id]").forEach((button) => button.addEventListener("click", () => {
            const id = button.dataset.updateId;
            editObject.id = id;
            getPostText(id);
            showModal();
        }));
        (_a = document.querySelector("#close-modal")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            document.querySelector("#modalEdit").style.display = "none";
        });
        const postButton = document.querySelector("#modal-post-button");
        postButton === null || postButton === void 0 ? void 0 : postButton.addEventListener("click", () => {
            const editOption = optionFactory("PUT", editObject, endpoint);
            const id = editObject.id;
            console.log(id);
            callApi(endpoint.getId(id), editOption);
        });
    });
}
