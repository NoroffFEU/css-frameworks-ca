import { createPost } from "../api/posts/index.mjs";


// handles the creation of posts

export function SetCreatePostFormListener(){
    const form = document.querySelector("#createPost");

    form.addEventListener("submit", (event) =>{
        event.preventDefault()
        const form = event.target;

        const formData = new FormData(form);
        const post = Object.fromEntries(formData.entries())
        
        console.log("works!")
        

        createPost(post)

    })
};