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
import createSmileyPicker from "./emoji.js";
import endpointObject from "./endpoints.js";
import fadeText from "./fadeText.js";
import optionFactory from "./optionFactory.js";
const endpoint = endpointObject("Jarle");
const put = optionFactory("PUT", { body: "test" }, endpoint);
function reactToPost(symbol, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield callApi(endpoint.react(symbol, id), put);
        console.log(data);
    });
}
const [setSmiley, setId, getSmiley, getId] = createSmileyPicker();
export default function reactToPostTwo() {
    document.querySelectorAll("[data-buttonSelector]").forEach((button) => {
        button.addEventListener("click", () => {
            let modal = document.querySelector("#modal");
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
    const closeModal = document.querySelector("[data-closeButton]");
    closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener("click", () => {
        let modal = document.querySelector("#modal");
        modal.style.display = "none";
    });
    (function emojiReactButton() {
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
    })();
}
