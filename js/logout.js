const logOutBtn = document.querySelector(".logout")

/**
 * Logs out the user from the site by removing the accesstoken, name and redirects user to the login page.
 * 
 */
logOutBtn.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    window.location.href = "/index.html";
});