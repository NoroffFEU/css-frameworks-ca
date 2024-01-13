import { registerNewUser } from "./src/api/auth/register.js";
import { loginUser } from "./src/api/auth/login.js"

// Gets values from sign up module and sends them to API
document.getElementById("submitBtn2").addEventListener("click", async (event) => {
    event.preventDefault();
    const nameSignUpValue = document.getElementById("InputName2").value;
    const emailSignUpValue = document.getElementById("InputEmail2").value;
    const passwordSignUpValue = document.getElementById("InputPassword2").value;
    const avatarSignUpValue = document.getElementById("InputAvatar2").value;
    let userData = "";
    try {
        userData = await registerNewUser(nameSignUpValue, emailSignUpValue, passwordSignUpValue, avatarSignUpValue);
    } catch (error) {
        console.log(error);
    }
    if (userData.email === emailSignUpValue) {
        window.location.href = `./feed/index.html`;
    }
});

// Gets values from login module and sends them to API
document.getElementById("submitBtn1").addEventListener("click", async (event) => {
    event.preventDefault();
    const emailLoginValue = document.getElementById("InputEmail1").value;
    const passwordLoginValue = document.getElementById("InputPassword1").value;

    const userData = await loginUser(emailLoginValue, passwordLoginValue);

    if (userData.email === emailLoginValue) {
        window.location.href = `./feed/index.html`;
    }
});