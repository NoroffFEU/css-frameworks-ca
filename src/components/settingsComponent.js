import apiClient from "../scripts/services/noroffAPI.js";
import ImagePlaceholder from "./ImagePlaceholder.js";
/**
 * 
 * @param {string} selector 
 * @param {object} data 
 */
const settingsComponent = (selector, data)=>{
    const imageContainer = document.querySelector(selector);
    const avatarInput = document.querySelector('#avatar-input');
    const inputLabel = document.querySelector('#user-settings-label-avatar');
    const updateAvatar = document.querySelector('#user-settings-save-btn');
    const cancelUpdate = document.querySelector('#user-settings-cancel-btn');
    if(!data.avatar){
        imageContainer.append(ImagePlaceholder())
    } else {
        // const circle = document.createElement('div');
        // circle.classList.add('postCard-image');
        const profileImage = document.createElement("img");
        profileImage.alt = "User profile picture";
        profileImage.src = data.avatar;
        profileImage.classList.add('img-fluid', 'img-thumbnail')
        // circle.append(profileImage);
        imageContainer.append(profileImage);
    }
    inputLabel.textContent = "Change Avatar";
    updateAvatar.addEventListener('click', ()=>{
        const APICLIENT = new apiClient()
        const payload = {avatar: "", banner: null}
        if(avatarInput.value === ""){
            payload.avatar = null;
        } else {
            payload.avatar = avatarInput.value;
        }

        APICLIENT.updateAvatar(data.name, payload)
            .then(res => {
                if(res.statusCode === 400){
                    alert("Invalid image URL, user avatar cannot be updated.")
                } else {
                    window.location.reload()
                }
            })
    })
    cancelUpdate.addEventListener('click', ()=>{
        avatarInput.value = "";
    })
}

export default settingsComponent;