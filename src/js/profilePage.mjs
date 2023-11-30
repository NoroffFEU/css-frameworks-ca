import { getData } from "./components/getData.mjs";
import {  } from "./components/getActions.mjs";

const linkToMyProfile = document.querySelector("#link-to-my-profile");
const myUserName = localStorage.getItem("userName");


linkToMyProfile.href += `?name=${myUserName}`;