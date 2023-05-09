import * as constant from "./api/constant.mjs";

console.log(constant.BASE_API_URL);

import { SetRegisterFormListener } from "./handlers/register.mjs";
import { SetLoginFormListener } from "./handlers/login.mjs";



const path = location.pathname;

if (path === '/profile/login'){
    SetLoginFormListener()
} else if (path === '/profile/register'){
    SetRegisterFormListener();
}