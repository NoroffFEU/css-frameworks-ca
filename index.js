import { registerUser } from "./js/entry/register.js";
import { loginUser } from "./js/entry/login.js";
import { checkIfLoggedIn } from "./js/entry/loginWall.js";

const login = document.getElementById("log-in");
const register = document.getElementById("register");

register.addEventListener("submit", () => {
  event.preventDefault();
  const [userName, email, password] = event.target.elements;
  registerUser(userName, email, password);
  register.reset();
});

login.addEventListener("submit", () => {
  event.preventDefault();
  const [email, password] = event.target.elements;
  loginUser(email, password);
  login.reset();
});

checkIfLoggedIn();
