
import { doFetch } from '../shared/fetch.js';
import { POSTS_URL } from '../shared/constans.js';

export async function updatePost(postId, title, body, mediaUrl) {
    const postData = {
        title: title,
        body: body,
        media: mediaUrl
    };

    try {
        // Utfør en PUT-forespørsel for å oppdatere posten med oppdaterte data
        const response = await doFetch(`${POSTS_URL}/${postId}`, true, {
            method: 'PUT',
            body: JSON.stringify(postData),
        });

        // Håndter responsen og logg ut oppdaterte data
        if (response.ok) {
            const data = await response.json();
            console.log('Post updated:', data);

        } else {
            console.error('Failed updating post:', response.statusText);
        }
    } catch (error) {
        console.error('Failed updating post:', error);
    }
}


// Funksjon for å initialisere oppdateringssiden
function updatePostPage() {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id');

    // Lytter for skjemainnsending
    document.getElementById('updatePostForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('postTitle').value;
        const body = document.getElementById('postContent').value;
        const mediaUrl = document.getElementById('postMediaUrl').value;

        updatePost(postId, title, body, mediaUrl);
    });
}
document.addEventListener('DOMContentLoaded', updatePostPage);







