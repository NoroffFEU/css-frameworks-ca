"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const registerObject = {
    email: "email",
    userName: "username",
    password: "password",
    repeatedPassword: "password"
};
const loginObject = { email: "", password: "" };
const inputPassword = document.querySelector("#password--register");
const inputEmail = document.querySelector("#email--register");
const inputRpassword = document.querySelector("#password--register--repeat");
const inputUserName = document.querySelector("#username--register");
const loginUserName = document.querySelector("#username--login");
const loginPassword = document.querySelector("#password--login");
const buttonRegister = document.querySelector("#button--register");
const buttonLogin = document.querySelector("#button--login");
loginPassword.addEventListener("input", () => {
    loginObject.password = loginPassword.value;
    console.log(loginObject);
});
loginUserName.addEventListener("input", () => {
    loginObject.email = loginUserName.value;
    console.log(loginObject);
});
function collectInput(input, inputName) {
    input.addEventListener("input", () => {
        if (input.value) {
            registerObject[inputName] = input.value;
            console.log({ registerObject });
        }
        return;
    });
}
collectInput(inputEmail, "email");
collectInput(inputPassword, "password");
collectInput(inputUserName, "userName");
collectInput(inputRpassword, "repeatedPassword");
const endpoints = {
    register: "/social/auth/register",
    login: "/social/auth/login",
    baseUrl: "https://api.noroff.dev/api/v1"
};
function registerAccount({ email, userName, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${endpoints.baseUrl + endpoints.register}`, { method: "POST", headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, name: userName, password }) });
        const data = yield response.json();
    });
}
buttonRegister === null || buttonRegister === void 0 ? void 0 : buttonRegister.addEventListener("click", () => {
    registerAccount(registerObject);
});
buttonLogin === null || buttonLogin === void 0 ? void 0 : buttonLogin.addEventListener("click", () => {
    login(loginObject);
});
function login({ email, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${endpoints.baseUrl + endpoints.login}`, { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ email, password }) });
        const data = yield response.json();
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        changePage(data.name);
    });
}
function changePage(name) {
    window.location.href = `/src/profile/index.html?user=${name}`;
}
