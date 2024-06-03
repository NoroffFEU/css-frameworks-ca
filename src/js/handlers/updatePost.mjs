import { getPost, updatePost } from "../api/posts/index.mjs";

export async function setUpdatePostListener() {
    const form = document.querySelector("#editPost");
    
    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        const button = form.querySelector("button");
        button.disabled = true;
        
        const post = await getPost(id);
        form.title.value = post.title;
        form.body.value = post.body;
        form.tags.value = post.tags;
        form.media.value = post.media;
        button.disabled = false;

        form.addEventListener("submit", async (event) => {
            event.preventDefault()
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries())
            
            post.id = id;
            
            if (post.tags) {
                const arrayTags = post.tags = post.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "");
                post.tags = arrayTags.length > 0 ? arrayTags : [];
            } else {
                post.tags = [];
            }

        try {
            const response = await updatePost(post);
            alert("Your post has been successfully updated");
            window.location.href = "/profile/";
        } catch (error) {
            console.error("Unfortunately, your post was not updated, an error has occurred")
        }
        })
    }
}