import ImagePlaceholder from "./ImagePlaceholder.js";

const userComponent = (selector, user)=>{
    const parentNode = document.querySelector(selector)
    parentNode.querySelector("#username").textContent = user.name
    parentNode.querySelector("#spinner").remove()
    if(user.avatar === null){
        parentNode.querySelector(".image-container").append(ImagePlaceholder("icon-large"))
        parentNode.querySelector("#user-profile-image").remove()
    } else {
        parentNode.querySelector("#user-profile-image").src = user.avatar;
    }
    parentNode.querySelector("#post-count").textContent = user.posts.length;
    parentNode.querySelector("#follower-count").textContent = user.followers.length;
    parentNode.querySelector("#following-count").textContent = user.following.length;

}

export default userComponent;