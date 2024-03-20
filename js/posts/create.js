
import { doFetch } from '../shared/fetch.js';
import { POSTS_URL } from '../shared/constans.js';

async function createPost(title, body, mediaUrl) {
    const postData = {
        title: title,
        body: body,
        media: mediaUrl
    };

    try {
        const response = await doFetch(POSTS_URL, true, { // Setter isAuth til true for å inkludere autentiseringstoken
            method: 'POST',
            body: JSON.stringify(postData),
        });
        console.log('Post created:', response);
    } catch (error) {
        console.error('Failed uploading post:', error);
    }
}

document.getElementById('createPostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postContent').value;
    const mediaUrl = document.getElementById('postMediaUrl').value; // Eksempel: Hent URL fra et input-felt for bildeopplasting

    createPost(title, body, mediaUrl);
});




