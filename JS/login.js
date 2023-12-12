import { fetcher } from './fetcher.js';
import { addToLocalStorage, getFromLocalStorage } from './utils/localstorageUtils.js';
console.log("login.js loaded");

const API_BASE_URL = 'https://api.noroff.dev';
const LOGIN_API_URL = `${API_BASE_URL}/api/v1/social/auth/login`;

//endpoints:
//Register: /api/v1/social/auth/register
//Login: /api/v1/social/auth/login
//Get All Posts: /api/v1/social/posts

const form = document.querySelector('#login-form');
const userEmail = document.querySelector('#loginEmail');
const userPassword = document.querySelector('#loginPassword');

async function loginUser(user) {
console.log('Login user:', user);
const postBody = JSON.stringify(user);
const userLoginData = await fetcher(LOGIN_API_URL, {
  method: 'POST',
  body: postBody,
   headers: {
    'Content-Type': 'application/json',
  },
}, false, );
const token = userLoginData.accessToken;
addToLocalStorage('accessToken', token);


window.location.href = '../feed/index.html';

const userId = userLoginData.name;
addToLocalStorage('userId', userId);
const userName = userLoginData.name;
updateUserName(userName);
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
const userloginDetails = {
   email: userEmail.value,
   password: userPassword.value,
};
  await loginUser(userloginDetails);
});

function updateUserName(userName) {
  const userNameElement = document.querySelector('.user-name');
  userNameElement.innerText = userName;
}


