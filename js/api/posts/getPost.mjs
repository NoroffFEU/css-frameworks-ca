import { API_SOCIAL_URL } from "../api_constants.mjs";

export const action = "/posts";
export const accessToken = localStorage.getItem("accessToken");

/**
 * Fetches posts from the Noroff social media API and displays them.
 * @returns {Promise} A promise that resolves once posts are fetched and displayed.
 * @throws {Error} If there is an issue fetching or displaying posts.
 */
export async function getPosts() {
    const updatePostUrl = `${API_SOCIAL_URL}${action}?_author=true`;

    try {
        const response = await fetch(updatePostUrl, {
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}` 
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts = await response.json(); 
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        throw error; 
    }
}

/**
 * Displays the fetched posts on the webpage.
 * @param {Array} posts An array of posts to be displayed.
 * @returns {void}
 */
export function displayPosts(posts) {
    const container = document.getElementById("post");
    container.innerHTML = "";

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("card");
        postElement.style.width = "23rem";
        postElement.style.marginTop = "50px";
        postElement.style.marginBottom = "20px";

        let mediaIMG = post.media ? `<img class="card-img-top" src="${post.media}" alt="Post media">` : '<img class="card-img-top" src="https://www.wellingmobilityscooters.co.uk/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default-large.jpg">';
        let avatarIMG = post.avatar ? `<img class="mx-auto d-block rounded-circle border border-custom-col height="60" src="${post.avatar}" alt="avatar profile">` : '<img class="mx-auto d-block rounded-circle" height="30" src="/images/ape-logo.png">';

        const date = new Date(post.created);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const newDate = `${day}.${month}.${year}`;

        postElement.innerHTML = `
            ${mediaIMG}
            <div class="card-body">
                <div class="seperator">
                    <div class="d-flex flex-column">
                        <h4 class="card-title">${post.title}</h4>
                        <p>${newDate}</p>
                        ${avatarIMG}
                    </div>
                    <p class="m-0 d-flex justify-content-center">${post.author.name}</p>
                </div>
            </div>`;
        
        postElement.addEventListener("click", function(event) {
            event.preventDefault();
            const postId = post.id; 
            window.location.href = `/post/index.html?id=${postId}`;
        });

        container.appendChild(postElement);
    });
}

getPosts();




