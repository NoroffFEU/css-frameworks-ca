import { endpoints } from "./endpoints.js";

type registerProp = "email" | "userName" | "password" | "repeatedPassword";

interface registerInputValues {
  email: string;
  userName: string;
  password: string;
  repeatedPassword: string;
}

const registerObject: registerInputValues = {
  email: "email",
  userName: "username",
  password: "password",
  repeatedPassword: "password",
};

const inputPassword = document.querySelector(
  "#password--register"
) as HTMLInputElement;
const inputEmail = document.querySelector(
  "#email--register"
) as HTMLInputElement;
const inputRpassword = document.querySelector(
  "#password--register--repeat"
) as HTMLInputElement;
const inputUserName = document.querySelector(
  "#username--register"
) as HTMLInputElement;
const loginUserName = document.querySelector(
  "#username--login"
) as HTMLInputElement;
const loginPassword = document.querySelector(
  "#password--login"
) as HTMLInputElement;
const buttonRegister = document.querySelector("#button--register");
const buttonLogin = document.querySelector("#button--login");
const loginObject: { email: string; password: string } = {
  email: loginUserName.value ? loginUserName.value : "",
  password: loginPassword.value ? loginPassword.value : "",
};

loginPassword.addEventListener("input", () => {
  loginObject.password = loginPassword.value;
  console.log(loginObject);
});
loginUserName.addEventListener("input", () => {
  loginObject.email = loginUserName.value;
  console.log(loginObject);
});

function collectInput(input: HTMLInputElement, inputName: registerProp) {
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

async function registerAccount({
  email,
  userName,
  password,
}: registerInputValues) {
  const response = await fetch(`${endpoints.baseUrl + endpoints.register}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, name: userName, password }),
  });
  const data = await response.json();
}

buttonRegister?.addEventListener("click", () => {
  registerAccount(registerObject);
});
buttonLogin?.addEventListener("click", () => {
  login(loginObject);
});

async function login({ email, password }: typeof loginObject) {
  const response = await fetch(`${endpoints.baseUrl + endpoints.login}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  console.log(data);
  localStorage.setItem("token", JSON.stringify(data.accessToken));
  localStorage.setItem("currentUser", JSON.stringify(data.name));
  localStorage.setItem("avatar", JSON.stringify(data.avatar));
  //changePage(data.name);
}

function changePage(name: string) {
  window.location.href = `/src/profile/index.html?user=${name}&current=${name}`;
}
