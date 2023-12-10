import { API_BASE_URL } from "../routes.mjs";
import { createNewPost } from "./create.mjs";
import { deletePost } from "./delete.mjs";
import { updatePost } from "./update.mjs";
import { searchAndsort } from "./filterAndSearch.mjs";


/**
 * this function to get posts from the API
 * @param {string} url represents the URL of the API we are fetching the posts from
 * @returns {string} get the post returned from the API 
 */
API_BASE_URL();
createNewPost();
searchAndsort();

export async function fetchwithToken(API_BASE_URL) {
    try {
        const token = localStorage.getItem('accessToken');
        const getData = {
            method: 'GET',
            headers: {
                'Content-Type': 'applicaiton/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(API_BASE_URL, getData);
        const json = await response.json();

        const postscontainer = document.getElementsByClassName('postscontainer');

        json.forEach((post) => {
            if (post.title) {
                const postdiv = document.createElement('div');
                postdiv.classList.add("card", "mb-5", "p-3", "position-relative");

                const postTitle = document.createElement('h5');
                postTitle.textContent = `Title: ${post.title}`;
                postTitle.classList.add("card-title", "content-font");

                ////view more, update and delete buttons////

                const buttonrow = document.createElement ('div');
                buttonrow.classList.add('row', 'mt-2');

                const viewMorecol = document.createElement ('div');
                viewMorecol.classList.add('col-6');

                const viewMoreButton = document.createElement('button');
                viewMoreButton.textContent = 'View More';
                viewMoreButton.classList.add('btn', 'content-font', 'view-more-button', 'custom-viewmore-btn');
                viewMoreButton.addEventListener('click', () => {
                    showMore(post);
                });

                viewMorecol.appendChild(viewMoreButton);
                buttonrow.appendChild(viewMorecol);

                const actioncol = document.createElement('div');
                actioncol.classList.add('col-6', 'd-flex', 'align-items-end', 'justify-content-end');

                const updateButton = document.createElement('div');
                updateButton.textContent = 'Update';
                updateButton.addEventListener('click', () => {
                    showUpdateModal(post);
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('btn', 'content-font', 'btn-sm', 'custom-delete-btn');
                deleteButton.addEventListener('click', () => {
                    deletePost(post.id);
                });

                actioncol.appendChild(updateButton);
                actioncol.appendChild(deleteButton);
                buttonrow.appendChild(actioncol);

                postdiv.appendChild(postTitle);
                postdiv.appendChild(buttonrow);
                postscontainer.appendChild(postdiv);
            }
        });
    } catch (error) {
        console.log(error);
    }

}

//// Viewmore function////

/**
 * this funciton will display more information about a post in a modal when the view more button is clicked
 */

function showMore(post) {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add ('modal-container');

    const modal = document.createElement('div');
    modal.classList.add('modal-post');

    const postTitle = document.createElement('h4');
    postTitle.textContent = `Title: ${post.title}`;
    modal.appendChild(postTitle);
    
    const postID = document.createElement('p');
    postID.textContent = `ID: ${post.id}`;
    modal.appendChild(postID);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('btn', 'btn-secondary', 'content-font');
    closeButton.addEventListener('click', () => {
        modalContainer.remove();
    });
    modal.appendChild(closeButton);

    modalContainer.appendChild(modal);
    document.body.appendChild(modalContainer);
}

/// update modal/////

/**
 * this function displays a modal for updating a post
 */

function showUpdateModal(post) {
    
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const updatemodal = document.createElement('div');
    updatemodal.classList.add('modal-update');

    const updatedTitleLabel = document.createElement('label');
    updatedTitleLabel.textContent = 'Update Title';
    updatedTitleLabel.classList.add('text-white', 'm-5');
    updatedTitleLabel.style.fontWeight ='bold';
    updatemodal.appendChild(updatedTitleLabel);

    const updateTitleInput = document.createElement('input');
    updateTitleInput.type = 'text';
    updateTitleInput.value = 'post.title';
    updatemodal.appendChild(updateTitleInput);

    const linebreak = document.createElement('br');
    updatemodal.appendChild(linebreak);

    const updatedBodyLabel = document.createElement('label');
    updatedBodyLabel.textContent = 'Update Body';
    updatedBodyLabel.classList.add('text-white', 'm-5');
    updatedBodyLabel.style.fontWeight = 'bold';
    updatemodal.appendChild(updatedBodyLabel);

    const updatedBodyInput = document.createElement('textarea');
    updatedBodyInput.value = post.body;
    updatemodal.appendChild(updatedBodyInput);

    ////update button in the modal///

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('d-fle', 'justify-content-between', 'mt-4');

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update Post';
    updateButton.classList.add('btn', 'btn-primary', 'content-font', 'ms-5');
    updateButton.addEventListener('click', async () => {
        await updatePost(post.id, updateTitleInput.value, updatedBodyInput.value);
        modalContainer.remove();
    });
    buttonContainer.appendChild(updateButton);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('btn', 'btn-secondary', 'content-font');
    closeButton.addEventListener('click', () => {
    modalContainer.remove();
    });
    buttonContainer.appendChild(closeButton);

    updatemodal.appendChild(buttonContainer);
    modalContainer.appendChild(updatemodal);
    document.body.appendChild(modalContainer);
}

