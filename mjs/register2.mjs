const mainApiUrl = "https://api.noroff.dev";
const registerUrl = `${mainApiUrl}/social/auth/register`;
const formReg = document.getElementById("formRegister");

//TODO: Brukes ikke -- kan slettes?
async function registerUser(url, userData) {
    try {
        console.log(url, userData);
    }
    catch (error) {
        console.log(error);
    }
}

var nameReg = formReg.elements[0];
var mailReg = formReg.elements[1];
var passwordReg = formReg.elements[2];

var userName = nameReg.value;
var userEmail = mailReg.value;
var userPassword = passwordReg.value;


const userToRegister = {
    "name": userName,
    "email": userEmail,
    "password": userPassword
}



formReg.addEventListener("submit", registerUser(registerUrl, userToRegister));


//TODO: Kan slettes også?
export { registerUser };