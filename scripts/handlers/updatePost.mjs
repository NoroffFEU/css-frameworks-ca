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
        form.tags.value = post.tags || ""; //optional
        form.media.value = post.media || ""; //optional

        //button avaialbe after content has loaded
        button.disabled = false;

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());
            post.id = id;

            //avoid error if tags are empty
            if (!post.tags) {
                post.tags = [];
            } else if (post.tags) {
                post.tags = post.tags.split(",").map(tag => tag.trim());
            }

            await updatePost(post);
        });
    }
}
