import callApi from "./callApi.js";
import createSmileyPicker from "./emoji.js";
import endpointObject from "./endpoints.js";
import fadeText from "./fadeText.js";
import optionFactory from "./optionFactory.js";

const endpoint = endpointObject("Jarle");
const put = optionFactory("PUT", { body: "test" }, endpoint);

async function reactToPost(symbol: string, id: string) {
  const data = await callApi(endpoint.react(symbol, id), put);
  console.log(data);
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
        modal?.style.display = "none";
      }
    });
  });

  const closeModal = document.querySelector("[data-closeButton]");
  closeModal?.addEventListener("click", () => {
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
