
const mainApiUrl = "https://api.noroff.dev/api/v1";
const registerUrl = `${mainApiUrl}/social/auth/register`;
const logInUrl = `${mainApiUrl}/social/auth/login`;
const formReg = document.getElementById("formRegister");
const formLogin = document.getElementById("formLogin");
const getPostsUrl = `${mainApiUrl}/social/posts`;



// When the user has typed their name, mail and password, they submit by clicking on the button. This function gets the elements and filter their value, and activates  
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

// This function put the values from the previous function to the object
function userToRegisterFunksjon(name, email, password) {
    const userToRegister = {
        "name": name,
        "email": email,
        "password": password
    };
    return userToRegister;
}

// This function sends object to the server or shows that sth is wrong
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
        const json = await response.json();
        window.location.href = "./feed/index.html";
        // return json;
    } catch (error) {
        console.log(error)
    }
}






// functions to log in


// function to get the data after submitting
document.getElementById("submitBtn1").addEventListener("click", (event) => {
    event.preventDefault();

    const mailLogin = formLogin.elements[0];
    const passwordLogin = formLogin.elements[1];

    const userEmail = mailLogin.value;
    const userPassword = passwordLogin.value;

    const user = userToLogInFunksjon(userEmail, userPassword);
    logInUser(logInUrl, user);
});



function userToLogInFunksjon(email, password) {
    const userToLogIn = {
        "email": email,
        "password": password
    };
    return userToLogIn;
}


// fetching token and storing it in localStorage
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


