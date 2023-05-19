import * as listeners from "./handlers/index.js";


const path = location.pathname;

switch (path) {
    case "/":
        console.log("home");
        break;
    case "/profile/login/":
        listeners.setLoginFormListener();
        break;
    case "/profile/register/":
        listeners.setRegisterFormListener();
        break;
    case "/post/edit/":
        listeners.setUpdatePostFormListener();
        break;
    case "/posts/":
        listeners.setCreatePostFormListener();
        listeners.getPosts();
        listeners.filterListener();
        listeners.searchListener();

        break;
    case "/post/":
        listeners.getComments();
        listeners.getPostById();
        listeners.setCreateCommentFormListener();
        break;
    case "/profile/edit/":
        listeners.setUpdateProfileFormListener();
        break;
}

listeners.logoutListener()