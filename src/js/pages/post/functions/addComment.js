import { createComment } from "../../../api/posts/comments/createComment.js";

export async function addComment(postId) {
    document.getElementById("createCommentForm").addEventListener("submit", async function(event) {
        event.preventDefault();
    
        const commentBody = document.getElementById("commentBody").value;
    
        try {
            const response = await createComment(postId, commentBody);
    
            console.log("Posted comment!", response);
            alert('Comment was posted!');

            window.location.reload();
        } catch (error) {
            console.error('There was a problem posting the comment!', error.message);
            alert('Failed to post the comment, please try again later or contact support!')
        }
    });
}