const API_Profiles_URL = "https://api.noroff.dev/api/v1/social/profiles";
// const userName = localStorage.getItem("userName");

async function gatherUserPosts(url) {
  try {
    console.log(url);
    const token = localStorage.getItem("accessToken");
    const fetchUserPosts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchUserPosts);
    // console.log(response);
    const json = await response.json();

    //Adding posts.
    const profilePosts = document.querySelector(".profilePosts");

    profilePosts.innerHTML = "";

    json.forEach((post) => {
      const titleElement = document.createElement("div");
      titleElement.classList.add("text-center", "rounded", "p-3");
      titleElement.textContent = post.title;
      profilePosts.appendChild(titleElement);
    });

    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

const userPosts = `${API_Profiles_URL}/${userName}/posts`;

gatherUserPosts(userPosts);
