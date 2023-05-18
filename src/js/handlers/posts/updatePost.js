import { getPost, updatePost } from "../../api/posts/index.js";

export async function setUpdatePostFormListener() {
    const form = document.querySelector("#editPostForm");
    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        const post = await getPost(id);
        form.body.value = post.body;
        form.title.value = post.title;
        // form.tags.value = post.tags;
        form.media.value = post.media;


        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries())
            post.id = id;

            //Send to the API
            updatePost(post)
            // window.location.href = "/posts/index.html";
            //  Gives user Feedback on errors


        })
    }
};
