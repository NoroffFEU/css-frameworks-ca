//Functions
import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";
import { createPost } from "./api/posts/create.mjs";

const path = location.pathname;

if (path === "/profil/login/index.html") {
  setloginFormListener();
} else if (path === "/profil/register/index.html") {
  setRegisterFormListener();
}

createPost({
  title: "Example",
  body: "hello there",
});
