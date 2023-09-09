var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import endpoints from "./endpoints.js";
const queries = new URLSearchParams(window.location.search);
const userId = queries.get("user");
const endpoint = endpoints(userId);
const profileElements = {
    user: document.querySelector("#userName"),
    email: document.querySelector("#email"),
    img: document.querySelector("#profile--picture"),
    background: document.querySelector("#profile--header"),
};
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
console.log(endpoint);
function fetchPosts(url) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(localStorage.getItem("token"));
        const response = yield fetch(url, {
            headers: { Authorization: `Bearer ${endpoint.getToken()}` },
        });
        const data = yield response.json();
        updateProfile(data);
        console.log(data);
    });
}
fetchPosts(endpoint.profileOneUser);
