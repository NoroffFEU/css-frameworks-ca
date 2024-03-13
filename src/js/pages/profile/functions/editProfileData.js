import { editProfile } from "../../../api/profile/editProfile.js";

export async function updateProfileData(profileName, editProfileButton) {
    const editProfileContainer = document.getElementById('editContainer');
    const otherContent = document.getElementById('mainContent');

    editProfileButton.addEventListener('click', async (e) => {
        editProfileContainer.classList.remove('d-none');
        otherContent.style.opacity = '0.2';
    });

    const editForm = document.getElementById('profileForm');

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const bio = document.getElementById('bioInput').value;
        const bannerUrl = document.getElementById('bannerInput').value;
        const avatarUrl = document.getElementById('avatarInput').value;

        try {
            await editProfile(profileName, { bio: bio, bannerUrl: bannerUrl, avatarUrl: avatarUrl });

            editProfileContainer.classList.add('d-none');
            otherContent.style.opacity = '1';

        } catch (error) {
            console.error('Could not update Profile', error.message);
        }
    });

    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', (e) => {
        e.preventDefault();

        editProfileContainer.classList.add('d-none');
        otherContent.style.opacity = '1';
    });

}
