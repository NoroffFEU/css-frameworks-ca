import { apiBaseUrl } from "./script.mjs";

const loginUrl = "/social/auth/login";

async function loginUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    console.log(json);

    return json;
  } catch (error) {
    console.log(error, "An error occurred!");
  }
}

const loginForm = document.querySelector("#loginForm");

function login(event) {
  event.preventDefault();
  const [email, password] = event.target.elements;

  const user = {
    email: email.value,
    password: password.value,
  }

  loginUser(`${apiBaseUrl}${loginUrl}`, user);

}

loginForm.addEventListener("submit", login);