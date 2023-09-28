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

    //Populating the profile
    const profileBox = document.querySelector(".profileBox");

    const profileContainer = document.createElement("div");
    profileContainer.classList.add("bg-dark", "text-center", "rounded", "p-3");
    profileContainer.id = createProfile.id;

    const profileName = document.createElement("h1");
    profileName.classList.add("text-white", "bolder", "display-1");
    profileName.innerText = json.name;
    profileContainer.append(profileName);

    const profileAvatar = document.createElement("img");
    profileAvatar.classList.add("img-fluid", "rounded-circle", "mb-3", "mt-2");

    if (json.avatar && json.avatar.trim() !== "") {
      profileAvatar.src = json.avatar;
    } else {
      profileAvatar.src = "/images/profile.jpg";
    }
    profileContainer.append(profileAvatar);

    const ul = document.createElement("ul");
    ul.classList.add("list-unstyled", "mt-2", "fs-5");

    const li1 = document.createElement("li");
    const a1 = document.createElement("a");
    a1.href = "#";
    a1.classList.add(
      "text-decoration-none",
      "text-white",
      "pe-auto",
      "link-danger"
    );
    a1.innerText = "Contact";
    li1.appendChild(a1);

    const li2 = document.createElement("li");
    const a2 = document.createElement("a");
    a2.href = "#";
    a2.classList.add(
      "mt-5",
      "text-decoration-none",
      "text-white",
      "pe-auto",
      "link-danger"
    );
    a2.innerText = "Edit Profile";
    li2.appendChild(a2);

    ul.appendChild(li1);
    ul.appendChild(li2);

    profileContainer.appendChild(ul);

    const numberOfFollowers = document.createElement("p");
    numberOfFollowers.classList.add("text-white", "bolder", "mt-2", "fs-4");
    numberOfFollowers.innerText = "Followers:   " + json._count.followers;
    numberOfFollowers.id = createProfile.id;
    profileContainer.append(numberOfFollowers);

    const numberOfFollowing = document.createElement("p");
    numberOfFollowing.classList.add("text-white", "bolder", "mt-2", "fs-4");
    numberOfFollowing.innerText = "Following:   " + json._count.following;
    numberOfFollowing.id = createProfile.id;
    profileContainer.append(numberOfFollowing);

    const followButton = document.createElement("button");
    followButton.type = "button";
    followButton.classList.add(
      "btn",
      "btn-outline-danger",
      "text-white",
      "btn-lg"
    );
    followButton.innerText = "Follow";
    profileContainer.appendChild(followButton);

    profileBox.append(profileContainer);

    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

const profileInfo = `${API_BASE_URL}social/profiles/${userName}`;

createProfile(profileInfo);
