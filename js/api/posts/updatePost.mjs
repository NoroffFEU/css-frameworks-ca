import { API_SOCIAL_URL } from "../api_constants.mjs";

    
    const form = document.getElementById("single-page-container");
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); 

        const title = document.getElementById("exampleFormControlInput1").value;
        const body = document.getElementById("validationTextarea").value;
        const imageUrl = document.getElementById("exampleFormControlInput2").value;
        const postId = new URLSearchParams(window.location.search).get("id");

        try {

            const postData = {
                id: postId,
                title: title,
                body: body,
                media: imageUrl
            };

            await updatePost(postData);

            window.location.href = '/profile/';
        } catch (error) {
            const bodyMessage = document.querySelector("main");
            bodyMessage.innerHTML = `
            <div class="alert alert-danger text-center w-50 mx-auto fs-4" role="alert">
                ${error}<br><a class="text-dark text-center mx-auto fs-4" href="/profile/">Return here</a>
            </div>`
        }
    });

const action = "/posts";

export async function updatePost(postData) {
    const id = postData.id; 
    const updatePostUrl = `${API_SOCIAL_URL}${action}/${id}`;
    
    const accessToken = localStorage.getItem("accessToken");

    try {
        const response = await fetch(updatePostUrl, {
            method: 'PUT', 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}` 
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error('Failed to update post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating post:', error.message);
        throw error;
    }
}
