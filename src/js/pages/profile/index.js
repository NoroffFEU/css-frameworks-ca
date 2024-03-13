import { logOut } from "../../components/buttons/logOut.js";
import { renderProfile } from "./functions/renderProfile.js";

document.addEventListener('DOMContentLoaded', () => {
    renderProfile();
    logOut();
});