// import { createPost } from "../api/posts/create.js";
import { createPost } from "../api/posts/index.js";

export function setCreatePostFormListener() {
    const form = document.querySelector("#createPost");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());

            const tagsInput = form.querySelector("input[name='tags']").value;
            const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
            post.tags = tagsArray;

            console.log("This is a post created", post);

            try {
                const createdPost = await createPost(post);
                const createdPostId = createdPost.id;
                alert("Your post was successfully created.");
                location.href = `/post/index.html?id=${createdPostId}`;
            } catch (error) {
                console.error("Error creating post:", error);
                alert("An error occurred while creating the post.");
            }
        });
    }
}

//use this as a teemplate to write other eventlisteners

// export function setCreatePostFormListener() {
//     const form = document.querySelector("#createPost");
//     // console.log(form);

//     if (form) {
//         form.addEventListener("submit", (event) => {
//             event.preventDefault();
//             const form = event.target;
//             // const tags = form.tags;
//             // console.log(tags);
//             const formData = new FormData(form); //provide the form data to this constructor
//             const post = Object.fromEntries(formData.entries());

//             const tagsInput = form.querySelector("input[name='tags']").value;
//             const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
//             post.tags = tagsArray;

//             console.log("This is a post created", post);

//             // const tags = post.tags;
//             // console.log(tags);
//             createPost(post);

//             alert("You're post was successfully created.");
//             location.href = `/post/index.html?id=${id}`;
//         });
//     }
// }
