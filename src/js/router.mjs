import * as listeners from "./handlers/index.mjs";
import buildPosts from "./api/ui/common/buildPosts.mjs";
import { redirectBasedOnLogin } from "./helpers/auth.mjs";

export default function router() {
  const pathname = window.location.pathname;

  redirectBasedOnLogin(pathname);
  buildPosts(pathname);

  switch (pathname) {
    case "/":
    case "/index.html":
      listeners.setLoginFormListener();
      listeners.setRegisterFormListener();
      break;
    case "/posts/":
    case "/posts/index.html":
      break;
    case "/post/edit/":
    case "/post/edit/index.html":
      listeners.setCreatePostListener();
      listeners.setUpdatePostListener();
      break;
    case "/profile/edit/":
    case "/profile/edit/index.html":
      listeners.setUpdateProfileListener();
      break;
    case "/post/edit/editpage.html":
      listeners.setUpdatePostListener();
      break;
  }
}