import { API_BASE_URL } from "../routes.mjs";
//import * as storage from "../accessToken.mjs";

const loginuser = "/auth/login";
//const method = "post";

/*async function login(profile) {
    const loginurl = API_BASE_URL + loginuser;
    const body = JSON.stringify(profile);
    const response = await fetch(loginurl, {
        headers: {
            "content-type": "applicaiton/json",
        },
        method,
        body,
    });
    console.log(loginurl);
    const {accessToken, ...user} = await response.json();
    storage.save("token", accessToken);
    storage.save("profile", user);
    alert("You are now logged in");

    window.location.replace("/posts/index.html");
}*/

document.addEventListener("DOMContentLoaded", function () {
    
    const loginform = document.getElementById("loginform");

    loginform.addEventListener("submit", function (e) {
        e.preventDefault();

        const LOGIN_API_URL = API_BASE_URL + loginuser;

        const email = document.getElementById("loginemail");
        const password = document.getElementById("loginpassword");
        console.log(LOGIN_API_URL);
        const logindata = {
            email: email.value,
            password: password.value,
        };

        fetch(LOGIN_API_URL, {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(logindata),
        })

        .then((response) =>{
            if(!response.ok) {
                throw error("Login Failed");
            }
            return response.json();
        })
        .then((data)=> {
            const accessToken = data.accessToken;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("isLoggedin", "true");
            window.location.href = "../../profile/index.html"
        })

        .catch((error) => {
            console.error("Login error:", error);
        })
    })
})