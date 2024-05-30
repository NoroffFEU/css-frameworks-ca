import { createElement } from "./createHtmlFunction.js";
const postContainer = document.getElementById("posts-container");

export const createUserCardContainer = () => {
  const element = createElement("div", ["d-flex", "flex-wrap", "justify-content-center"]);
  element.id = "userCardsContainer";
  postContainer.append(element);
};

export const createUserCard = (name, email, avatar, _count) => {
  const element = createElement("a", ["card", "m-1", "border", "border-primary"], undefined, undefined, `../../profile/index.html?id=${name}`);

  const cardBody = createCardBody(name, email, avatar, _count);

  element.append(cardBody);

  return element;
};

const createCardBody = (name, email, avatar, _count) => {
  const element = createElement("div", ["card-body"]);
  const userInfo = createUserInfoContainer(name, email, avatar);

  element.append(userInfo);

  if (_count) {
    const userStats = createUserStats(_count);
    element.append(userStats);
  }

  return element;
};

const createUserInfoContainer = (name, email, avatar) => {
  const element = createElement("div", ["d-flex", "flex-column", "flex-sm-row"]);
  const img = createAvatar(avatar, name);
  const userInfo = createUserInfo(name, email);

  element.append(img, userInfo);
  return element;
};

const createAvatar = (avatar, name) => {
  const element = createElement("img", ["me-2"], undefined, undefined, undefined, `../../images/profile.jpg`, `profileAvatar`);

  if (avatar) {
    element.src = avatar;
    element.alt = name;
  }
  return element;
};

const createUserInfo = (name, email) => {
  const element = createElement("div");
  const userName = createElement("p", ["text-primary", "fw-bold", "m-0"], undefined, name);
  const mail = createElement("p", ["card-subtitle"], undefined, email);

  element.append(userName, mail);
  return element;
};

const createUserStats = ({ followers, following, posts }) => {
  const element = createElement("div", ["border-top", "border-primary", "mt-1"]);
  const followersStats = createElement("p", ["m-0"], undefined, `Followers: ${followers}`);
  const followingStats = createElement("p", ["m-0"], undefined, `Following: ${following}`);
  const postsStats = createElement("p", ["m-0"], undefined, `Posts: ${posts}`);

  element.append(followersStats, followingStats, postsStats);
  return element;
};
