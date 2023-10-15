const givenToken = localStorage.getItem("accessToken");

const getPostsOption = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${givenToken}`,
  },
};

async function getPosts(url) {
  getPostsOption;
  const response = await fetch(url, getPostsOption);
  const posts = await response.json();
  if (response.ok) {
    return posts;
  } else {
    throw new Error("Could not get posts!");
  }
}

async function createPost(url, data) {
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${givenToken}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, postData);
  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    throw new Error("Could not create a new post!");
  }
}

async function deletePost(url) {
  const postData = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${givenToken}`,
    },
  };
  const response = await fetch(url, postData);
  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    throw new Error("Could not delete a post!");
  }
}

async function updatePost(url, data) {
  const postData = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${givenToken}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, postData);
  const json = await response.json();
  if (response.ok) {
    return json;
  } else {
    throw new Error("Could not update a post!");
  }
}
export { givenToken, getPostsOption, getPosts, createPost, deletePost, updatePost };
