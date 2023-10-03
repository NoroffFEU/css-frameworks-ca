/*const API_BASE_URL = 'https://api.noroff.dev/api/v1';

// End-points:
// Register: /social/auth/register
// Login: /social/auth/login
//Get All posts: /social/posts

//---------------- Registers user

/**
 * API call that registers the user
 * @param {string} url 
 * @param {any} userData
 * ```js
 * registerUser(registerUrl, userToRegister);
 */
/*async function registerUser(url, userData) {
  try{
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch(error) {
    console.log(error);
  }
}

const userToRegister = {
  name: 'test_user_2',
  email: 'test_user_2@noroff.no',
  password: 'silver987',
};

const registerUrl = `${API_BASE_URL}/social/auth/register`;


//registerUser(registerUrl, userToRegister);

// ----------- Login user

async function loginUser(url, userData) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    const accessToken = json.accessToken;
    localStorage.setItem('accessToken', accessToken);
  } catch(error) {
    console.log(error);
  }
}

const userToLogin = {
  email: 'test_user_2@noroff.no',
  password: 'silver987',
};

const loginUrl = `${API_BASE_URL}/social/auth/login`;

// loginUser(loginUrl, userToLogin);

// ----------------- Request with token

async function getWithToken(url) {
  try {
    console.log(url);
    const token = localStorage.getItem('accessToken');
    console.log(token);
    const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await fetch(url, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch(error) {
    console.log(error)
  }
};
const postsUrl = `${API_BASE_URL}/social/posts`;

getWithToken(postsUrl);*/