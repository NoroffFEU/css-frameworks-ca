import { createPost } from "../../../api/posts/createPost.js";

export async function createNewPost() {
    const createPostForm = document.getElementById("createPostForm");

    if (createPostForm) {
        createPostForm.addEventListener("submit", async function(e) {
            e.preventDefault();

            const title = document.getElementById("newPostTitle").value;
            const body = document.getElementById("newPostBody").value;

            try {
                const response = await createPost(title, body);

                console.log('Post Created Successfully!', response);
                alert('successfully created a post!');

                window.location.reload();

            } catch (error) {
                console.error('There was a problem creating the post!', error.message);
                alert('Failed to create the post, please try again later or contact support!')
            }
        });
    } else {
        console.error('Could not find createPostForm element.');
    }
}
