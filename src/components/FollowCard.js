import ImagePlaceholder from "./ImagePlaceholder.js";

/**
 * 
 * @param {string} selector HTML element, ie id, class name or HTML element
 * @param {array} data 
 * @returns HTML component
 */

const FollowCard = (selector, data)=>{

    if(data.length === 0){
        return
    }
    const parentNode = document.querySelector(selector);

    data.forEach(item => {
        const card = document.createElement('div')
        card.classList.add('contact-card');
        if(item.avatar === null){

            card.append(ImagePlaceholder('icon-large'))
        } else{
            const profileImage = document.createElement('img');
            profileImage.classList.add('followCard-image');
            profileImage.alt = 'User profile image';
            profileImage.src = item.avatar;
            profileImage.style.height = '100';
            profileImage.style.width = '100'
            card.append(profileImage);
        }
        const contactDetails = document.createElement('div');
        contactDetails.classList.add('contact-details');
        const profileUsername = document.createElement('p');

        profileUsername.classList.add('blockquote-footer', 'text-decoration-none');
        profileUsername.textContent = item.name;
        contactDetails.append(profileUsername);

        // CREATES ICON BASED ON CALLBACK FUNCTION

        card.append(contactDetails);
        card.addEventListener("click", ()=>{
            document.location.href = `user.html?user=${item.name}`
        })
        
        parentNode.append(card);
    })
    

}

export default FollowCard;