const logOutBtn = document.querySelector(".logout")

logOutBtn.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    window.location.href = "/profile/login";
});