import * as index from "../storage/index.mjs";

export function setLogoutListener(){
   const logoutButton = document.querySelector("#logout");

   logoutButton.addEventListener("click", () => {
      index.remove("token");
      index.remove("name");
      location.href = "/";
   });
}