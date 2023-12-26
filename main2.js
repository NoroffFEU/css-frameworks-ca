const mainApiUrl = "https://api.noroff.dev/api/v1";
const registerUrl = `${mainApiUrl}/social/auth/register`;
const logInUrl = `${mainApiUrl}/social/auth/login`;
const formReg = document.getElementById("formRegister");
const formLogin = document.getElementById("formLogin");
const getPostsUrl = `${mainApiUrl}/social/posts`;


// This eventListener gets the values of name, email and password and send them to the next function 
document.getElementById("submitBtn2").addEventListener("click", (event) => {
    event.preventDefault();

    const nameReg = formReg.elements[0];
    const mailReg = formReg.elements[1];
    const passwordReg = formReg.elements[2];

    const userName = nameReg.value;
    const userEmail = mailReg.value;
    const userPassword = passwordReg.value;

    const user = userToRegisterFunksjon(userName, userEmail, userPassword);
    registerUser(registerUrl, user);
});


/**
 * This function puts the values into the object
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns {object} name, email, password
 */
function userToRegisterFunksjon(name, email, password) {
    const userToRegister = {
        "name": name,
        "email": email,
        "password": password
    };
    return userToRegister;
}


/**
 * This function sends object to the server or shows that something is wrong
 * 
 * @param {string} url 
 * @param {object} userData 
 */
async function registerUser(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        await response.json();
        window.location.href = "./feed/index.html";
    } catch (error) {
        console.log(error)
    }
}


// This event listener gets the values of email address and password when the user logs in
document.getElementById("submitBtn1").addEventListener("click", (event) => {
    event.preventDefault();

    const mailLogin = formLogin.elements[0];
    const passwordLogin = formLogin.elements[1];

    const userEmail = mailLogin.value;
    const userPassword = passwordLogin.value;

    const user = userToLogInFunksjon(userEmail, userPassword);
    logInUser(logInUrl, user);
});


/** This function gets the values of email and password and put them in the object that is returned
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {object} email and password
 */
function userToLogInFunksjon(email, password) {
    const userToLogIn = {
        "email": email,
        "password": password
    };
    return userToLogIn;
}


/** This function sends the object from the previous function to the server and receives token that is stored in local storage. The user is sent to feed-site.
 * 
 * @param {string} url 
 * @param {object} userData 
 * @returns {token} user's token
 */
async function logInUser(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        const json = await response.json();
        const accessToken = json.accessToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("name", json.name);
        window.location.href = "./feed/index.html";
    } catch (error) {
        console.log(error)
    }
}


