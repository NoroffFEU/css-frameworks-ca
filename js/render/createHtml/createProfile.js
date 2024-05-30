import { createElement } from "./createHtmlFunction.js";

const profileInfoContainer = document.getElementById("profile-info");
const feedBtnContainer = document.getElementById("feed-btn-container");

export const createProfileInfo = (name, email, avatar) => {
  const img = createElement("img", ["me-2", "profile-img"], undefined, undefined, undefined, "../images/profile.jpg", `${name}`);

  if (avatar) {
    img.src = avatar;
  }

  const element = createElement("div");
  const h1 = createElement("h1", ["text-primary", "mb-1"], undefined, name);
  const p = createElement("p", ["mb-1"], undefined, email);
  const button = createElement("button", ["btn", "btn-primary", "text-white", "mt-1", "profile-btn"], undefined, "Follow");
  const div = createElement("div", ["profile-btn-container"], [button]);
  element.append(h1, p, div);

  profileInfoContainer.append(img, element);
};

export const createFeedBtnInfo = ({ posts, followers, following }) => {
  const btnsArray = Object.values(feedBtnContainer.children);

  btnsArray.forEach((btn, i) => {
    changeBtnInnerText(btn, i, 0, posts);
    changeBtnInnerText(btn, i, 1, following);
    changeBtnInnerText(btn, i, 2, followers);
  });
};

const changeBtnInnerText = (btn, i, number, text) => {
  if (i === number) {
    btn.innerText += ` (${text})`;
  }
};
