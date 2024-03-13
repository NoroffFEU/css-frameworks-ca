import { delComment } from "../../../api/posts/comments/delComment.js";
import { load } from "../../../api/storage/load.js";
import formatDate from "../../feed/functions/formatDate.js";

export async function renderComments(comments, postId) {
    try {
        const commentContainer = document.getElementById('commentContainer');
        const commentTemplate = document.getElementById('commentTemplate');

        const ownProfile = load('profile');

        comments.forEach(comment => {
            const newComment = commentTemplate.cloneNode(true);
            newComment.classList.remove('d-none');

            const date = new Date(comment.created);
            const commentId = comment.id;

            newComment.querySelector('.comment-avatar').src = comment.author.avatar.url;
            newComment.querySelector('.comment-author').textContent = comment.author.name;
            newComment.querySelector('.comment-date').textContent = formatDate(date);
            newComment.querySelector('.comment-body').textContent = comment.body;

            commentContainer.appendChild(newComment);

            if (ownProfile.name === comment.author.name) {
                newComment.querySelector('.delete-comment-button').classList.remove('d-none');

                newComment.querySelector('.delete-comment-button').addEventListener('click', async (e) => {
                    await delComment(postId, commentId);

                    window.location.reload();
                })
            }
            
            console.log(comment);
        })

        
    } catch (error) {

    }
}