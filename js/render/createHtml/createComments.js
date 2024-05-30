import { createElement } from "./createHtmlFunction.js";
import { parseDate } from "../../parse/parse.js";
import { renderCommentSection } from "../render.js";

export const createCommentsContainer = (id, comments) => {
  const element = createElement("div");
  element.id = id;

  const commentBtn = createElement("button", ["btn", "btn-info", "comment-btn"], undefined, "Comments");
  commentBtn.innerText += `  (${comments.length})`;

  commentBtn.addEventListener("click", () => {
    renderCommentSection(id, comments);
    commentBtn.style.display = "none";
  });

  element.append(commentBtn);
  return element;
};

export const createCommentForm = () => {
  const element = createElement("form");
  element.action = "post";

  const label = createElement("label", ["form-label", "fs2", "mt-2", "mb-0"], undefined, "Write Comment");
  label.for = "exampleFormControlTextarea1";

  const textArea = createElement("textarea", ["form-control"]);
  textArea.id = "exampleFormControlTextArea1";
  textArea.rows = "3";

  const btn = createElement("button", ["btn", "btn-info", "my-2"], undefined, "Comment");
  btn.type = "submit";

  element.append(label, textArea, btn);
  return element;
};

export const createComment = ({ owner, created, body }) => {
  const element = createElement("div", ["my-3", "bg-white", "p-2"]);
  const h4 = createElement("h4", ["text-primary", "fs-4", "fw-bold", "m-0"], undefined, owner);
  const date = parseDate(created);
  const parsedDate = createElement("p", ["m-0", "ps-3"], undefined, date);
  const headerContainer = createElement("div", ["border-bottom", "border-primary", "d-flex", "align-items-baseline", "mb-1"], [h4, parsedDate]);
  const p = createElement("p", undefined, undefined, body);

  element.append(headerContainer, p);
  return element;
};

export const displayCommentMsg = () => {
  const container = document.querySelector(".commentsContainer");
  const p = createElement("p", undefined, undefined, "No comments yet");
  const div = createElement("div", ["p-2", "bg-white"], [p]);
  container.append(div);
};
