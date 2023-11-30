import { getData } from "./components/getData.mjs";
import { creatreProfileUser } from "./components/getActions.mjs";
import { createPostHistory } from "./components/getActions.mjs";
import { showFollowers } from "./components/getActions.mjs";
import { showFollowing } from "./components/getActions.mjs";

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
        console.dir(userAvatar)
            if (userAvatar.outerHTML === `<img class=\"profile-pic m-3\" src=\"null\" alt=\"User icon created by Freepik\">`) {
                userAvatar.outerHTML = `<img class="profile-pic" src="../images_and_icon/icons/user_icon.png" alt="User icon">`
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
