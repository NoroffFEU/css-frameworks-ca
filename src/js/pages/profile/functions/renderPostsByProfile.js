import { getPostsByProfile } from "../../../api/profile/postsByProfile.js";
import formatDate from "../../feed/functions/formatDate.js";
import formatNumber from "../../feed/functions/formatNumber.js";

export async function renderPostsByProfile(profileName, profileData) {
    try {
        const posts = await getPostsByProfile(profileName);
        const postContainer = document.getElementById('mainContent');
        const postTemplate = document.getElementById('postTemplate');

        posts.data.forEach(post => {
            const profilePost = postTemplate.cloneNode(true);
            profilePost.classList.remove('d-none');
            profilePost.classList.add('mt-6');

            const createdDate = new Date(post.created);

            const profileName = profileData.data.name;
            const postId = post.id;

            const postLink = profilePost.querySelector('.post-link');
            postLink.setAttribute('href', `../feed/post/?id=${post.id}`);
            postLink.setAttribute('data-post-index', post.id);

            profilePost.querySelector('.post-avatar').src = profileData.data.avatar.url;
            profilePost.querySelector('.post-author').textContent = profileName;
            profilePost.querySelector('.post-date').textContent = formatDate(createdDate);
            profilePost.querySelector('.post-title').textContent = post.title;
            profilePost.querySelector('.post-body').textContent = post.body;
            profilePost.querySelector('.post-likes').textContent = formatNumber(post._count.reactions);
            profilePost.querySelector('.post-comments').textContent = formatNumber(post._count.comments);

            postContainer.appendChild(profilePost);
        })


    } catch (error) {
        console.error('error rendering posts by user', error);
    }

}