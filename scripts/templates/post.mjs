import { getUserName } from "../utils/getUserName.mjs";
import { setDeletePostListener } from "../handlers/deletePost.mjs";

//general layout of posts. Displays functional edit/delete buttons if author is equal to logged in profile name
export function postTemplate(postData) {
    const post = document.createElement("div");
    post.classList.add("post", "m-2", "p-4", "bg-secondary", "border", "border-primary", "rounded");

    const loggedInUserName = getUserName();
    if (loggedInUserName && loggedInUserName === postData.author.name) {
        const buttonRow = document.createElement("div");
        buttonRow.classList.add("button-row");

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.classList.add("btn", "btn-primary");
        editButton.addEventListener("click", () => {
            const editFormUrl = `/post/edit/?id=${postData.id}`;
            window.location.href = editFormUrl;
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.setAttribute("data-post-id", postData.id);

        setDeletePostListener(deleteButton);

        buttonRow.appendChild(editButton);
        buttonRow.appendChild(deleteButton);

        post.appendChild(buttonRow);
    }

    const titleLink = document.createElement("a");
    titleLink.href = `/post/?id=${postData.id}`;
    titleLink.classList.add("h4", "text-primary", "title-link");
    titleLink.innerText = postData.title;

    const contentDiv = document.createElement("div");

    post.appendChild(titleLink);
    post.appendChild(contentDiv);

    const body = document.createElement("p");
    body.innerText = postData.body;
    contentDiv.appendChild(body);

    if (postData.media) {
        const imgContainer = document.createElement("div");
        const img = document.createElement("img");
        img.src = postData.media;
        img.alt = `Image from ${postData.title}`;
        img.classList.add("img-fluid", "rounded");
        img.style.width = "300px";
        img.style.height = "200px";
        imgContainer.appendChild(img);
        contentDiv.appendChild(imgContainer);
    }

    if (postData.tags && postData.tags.length > 0) {
        const tagsContainer = document.createElement("div");
        tagsContainer.classList.add("tags-container");

        postData.tags.forEach((tag) => {
            const hashtag = document.createElement("span");
            hashtag.innerText = `#${tag} `;
            hashtag.classList.add("hashtag");
            tagsContainer.appendChild(hashtag);
        });

        contentDiv.appendChild(tagsContainer);
    }

    return post;
}
