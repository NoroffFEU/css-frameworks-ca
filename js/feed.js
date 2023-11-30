import { API_BASE_URL, loginUrl, registerUrl } from "./main.js";
console.log(API_BASE_URL, loginUrl, registerUrl);
/**
 * Checks if there is an accesToken in local storage and directs to login if not found
 */

(function () {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = "/login/";
  }
})();
