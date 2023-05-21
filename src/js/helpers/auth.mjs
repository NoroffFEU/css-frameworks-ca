import { isLoggedIn } from "./storage.mjs";

export function redirectBasedOnLogin(pathname) {
  if (isLoggedIn()) {
    if (pathname === "/" || pathname === "/index.html") {
      location.href = "/posts/";
    }
  } else {
    if (
      pathname === "/posts/" ||
      pathname === "/posts/index.html" ||
      pathname === "/post/edit/" ||
      pathname === "/post/edit/index.html" ||
      pathname === "/post/edit/editpage.html" ||
      pathname === "/profile/edit" ||
      pathname === "/profile/edit/index.html"
    ) {
      location.href = "/index.html";
    }
  }
}
