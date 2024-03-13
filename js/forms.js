const noAccBtn = document.getElementById("register-btn-access")
const goToLogin = document.getElementById("login-btn-access")

const regForm = document.getElementById("reg")
var loginForm = document.getElementById("login")

function hideLogin() {
    loginForm.classList.add("hidden")
    regForm.classList.remove("hidden");
}

noAccBtn.addEventListener("click", hideLogin)

function hideReg() {
    loginForm.classList.remove("hidden")
    regForm.classList.add("hidden");
}

goToLogin.addEventListener("click", hideReg)