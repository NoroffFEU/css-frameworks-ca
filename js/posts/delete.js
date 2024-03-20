
import { doFetch } from '../shared/fetch.js';
import { POSTS_URL } from '../shared/constans.js';


export async function deletePost(postId) {
    // Viser en bekreftelsesdialog før sletting
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (!isConfirmed) {
        return; // Avbryter sletting hvis brukeren ikke bekrefter
    }

    try {
        const response = await doFetch(`${POSTS_URL}/${postId}`, true, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Post deleted successfully');

            // Fjerner posten fra DOM eller oppdaterer listen av poster
            removePostFromDOM(postId);

            // Alternativt kan du re-rendre postene eller omdirigere brukeren
            // renderPosts();
            // eller
            // window.location.href = '/sti/til/oppdatert/side';
        } else {
            console.error('Failed to delete post:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

// Funksjon for å fjerne posten fra DOM
function removePostFromDOM(postId) {
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    if (postElement) {
        postElement.remove();
    }
}

