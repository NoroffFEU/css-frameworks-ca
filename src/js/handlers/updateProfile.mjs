// import { updateProfile } from "../api/profiles/index.mjs";
// import { getProfile } from "../api/profiles/index.mjs";
// import { load } from "../storage/index.mjs";

// export async function setUpdateProfileListener() {
//     const form = document.querySelector("#editProfile");

//     if (form) {
//         const { name, email } = load("profile");
//         form.name.value = name;
//         form.email.value = email;

//         form.addEventListener("submit", async (event) => {
//             event.preventDefault();
//             const formData = new FormData(form);
//             const profile = Object.fromEntries(formData.entries());

//             profile.name = name;
//             profile.email = email;

//             try {
//                 await updateProfile(profile);
//                 console.log('Profile updated successfully');
//             } catch (error) {
//                 console.error('Error updating profile:', error);
//             }
//         });
//     }
// }