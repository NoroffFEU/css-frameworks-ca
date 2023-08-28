import * as listeners from "./handlers/index.mjs";

export default function router() {
  const path = location.pathname;

  switch (path) {
    case '/authentication/login/':
      listeners.setLoginFormListener()
      return;
    case '/authentication/register/':
      listeners.setRegisterFormListener()
      return;
    case '/post/create/':
      listeners.setCreatePostFormListener()
      return;
    case '/post/edit/':
      listeners.setUpdatePostListener()
      return;
    case '/profile/edit/':
      listeners.setUpdateProfileListener()
      return;
    case '/profile/':
      listeners.setReadProfileListener()
      return;
    case '/posts/':
      listeners.setReadPostsListener()
      return;
  }
}