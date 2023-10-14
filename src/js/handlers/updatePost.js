// import { updatePost } from "../api/posts/update.js";
import { updatePost } from "../api/posts/index.js";

//use this as a teemplate to write other eventlisteners

export function setUpdatePostListener() {
    const form = document.querySelector("#updatePost");
    // console.log(form);

    url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form); //provide the form data to this constructor
            const post = Object.fromEntries(formData.entries());
            post.id = id;
            console.log("This is the updated post", post);

            // Send it to the API
            updatePost(post);
        });
    }
}
