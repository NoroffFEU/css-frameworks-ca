const API_BASE_URL = "https://api.noroff.dev/api/v1/";

//API endpoints
//Login = social/auth/login
//      // action="https://api.noroff.dev/api/v1/social/auth/login"

// Example user
// const userData = {
//   email: "bulba@noroff.no",
//   password: "goldsilver",
// };

async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const userEmail = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;

    const userData = {
      email: userEmail,
      password: userPassword,
    };
    // console.log(userData);
    const loginUrl = `${API_BASE_URL}social/auth/login`;

    loginUser(loginUrl, userData);
  });
