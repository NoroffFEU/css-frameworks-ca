// import { updatePost } from "../api/posts/update.js";
import { getPost, updatePost } from "../api/posts/index.js";

//use this as a teemplate to write other eventlisteners

export async function setUpdatePostFormListener() {
    const form = document.querySelector("#editPost");
    const container = document.querySelector("#editPostContainer");
    //console.log(form);

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        //disable the form with the button before it is uploaded
        const button = form.querySelector("button");
        button.disabled = true;

        //loading the form
        const postEdit = await getPost(id);
        form.title.value = postEdit.title;
        form.body.value = postEdit.body;
        form.tags.value = postEdit.tags;
        form.media.value = postEdit.media;

        //Once we have loaded the form
        button.disabled = false;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form); //provide the form data to this constructor
            const post = Object.fromEntries(formData.entries());

            const tagsInput = form.querySelector("input[name='tags']").value;
            const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
            post.tags = tagsArray;

            post.id = id;
            console.log("This is the updated post", post);

            // Send it to the API
            updatePost(post);

            container.appendChild(form);

            alert("You're post was successfully updated.");
            location.href = `/post/index.html?id=${id}`;
        });
    }
}
