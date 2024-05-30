import { createElement } from "./createHtmlFunction.js";
import { createImgInput } from "../../utils/fetchImgUrl.js";

export const createEditModal = (title, body, media) => {
  const main = document.querySelector("main");

  const form = createEditForm(title, body, media);

  const p = createElement("p", ["text-primary", "fw-bold"], undefined, "Edit Post");
  const closeBtn = createElement("p", ["fw-bold"], undefined, "X");
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => {
    modal.remove();
  });
  const div = createElement("div", ["d-flex", "justify-content-between"], [p, closeBtn]);

  const modal = createElement("div", ["edit-modal", "position-fixed", "bg-white", "p-3", "border", "border-primary"], [div, form]);
  main.append(modal);

  return form;
};

const createEditForm = (title, body, media) => {
  const element = createElement("form", ["post-form", "border", "border-gray", "p-2"]);
  element.action = "get";

  const input = createElement("input", ["form-control", "border-white", "fw-bold"]);
  input.id = "exampleFormControlInput";
  input.type = "title";
  input.value = title;

  const textArea = createElement("textArea", ["form-control", "border-white"]);
  textArea.id = "exampleFormControlInput";
  textArea.rows = "5";
  textArea.value = body;

  const urlInput = createImgInput();
  urlInput.classList.add("p-2");
  urlInput.value = media;
  urlInput.placeholder = "";

  const div = createElement("div", ["mb-3", "bg-white"], [input, textArea, urlInput]);

  const btn = createElement("button", ["btn", "btn-info", "my-2"], undefined, "Post");
  btn.type = "submit";

  element.append(input, div, btn);
  return element;
};
