/**
 * This will fetch posts from our API.
 * @param {string} url represents the URL of the API endpoint that we are fetching data from.
 * @returns {string} The posts from the API is returned.
 * ```js
 * // Use this function to fetch posts from the API.
 * async function fetchWithToken(url) {
   try {
    const token = localStorage.getItem('accessToken');
    const getData = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    const json = await response.json();
     } catch (error) {
    console.log(error);
  }
}
//Returns the posts
 * ```
 */


const ApiUrl = 'https://api.noroff.dev';

export async function fetchWithToken(url) {
  try {
    const token = localStorage.getItem('accessToken');
    const getData = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    const json = await response.json();

    
    /////////////////////////////////////////////html for posts/////////////////////////////////////////

    const postContainer = document.getElementById('postContainer');


    json.forEach((post) => {
      if (post.title && post.body) {
        const postDiv = document.createElement('div');
        postDiv.classList.add("card", "mb-4", "p-3", "position-relative");

        const postTitle = document.createElement('h5');
        postTitle.textContent = `Title: ${post.title}`;
        postTitle.classList.add("card-title", "content-font");

        const postContent = document.createElement('p');
        postContent.textContent = post.body;
        postContent.classList.add("card-text", "content-font");



//////view more - Update and Delete buttons//////////////////

const buttonRow = document.createElement('div');
buttonRow.classList.add('row', 'mt-2');

const viewMoreColumn = document.createElement('div');
viewMoreColumn.classList.add('col-6');

const viewMoreButton = document.createElement('button');
viewMoreButton.textContent = 'View More';
viewMoreButton.classList.add('btn', 'content-font', 'view-more-button', 'custom-viewmore-btn');
viewMoreButton.addEventListener('click', () => {
  showMoreInfo(post);
});

viewMoreColumn.appendChild(viewMoreButton);
buttonRow.appendChild(viewMoreColumn);


const actionsColumn = document.createElement('div');
actionsColumn.classList.add('col-6', 'd-flex', 'align-items-end', 'justify-content-end');

const updateButton = document.createElement('button');
updateButton.textContent = 'Update';
updateButton.classList.add('btn', 'content-font', 'btn-sm', 'me-2', 'custom-update-btn');
updateButton.addEventListener('click', () => {
  showUpdateModal(post);
});

const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.classList.add('btn', 'content-font', 'btn-sm', 'custom-delete-btn');
deleteButton.addEventListener('click', () => {
  deletePost(post.id);
});

actionsColumn.appendChild(updateButton);
actionsColumn.appendChild(deleteButton);
buttonRow.appendChild(actionsColumn);

postDiv.appendChild(postTitle);
postDiv.appendChild(postContent);
postDiv.appendChild(buttonRow);
postContainer.appendChild(postDiv);
  }
    });
  } catch (error) {
    console.log(error);
  }
}



/////////////////////////////////////////////////////////////updating post//////////////////////////////////////////////////////////////////////

/**
 * Updates a post on the server with the specified data.
 *
 * @param {number} postId - The ID of the post to update.
 * @param {string} updatedTitle - The updated title of the post.
 * @param {string} updatedBody - The updated body content of the post.
 * @returns {Promise<void>} A Promise that resolves when the post is successfully updated, or rejects with an error.
 *
 * @throws {Error} If an error occurs during the update process, an error message is thrown.
 */

async function updatePost(postId, updatedTitle, updatedBody) {
  try {
    const updatedPostData = {
      title: updatedTitle,
      body: updatedBody,
    };

    const token = localStorage.getItem('accessToken');
    const updateData = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPostData),
    };

    const response = await fetch(`${ApiUrl}/api/v1/social/posts/${postId}`, updateData);

    if (response.ok) {
      alert('Post updated successfully!');
    } else {
      alert('Error updating post. Please try again later.');
    }
  } catch (error) {
    alert('An error occurred while updating the post. Please try again later.');
  }
}

//////////////////////////////////////////////Delete post//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Deletes a post using a DELETE request to the API.
 *
 * @param {number} postId - The ID of the post to be deleted.
 * @returns {Promise<void>} A Promise that resolves if the deletion is successful, or rejects with an error.
 *
 * @throws {Error} If an error occurs during the deletion process, an error message is thrown.
 */

async function deletePost(postId) {
  try {
    const token = localStorage.getItem('accessToken');
    const deleteData = {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          },
  };
  const response = await fetch(`${ApiUrl}/api/v1/social/posts/${postId}`, deleteData);
      
    if (response.status === 204 || response.status === 200) {
        alert(`The post (ID ${postId}) was successfully deleted.`);
            
    } else {
      alert(`Sorry, you don't have permission to delete this post (ID ${postId}). Only the owner can delete it.`); 
    }
     } catch (error) {
          alert(`Something went wrong, pleas try agin later!`);
        }
      }





////////////////////////////////////////////////////////view more function/////////////////////////////////////////////////////////////////////


/**
 * Displays more information about a post in a modal when the "View More" button is clicked.
 * @param {object} post - The post object containing information to display.
 */
 function showMoreInfo(post) {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  const modal = document.createElement('div');
  modal.classList.add('modal-post');

  const postTitle = document.createElement('h3');
  postTitle.textContent = `Title: ${post.title}`;
  modal.appendChild(postTitle);

  const postId = document.createElement('p');
  postId.textContent = `ID: ${post.id}`;
  modal.appendChild(postId);

  const postBody = document.createElement('p');
  postBody.textContent = `${post.body}`;
  modal.appendChild(postBody);

  const createdAt = document.createElement('p');
  createdAt.textContent = `Created: ${post.created}`;
  modal.appendChild(createdAt);

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

/////////////////////////////////////////////////////view more/modal//////////////////////////////////////////////////////////////////////////7


/**
 * Displays a modal for updating a post.
 * @param {object} post - The post object to update.
 */
function showUpdateModal(post) {

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  const updateModal = document.createElement('div');
  updateModal.classList.add('modal-update');

  const updateTitleLabel = document.createElement('label');
  updateTitleLabel.textContent = 'Update Title:';
  updateModal.appendChild(updateTitleLabel);

  const updateTitleInput = document.createElement('input');
  updateTitleInput.type = 'text';
  updateTitleInput.value = post.title;
  updateModal.appendChild(updateTitleInput);

  const updateBodyLabel = document.createElement('label');
  updateBodyLabel.textContent = 'Update Body:';
  updateModal.appendChild(updateBodyLabel);

  const updateBodyInput = document.createElement('textarea');
  updateBodyInput.value = post.body;
  updateModal.appendChild(updateBodyInput);



  ///////////update button in modal///////////////////////////

  const updateButton = document.createElement('button');
  updateButton.textContent = 'Update Post';
  updateButton.classList.add('btn', 'btn-primary', 'content-font');
  updateButton.addEventListener('click', async () => {
    await updatePost(post.id, updateTitleInput.value, updateBodyInput.value);
    modalContainer.remove();
  });
  updateModal.appendChild(updateButton);

  ///////////button closing modal//////////////

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.classList.add('btn', 'btn-secondary', 'content-font');
  closeButton.addEventListener('click', () => {
    modalContainer.remove();
  });
  updateModal.appendChild(closeButton);

  modalContainer.appendChild(updateModal);
  document.body.appendChild(modalContainer);
}
