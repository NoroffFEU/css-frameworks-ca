// import { removePost } from "../api/posts/index.js";

// export async function setRemovePostFormListener() {
//     const removePostLink = document.querySelector("#removePostLink");

//     const url = new URL(location.href);
//     const postId = url.searchParams.get("id");

//     removePostLink.addEventListener("click", async (event) => {
//         event.preventDefault();
//         console.log("click");

//         if (!postId) {
//             alert("Post ID not found.");
//             return;
//         }

//         try {
//             await removePost(postId);
//             // Remove the post from the UI
//             removePostFromUI(postId);
//             // Redirect to the feed page (adjust the URL as needed)
//             window.location.href = "/posts/"; // Change to your feed URL
//         } catch (error) {
//             console.error("Error deleting post:", error);
//             alert("An error occurred while deleting the post.");
//         }
//     });
// }

// // Add a function to remove the post from the UI
// function removePostFromUI(postId) {
//     const postContainer = document.querySelector("#postContainer");
//     const postToRemove = postContainer.querySelector(`#post-${postId}`);

//     if (postToRemove) {
//         postContainer.removeChild(postToRemove);
//     }
// }
