/**
 * Creating a new post by sending data to the API
 *
 * @param {string} postTitle - Title of the post.
 * @param {string} postContent - Content of the post.
 * @param {string} accessToken - JWT token for authentication.
 * @returns {Promise<Object|null>} - A promise containing the created post or null if an error occurs.
 * @throws {Error} - Throws an error if an error occurs in the process.
 */



const ApiUrl = 'https://api.noroff.dev';

async function createNewPost(postTitle, postContent, accessToken) {
  try {
    const postData = {
      title: postTitle,
      body: postContent,
    };

    if (!accessToken) {
      return;
    }

    const response = await fetch(`${ApiUrl}/api/v1/social/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const newPost = await response.json();
      alert(`Apost has been made (ID ${newPost.id})`);
      return newPost;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export { createNewPost };