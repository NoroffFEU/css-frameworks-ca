import { updatePost } from "../api/posts/index.mjs";


// handles the creation of posts

export function SetUpdatePostFormListener() {
    const form = document.querySelector("#updatePost");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    form.addEventListener("submit", (event) =>{
        event.preventDefault()
        const form = event.target;

        const formData = new FormData(form);
        const post = Object.fromEntries(formData.entries())
        post.id = id;
        
        console.log("works!")
        

        updatePost(post)

    })
};