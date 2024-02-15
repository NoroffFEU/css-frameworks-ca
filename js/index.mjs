import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";



const path = location.pathname;

if (path === "/profile/login/index.html"){
    setLoginFormListener();
}else if (pash =='/profile/register/'){
    setRegisterFormListener();
}
