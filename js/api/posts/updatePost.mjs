import { API_SOCIAL_URL } from "../api_constants.mjs";

const action = "/posts";

const form = document.getElementById("single-page-container");
form.addEventListener("submit", async function (event) {
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
            </div>`;
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    const postId = new URLSearchParams(window.location.search).get("id");

    try {
        const postData = await fetchPostData(postId);

        // Populate the input fields with the retrieved data
        document.getElementById("exampleFormControlInput1").value = postData.title;
        document.getElementById("validationTextarea").value = postData.body;
        document.getElementById("exampleFormControlInput2").value = postData.media;
    } catch (error) {
        console.error('Error fetching post data:', error.message);
    }
});

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
};

async function fetchPostData(postId) {
    const fetchUrl = `${API_SOCIAL_URL}${action}/${postId}`;
    const accessToken = localStorage.getItem("accessToken");

    try {
        const response = await fetch(fetchUrl, {
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        }); 
        
        if (!response.ok) {
            throw new Error('Failed to fetch post data');
        }
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



