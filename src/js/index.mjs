import * as constant from "./api/constant.mjs";

console.log(constant.BASE_API_URL);


import * as listeners from "./handlers/index.mjs";
import * as templates from "./templates/index.mjs";
import * as postsAction from "./api/posts/index.mjs";

const path = location.pathname;

if (path === '/profile/login'){
    listeners.SetLoginFormListener()
} else if (path === '/profile/register'){
    listeners.SetRegisterFormListener()
} else if (path === '/post/create/') {
    listeners.SetCreatePostFormListener
} else if (path === '/post/edit/') {
    listeners.SetUpdatePostFormListener
} else if (path === '/profile/edit/') {
    listeners.SetUpdateProfileFormListener
}







/*async function testTemplates() {
    const posts = await postsAction.readPosts();
    const container = document.querySelector("#post");
    templates.renderPostTemplates(posts, container);
}

testTemplates()*/