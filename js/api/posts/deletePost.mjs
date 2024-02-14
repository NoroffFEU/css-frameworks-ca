import { API_SOCIAL_URL } from "../api_constants.mjs";

const action = "/posts";

export async function removePost(id) {
    const deletePostUrl = `${API_SOCIAL_URL}${action}/${id}`;
    
    
    const accessToken = localStorage.getItem("accessToken");

    try {
        const response = await fetch(deletePostUrl, {
            method: 'DELETE', 
            headers: {
                "Authorization": `Bearer ${accessToken}`  
            },
        });

        return await response.json(); 
    } catch (error) {
        throw error; 
    }
}

document.addEventListener('click', async function(event) {
    if (event.target.classList.contains('btn-danger')) {
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (confirmed) {
            const postId = event.target.dataset.id; 
            event.target.disabled = true;
            const bodyMessage = document.querySelector("main");
            bodyMessage.innerHTML = 
            `<div class="alert alert-success text-center w-50 mx-auto fs-4" role="alert">
             You've successfully deleted this post😊<br><a class="text-dark text-center mx-auto" href="/profile/">Return here</a>
            </div>`;

            try {
                await removePost(postId);

            } catch (error) {
                console.error('Error deleting post:', error.message);

            }
        }
    }
});
