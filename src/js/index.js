import * as listeners from "./handlers/index.js";
//Fix the listener conflict 
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
        listeners.postsTemplates();
        break;
        case "/post/":
            listeners.getComments();
            listeners.singlePostTemplate();
            listeners.setCreateCommentFormListener();
}




