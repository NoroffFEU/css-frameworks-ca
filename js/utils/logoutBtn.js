export function logoutBtn() {
    // show log out button when user is logged in
    const logOutBtn = document.getElementById("logOutBtn");

    if (localStorage.getItem("token")) {
        logOutBtn.classList.remove("visually-hidden");
    }

    // remove information from local storage on logout
    logOutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.classList.add("visually-hidden");
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
    })
}