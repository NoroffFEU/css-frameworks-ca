// import * as constants from "./api/constants.js";

// // console.log(constants.API_HOST_URL);
// // console.log(constants.API_BASE);
// // console.log(constants.API_SOCIAL_BASE);
// console.log(constants.API_SOCIAL_URL);

// console.log("heipådeg");

import { setRegisterFormListener } from "./handlers/register.js";
import { setLoginFormListener } from "./handlers/login.js";

const path = location.pathname;

if (path === "/") {
    setLoginFormListener();
} else if (path === "/profile/register/") {
    setRegisterFormListener();
}
