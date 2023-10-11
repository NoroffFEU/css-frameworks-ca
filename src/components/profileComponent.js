import ImagePlaceholder from "./ImagePlaceholder.js";

const profileComponent = (selector, userData)=>{
    const {avatar: image, name, _count:{posts,following: followingCount, followers: followersCount}} = userData
    const parentNode = document.querySelector(selector);
    parentNode.querySelector('#spinner').remove();
    parentNode.querySelector("#username").textContent = name
    parentNode.querySelector("#post-count").textContent = posts
    parentNode.querySelector("#follower-count").textContent = followersCount
    parentNode.querySelector("#following-count").textContent = followingCount

    if(image === null){
        parentNode.querySelector(".image-container").append(ImagePlaceholder("icon-large"))
        parentNode.querySelector("#user-profile-image").remove()
    } else {
        parentNode.querySelector("#user-profile-image").src = image;
    }



}

export default profileComponent;