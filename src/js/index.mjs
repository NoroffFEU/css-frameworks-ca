import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";


//Fix the listener conflict 
const path = location.pathname;

if (path === '/profile/register/') {
    setRegisterFormListener ()
} else if (path === '/profile/login/') {
    setLoginFormListener ()
};