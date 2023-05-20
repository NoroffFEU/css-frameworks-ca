import { getPost, updatePost } from "../../api/posts/index.js";
import displayMessage from "../../ui/components/displayMessage.js";

export async function setUpdatePostFormListener() {
    const form = document.querySelector("#editPostForm");
    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        const post = await getPost(id);
        form.body.value = post.body;
        form.title.value = post.title;
        form.tags.value = post.tags;
        form.media.value = post.media;


        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries())
            post.tags = post.tags.split(",");
            post.id = id;

            try {
               await updatePost(post)
               displayMessage("success", 'You post was updated!', "#message");
            } catch (error) {
                displayMessage("danger", error, "#message");
            }

        })
    }
};
