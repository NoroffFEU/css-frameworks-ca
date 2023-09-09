import endpoints from "./endpoints.js";

const queries = new URLSearchParams(window.location.search);
const userId = queries.get("user");
const endpoint = endpoints(userId);
const profileElements = {
  user: document.querySelector("#userName") as HTMLElement,
  email: document.querySelector("#email") as HTMLElement,
  img: document.querySelector("#profile--picture") as HTMLImageElement,
  background: document.querySelector("#profile--header") as HTMLElement,
};

interface profileInfo {
  name: string | null;
  email: string | null;
  banner: string | null;
  avatar: string | null;
}

function updateProfile({
  name = "Thistlebeard the Tipsy",
  email = "@TipsyThistle",
  banner,
  avatar,
}: profileInfo) {
  profileElements.user.textContent = name;
  profileElements.email.textContent = email;
  avatar
    ? (profileElements.img.src = avatar)
    : (profileElements.img.src = "/src/assets/profile.jpeg");
  banner
    ? (profileElements.background.style.backgroundImage = `url(${banner})`)
    : (profileElements.background.style.backgroundImage =
        "/src/assets/background.jpeg");
}

console.log(endpoint);
async function fetchPosts(url: string) {
  console.log(localStorage.getItem("token"));
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${endpoint.getToken()}` },
  });
  const data = await response.json();
  updateProfile(data);
  console.log(data);
}

fetchPosts(endpoint.profileOneUser);
