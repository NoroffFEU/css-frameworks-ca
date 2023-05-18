import * as storage from "../storage/index.mjs";

function getCurrentUsername() {
  const currentUser = load("currentUser"); // replace 'currentUser' with the key you're using to save user info
  return currentUser ? currentUser.name : null;
}
