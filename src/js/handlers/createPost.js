import { createPost } from "../api/posts/create.js";

//use this as a teemplate to write other eventlisteners

export function setCreatePostListener() {
    const form = document.querySelector("#createPost");
    // console.log(form);

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form); //provide the form data to this constructor
            const post = Object.fromEntries(formData.entries());
            console.log("TThis is a post created", post);
            createPost(post);
        });
    }
}
