const currentUserName = localStorage.getItem("user");
const currentUserAvatar = JSON.parse(localStorage.getItem("avatar"));

const currentUserNameContainer = document.querySelector(".user-name");
function showUserName() {
  currentUserNameContainer.innerHTML = currentUserName;
}

const userTitle = document.querySelector("title");
function showTitle() {
  userTitle.innerText = `SocialVibe |${currentUserName}  Profile`;
}

const avatarContainer = document.querySelector(".custom-user");
function showAvatar() {
  const userAvatar = document.createElement("img");

  if (currentUserAvatar === null) {
    userAvatar.src = "./asset/images/profile-pic.jpg";
  } else {
    userAvatar.src = currentUserAvatar;
  }
  userAvatar.alt = "User";
  avatarContainer.append(userAvatar);
}
export { showUserName, showTitle, showAvatar, currentUserName };
