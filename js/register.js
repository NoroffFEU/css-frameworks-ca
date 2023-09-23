const API_BASE_URL = "https://api.noroff.dev/api/v1/social/auth/register";

async function registerNewUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

// Example to register a new user
const newUser = {
  name: "new_user_name",
  email: "new_user_email@example.com",
  password: "new_user_password",
};

registerNewUser(`${API_BASE_URL}/api/v1/social/auth/register`, newUser)
  .then((response) => {
    console.log("User registered successfully:", response);
  })
  .catch((error) => {
    console.error("Error registering user:", error);
  });
