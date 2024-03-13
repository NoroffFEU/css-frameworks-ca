import { getSinglePost } from "../../../api/posts/getSinglePost.js";
import formatDate from "../../feed/functions/formatDate.js";
import formatNumber from "../../feed/functions/formatNumber.js";
import { updDelButtons } from "../../feed/functions/updDelButtons.js";
import { addComment } from "./addComment.js";
import { renderComments } from "./renderComments.js";

export async function renderPost() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        const post = await getSinglePost(postId);

        const date = new Date(post.data.created);

        const profileName = post.data.author.name;

        const totalLikes = post.data._count.reactions;
        const totalComments = post.data._count.comments;

        const comments = post.data.comments;

        const authorLink = document.getElementById('authorLink');
        authorLink.setAttribute('href', `../../profile/?name=${profileName}`);
        authorLink.setAttribute('data-post-name', profileName);

        document.getElementById('postAvatar').src = post.data.author.avatar.url;
        document.getElementById('postAuthor').textContent = post.data.author.name;
        document.getElementById('postDate').textContent = formatDate(date);
        document.getElementById('postTitle').textContent = post.data.title;
        document.getElementById('postBody').textContent = post.data.body;
        document.getElementById('postLikes').textContent = formatNumber(totalLikes);
        document.getElementById('postComments').textContent = formatNumber(totalComments);

        updDelButtons(profileName, document, postId)
        addComment(postId);
        renderComments(comments, postId);

    } catch (error) {
        console.error('could not load this post right now' + error.message);
    }
}