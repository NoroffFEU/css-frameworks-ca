var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import callApi from "./callApi.js";
import endpointObject from "./endpoints.js";
import optionFactory from "./optionFactory.js";
import renderPosts from "./renderPost.js";
import commentButton from "./commentOnClick.js";
import deletePost from "./deleteOnClick.js";
import updatePost from "./updateOnClick.js";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const endpoint = endpointObject("Jarle");
const getId = optionFactory("GET", {}, endpoint);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield callApi(endpoint.getId(id), getId);
    console.log("data:", data);
    renderPosts(document.querySelector("#postContainer"), data);
    commentButton();
    deletePost();
    updatePost();
}))();
