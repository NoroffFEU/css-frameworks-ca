import { load } from "./api/storage/load.js";

document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const profileLink = document.getElementById('profileLink');

    if (profileLink) {
        profileLink.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                const profileData = await load("profile");

                if (!profileData.name) {
                    console.error("Profile data is missing 'name' property.");
                    return;
                }

                const profileURL = `../../profile/?name=${encodeURIComponent(profileData.name)}`;
                profileLink.setAttribute('href', profileURL);
                profileLink.setAttribute('data-post-index', profileData.name);
                
                window.location.href = profileURL;
            } catch (error) {
                console.error("Error loading profile data:", error);
            }
        });
    } else {
        console.error("Profile link element not found.");
    }
});