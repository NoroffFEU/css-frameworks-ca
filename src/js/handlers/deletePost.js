// import { removePost } from "../api/posts/index.js";

// export async function setRemovePostFormListener() {
//     const removePostLink = document.querySelector("#removePostLink");
//     console.log("Hei");
//     console.log(removePostLink);

//     if (removePostLink) {
//         removePostLink.addEventListener("click", async (event) => {
//             event.preventDefault();
//             console.log("Remove button clicked");

//             const url = new URL(location.href);
//             const postId = url.searchParams.get("id");
//             console.log(postId);

//             if (!postId) {
//                 alert("Post ID not found.");
//                 return;
//             }

//             try {
//                 await removePost(postId);
//                 // Message to indicate the post has been deleted.
//                 alert("Post has been deleted.");
//                 // Remove the post UI from the page.
//                 const postContainer = document.querySelector("#postContainer");
//                 if (postContainer) {
//                     postContainer.innerHTML = ""; // Clear the post container
//                 }
//                 // Redirect to the feed page
//                 window.location.href = "/posts/";
//             } catch (error) {
//                 console.error("Error deleting post:", error);
//                 alert("An error occurred while deleting the post.");
//             }
//         });
//     }
// }

// export async function setRemovePostFormListener(postId) {
//     const removePostLink = document.querySelector("#removePostLink");

//     if (removePostLink) {
//         removePostLink.addEventListener("click", async (event) => {
//             event.preventDefault();

//             if (!postId) {
//                 alert("Post ID not found.");
//                 return;
//             }

//             try {
//                 await removePost(postId);
//                 alert("Post has been deleted.");
//             } catch (error) {
//                 console.error("Error deleting post:", error);
//                 alert("An error occurred while deleting the post.");
//             }
//         });
//     }
// }
