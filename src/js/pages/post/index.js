import { logOut } from "../../components/buttons/logOut.js";
import { renderPost } from "./functions/renderPost.js";

document.addEventListener('DOMContentLoaded', () => {
    renderPost()
    logOut();
});