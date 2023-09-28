const API_BASE_URL = "https://api.noroff.dev/api/v1/";
const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");

async function createProfile(url) {
  try {
    console.log(url);
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchProfileInfo = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchProfileInfo);
    console.log(response);
    const json = await response.json();

    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

const profileInfo = `${API_BASE_URL}social/profiles/${userName}`;

createProfile(profileInfo);
