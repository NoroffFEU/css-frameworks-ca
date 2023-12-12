/*import { API_BASE_URL } from "../routes.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "get";

/**
 * to get all posts
 * @returns
 */

/*export async function getPosts() {
    const getPostsurl = `${API_BASE_URL}${action}?_author=true`;
    const response = await authFetch(getPostsurl);
    return await response.json();

}

/**
 * to get a single post by id
 * @param {string} id
 * @returns
 */

/*export async function getPost(id) {
    if (!id) {
        throw error("this requires a postID");
    }
    const getPosturl = `${API_BASE_URL}${action}/${id}`;
    const response = await authFetch(getPosturl);

    return await response.json();
}*/

import { API_BASE_URL } from "../routes.mjs";

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

        const postscontainer = document.getElementsByClassName('postscontainer')[0];
        
        json.forEach((post) => {
            if (post.title && post.body) {
                const postcard = document.createElement('div');
                postcard.classList.add("card", "mb-5", "p-3", "position-relative");

                const postTitle = document.createElement('h5');
                postTitle.textContent = `Title: ${post.title}`;
                postTitle.classList.add("card-title", "content-font");

                const postContent = document.createElement('P');
                postContent.textContent = post.body;
                postContent.classList.add("card-text", "content-font");

                //const postimg = document.createElement('img');
                //postimg.imagecontent = post.media;
                //postimg.classList.add("card-img-top img-fluid")
                console.log(post)
       ///////// adding the butons/////////////////////         

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
                updateButton.classList.add('btn', 'content-font', 'btn-sm', 'custom-update-btn');
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

                postcard.appendChild(postTitle);
                postcard.appendChild(buttonrow);
                postscontainer.appendChild(postcard);
            }
        });
    } catch (error) {
        console.log(error);
    }

}

///////////////////update post////////

async function updatePost (postID, updatedTitle, updatedBody) {
    try {
        const updatedPostData = {
            title: updatedTitle,
            body: updatedBody,
        };

        const token = localStorage.getItem('accessToken');
        const updatedData = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedPostData),
        };

        const response = await fetch(`${API_BASE_URL}/posts/${postID}`, updatedData);

        if (response.ok) {
            alert('Post update was successful');
        } else {
            alert ('Unseccessful update, Please try again.');
        }
    } catch (error) {
        alert ('An error occured during post update, please try again later.');
    }
}

/////////delete post////////

async function deletePost(postID) {
    try {
        const token = localStorage.getItem ('accessToken');
        const deleteData = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`${API_BASE_URL}/posts/${postID}`, deleteData);
        
        if (response.status ===204 || response.status ===200) {
            alert (`Post (ID ${postID}) was successfully deleted.`);
        } else {
            alert (`Sorry, you do not have permission to delete this post (ID ${postID}).`);
        }
    } catch (error) {
        alert(`An error occured, please try again later.`);
    }
}


/////////view more///////////

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

    const postBody = document.createElement('P');
    postBody.textContent = `${post.body}`;
    modal.appendChild(postBody);

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

//////update modal////

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

    ////update button in modal

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('d-flex', 'justify-content-between', 'mt-4');

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
