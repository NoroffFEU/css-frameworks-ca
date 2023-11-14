import * as postMethods from "../api/posts/index.js";
import * as templates from "../templates/index.js";

export function beAbleToRemovePost(post) {
    const userName = localStorage.getItem("userName");
    const currentUserName = userName ? userName.trim().replace(/^"(.*)"$/, "$1") : null;

    if (currentUserName === post.author.name) {
        const removePostButton = document.querySelector("#removePostButton");
        const updatePostButton = document.querySelector("#updatePostButton");

        if (removePostButton && updatePostButton) {
            removePostButton.style.display = "block";
            updatePostButton.style.display = "block";
            removePostButton.addEventListener("click", async (event) => {
                event.preventDefault();
                try {
                    await postMethods.removePost(post.id);
                    alert("Post has been deleted.");
                    const postContainer = document.querySelector("#postContainer");
                    if (postContainer) {
                        templates.afterDeleteTemplate();
                    }
                } catch (error) {
                    console.error("Error deleting post:", error);
                    alert("An error occurred while deleting the post.");
                }
            });
        }
    } else {
        notMyPost();
    }
}

function notMyPost() {
    const removePostButton = document.querySelector("#removePostButton");
    const updatePostButton = document.querySelector("#updatePostButton");

    if (removePostButton && updatePostButton) {
        removePostButton.style.display = "none";
        updatePostButton.style.display = "none";
    }
}
