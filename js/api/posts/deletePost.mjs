import { API_SOCIAL_URL } from "../api_constants.mjs";

const action = "/posts";

/**
 * Listens for click events on the document. If the clicked element has the class btn-danger,
 * it prompts the user to confirm the deletion of a post. If confirmed, it disables the button,
 * shows a success message, and attempts to delete the post.
 * @param {Event} event - The click event object.
 */
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
                bodyMessage = document.querySelector("main");
                bodyMessage.innerHTML = `
                <div class="alert alert-danger text-center w-50 mx-auto fs-4" role="alert">
                    ${error}<br><a class="text-dark text-center mx-auto fs-4" href="/profile/">`;

            }
        }
    }
});

/**
 * Removes a post from the social media platform.
 * @param {String} id The ID of the post to be deleted.
 * @returns {Object} A Promise that resolves with the response data from the server.
 */
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
        console.error("Error:", error);
        const errorMessageContainer = document.createElement("div");
        errorMessageContainer.classList.add("alert", "alert-danger", "text-center", "w-50", "mx-auto", "fs-4");
        errorMessageContainer.setAttribute("role", "alert");
        errorMessageContainer.innerHTML = `${error}<br><a class="text-dark text-center mx-auto fs-4" href="/profile/">Go to Profile</a>`;
    
        const mainElement = document.querySelector("main");
        mainElement.appendChild(errorMessageContainer);
    }
}
