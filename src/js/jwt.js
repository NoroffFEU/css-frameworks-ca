var registerObject = {
    email: "email",
    userName: "username",
    password: "password",
    repeatedPassword: "password"
};
var inputPassword = document.querySelector("#password--register");
var inputEmail = document.querySelector("#email--register");
var inputRpassword = document.querySelector("#password--register--repeat");
var inputUserName = document.querySelector("#username--register");
function collectInput(input, inputName) {
    input.addEventListener("input", function () {
        if (input.value) {
            registerObject[inputName] = input.value;
            console.log({ registerObject: registerObject });
        }
        return;
    });
}
collectInput(inputEmail, "email");
collectInput(inputPassword, "password");
collectInput(inputUserName, "userName");
collectInput(inputRpassword, "repeatedPassword");
//function registerAccount({email,userName,password,repeatedPassword}:registerInputValues){
//}
