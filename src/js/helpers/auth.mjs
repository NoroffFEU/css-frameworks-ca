import { isLoggedIn } from "./storage.mjs";

/**
  *Redirects the user based on their login status and the current pathname.
  *If the user is logged in and the pathname is "/" or "/index.html", it redirects to "/posts/".
  *If the user is not logged in and the pathname matches certain paths, it redirects to "/index.html".
  *@param {string} pathname - The current pathname.
*/
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
      pathname === "/profile/edit/index.html" ||
      pathname === "/post/singlepost.html"
    ) {
      location.href = "/index.html";
    }
  }
};
