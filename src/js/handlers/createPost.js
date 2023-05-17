import { createPost } from "../api/posts/index.js";
import { createComment } from "../api/posts/index.js";

export function setCreatePostFormListener() {
    const form = document.getElementById("createPostForm");
// alert("form funciona")
    // COMO COLOCAR A FOTO DO PERFIL
    // const userAvatar = document.querySelector(".user-avatar");
    // userAvatar.innerHTML = `    ${
    //     profile.author.avatar
    //       ? `<img src="${postData.author.avatar}" class="rounded-circle" height="50" onerror="this.src='/images/user-icon-image-placeholder.jpg'" alt="${postData.author.name}">`
    //       : `<img src="/images/user-icon-image-placeholder.jpg" class="rounded-circle" height="50" alt="${postData.author.name}">`
    //   }`

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());

            createPost(post);
        })
    }
};


function setCreateCommentFormListener() {
    const form = document.getElementById("createCommentForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const comment = Object.fromEntries(formData.entries());

            createComment(comment);
        })
    }
};
setCreateCommentFormListener()