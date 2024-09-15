import { getData } from "./components/getData.mjs";
import { creatreProfileUser } from "./components/getActions.mjs";
import { createPostHistory } from "./components/getActions.mjs";
import { showFollowers } from "./components/getActions.mjs";
import { showFollowing } from "./components/getActions.mjs";
import { putData } from "./components/putData.mjs";
import { submitForm } from "./components/submitForm.mjs";
import { clearForm } from "./components/submitForm.mjs";

const linkToMyProfile = document.querySelector("#link-to-my-profile");
const myUserName = localStorage.getItem("userName");
const profileSummaryDom = document.querySelector(".profile-user");
const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const name = parameter.get("name");
const postHistoryDom = document.querySelector(".posts-history-here");
const followersDom = document.querySelector(".followers");
const followingDom = document.querySelector(".following");

const token = localStorage.getItem("accessToken");
const baseUrl = "https://api.noroff.dev/api/v1";
let endpoint = `/social/profiles/${name}`;
let queries = `?_following=true&_followers=true&_posts=true`;
const fullUrl = `${baseUrl}${endpoint}${queries}`;

linkToMyProfile.href += `?name=${myUserName}`;
if(name === myUserName){
    linkToMyProfile.classList.remove("active");
    linkToMyProfile.classList.add("disabled");
};

getData(fullUrl, token, profileSummaryDom, creatreProfileUser);
getData(fullUrl, token, postHistoryDom, createPostHistory);
getData(fullUrl, token, followersDom, showFollowers);
getData(fullUrl, token, followingDom, showFollowing);



/**
 * Observes a DOM element for changes
 * If a user does not have a set avatar, this observer will replace the 
 * broken image icon with a placeholder icon
 */
const profileSummaryObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        const userAvatar = document.querySelector(".profile-pic");
            if (userAvatar.outerHTML === `<img class=\"profile-pic m-3\" src=\"null\" alt=\"User icon created by Freepik\">` || userAvatar.outerHTML === `<img class=\"profile-pic m-3\" src="" alt=\"User icon created by Freepik\">`) {
                userAvatar.outerHTML = `<img class="profile-pic" src="../images_and_icon/icons/user_icon.png" alt="User icon">`
            }

        const changeAvatarForm = document.querySelector(".set-avatar");
        if (changeAvatarForm) {
            changeAvatarForm.addEventListener("submit", (e) => {
                e.preventDefault()
                endpoint = `/social/profiles/${name}/media`;
                const changeAvatarURl = `${baseUrl}${endpoint}`;
                submitForm(changeAvatarForm, changeAvatarURl, putData);
                clearForm(changeAvatarForm);
                setTimeout(() => {
                    getData(fullUrl, token, profileSummaryDom, creatreProfileUser);
                }, 1000);
            })
        }

        const followBtn = document.querySelector(".follow-btn");
        if (followBtn) {
            followBtn.addEventListener("click", (e) => {
                endpoint = `/social/profiles/${name}/follow`;
                const followUrl = `${baseUrl}${endpoint}`;
                putData(followUrl, "")
                setTimeout(() => {
                    getData(fullUrl, token, profileSummaryDom, creatreProfileUser);
                }, 1000);
            });
        }

        const unfollowBtn = document.querySelector(".unfollow-btn");
        if (unfollowBtn) {
            unfollowBtn.addEventListener("click", (e) => {
                endpoint = `/social/profiles/${name}/unfollow`;
                const followUrl = `${baseUrl}${endpoint}`;
                putData(followUrl, "")
                setTimeout(() => {
                    getData(fullUrl, token, profileSummaryDom, creatreProfileUser);
                }, 1000);
            });
        }
    })  
});

const profilePostsObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(){
        const userAvatars = document.querySelectorAll(".profile-pic-tiny");
        userAvatars.forEach((userAvatar) => {
            if (userAvatar.outerHTML === `<img class="profile-pic-tiny" src="null" alt="User icon">` || userAvatar.outerHTML === `<img class="profile-pic-tiny" src="" alt="User icon">`) {
                userAvatar.outerHTML = `<img class="profile-pic-tiny" src="../images_and_icon/icons/user_icon.png" alt="User icon">`
            }
            })
    })
});

const config = {attributes: true, childList: true, subtree: true};

profileSummaryObserver.observe(profileSummaryDom, config);
profilePostsObserver.observe(followersDom, config);
profilePostsObserver.observe(followingDom, config);
profilePostsObserver.observe(postHistoryDom, config);

