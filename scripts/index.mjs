import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";

const path = location.pathname;

if (path === '/authentication/login/') {
    setLoginFormListener()
} else if (path === '/authentication/register/') {
    setRegisterFormListener()
}