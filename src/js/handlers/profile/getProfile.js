import { getProfile } from "../../api/profile/index.js";
import { load } from "../../storage/index.js";

export async function displayProfileListener() { const profile = await getProfile();

    document.querySelector(".profile-picture").src = profile.avatar;
    document.querySelector(".profile-name").textContent = profile.name;
    document.querySelector(".followers").innerText = profile._count.followers + ` Followers`;
    document.querySelector(".following").textContent = profile._count.following + ` Following`;

}

