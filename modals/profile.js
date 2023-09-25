/*const ApiUrl = 'https://api.noroff.dev';

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

    const postContainer = document.getElementById('postContainer');

  json.forEach((post) => {
    if (post.title && post.body){
      const postDiv = document.createElement('div');
      postDiv.classList.add("card", "mb-4", "p-3");
  
  
    const postTitle = document.createElement('h5');
    postTitle.textContent = post.title;
    postTitle.classList.add("card-title", "content-font");
  
    const postContent = document.createElement('p');
    postContent.textContent = post.body;
    postContent.classList.add("card-text", "content-font");

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger', 'content-font', 'delete-button');
    deleteButton.addEventListener('click', () => {
      deletePost(post.id); 
    });
    
    
  
    postDiv.appendChild(postTitle);
    postDiv.appendChild(postContent);
    postDiv.appendChild(deleteButton);
  
    postContainer.appendChild(postDiv);
  }
});

  } catch (error) {
    console.log(error);
  }
}

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

    if (response.status === 204) {
      const postElement = document.getElementById(`post-${postId}`);
      if (postElement) {
        postElement.remove();
        console.log(`Post med ID ${postId} ble slettet fra DOM.`);
      }
    } else {
      console.log(Error);
    }
  } catch (error) {
    console.log(error);
  }
}*/