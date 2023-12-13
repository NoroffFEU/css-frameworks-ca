import { checkLogin, getProfile, jwtDecoder } from "./module.mjs";
import { profilePicture, API_BASE_URL, accessToken } from "./constants.js";

checkLogin(accessToken);

const editForm = document.querySelector("#editForm");
const newAvatar = document.querySelector("#newAvatar");
const newBanner = document.querySelector("#newBanner");
const discardChanges = document.querySelector("#discardChanges");

const JWT = jwtDecoder(accessToken);
console.log(JWT);

getProfile(API_BASE_URL + "/profiles/", JWT.name)
  .then((data) => data.json())
  .then((json) => {
    console.log(json);
    if (json.avatar !== "") {
      profilePicture.setAttribute("src", JWT.avatar);
    }
    if (json.avatar !== "") {
      console.log("avatar found:", json.avatar);
      newAvatar.value = json.avatar;
    }
    if (json.banner !== "") {
      newBanner.value = json.banner;
    }
  });

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(newAvatar.value, newBanner.value);
  fetch(API_BASE_URL + `/profiles/${JWT.name}/media`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      avatar: newAvatar.value,
      banner: newBanner.value,
    }),
  })
    .then((data) => data.json())
    .then((json) => {})
    .then(() => {
      window.location.href = `../../profile/?${JWT.name}`;
    });
});

discardChanges.addEventListener("click", (event) => {
  window.location.href = `../../profile/?${JWT.name}`;
});
