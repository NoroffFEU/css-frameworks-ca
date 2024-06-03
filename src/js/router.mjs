import * as listeners from "./handlers/index.mjs";

export default function router() {
    const path = location.pathname;
    switch (path) {
        case "/profile/register/":
          listeners.registerFormListener();
          break;
        case "/profile/login/":
          listeners.loginFormListener();
          break;
        case "/profile/":
          listeners.renderProfile();
          listeners.setLogOutListener();
          break;
        case "/profile/myProfile/":
          listeners.renderMyProfile();
          listeners.setLogOutListener();
         break;
        case "/profile/edit/":
          listeners.setUpdateProfileListener();
          listeners.setLogOutListener();
          break;
        case "/feed/posts/":
          listeners.renderAllPosts();
          listeners.setLogOutListener();
          listeners.searchPost();
          listeners.filterPosts();
          break;
        case "/feed/post/":
          listeners.renderSinglePostCard();
          break;
        case "/feed/post/create/":
          listeners.setCreatePostListener();
          listeners.setLogOutListener();
          break; 
        case "/feed/post/edit/":
          listeners.setUpdatePostListener();
          listeners.setLogOutListener();
          break;
        // case "/":
        //   alert("Share your thoughts and inspire others")
        //   console.log("Welcome to Moonlight - Share your thoughts and inspire others");
        //   break;
    }
}