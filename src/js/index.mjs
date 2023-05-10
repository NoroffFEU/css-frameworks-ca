import * as constant from "./api/constant.mjs";

console.log(constant.BASE_API_URL);

import { SetRegisterFormListener } from "./handlers/register.mjs";
import { SetLoginFormListener } from "./handlers/login.mjs";

import * as templates from "./templates/index.mjs";


import * as postsAction from "./api/posts/index.mjs";

const path = location.pathname;

if (path === '/profile/login'){
    SetLoginFormListener()
} else if (path === '/profile/register'){
    SetRegisterFormListener()
}


async function testTemplates() {
    const posts = await postsAction.readPosts();
    const container = document.querySelector("#post");
    templates.renderPostTemplates(posts, container);
}

testTemplates()