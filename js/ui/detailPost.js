
const DEFAULT_PROFILE_IMAGE_URL = 'https://www.m-boe.com/wp-content/uploads/2024/02/17436199_10155874895574186_1503564674971498559_o.jpg';


export function detailPost(post) {
    console.log(post);
    const postContainer = document.createElement('div');

    const postLink = document.createElement('a');
    postLink.href = `../../html/feed/singlepost.html?id=${post.id}`;

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;

    postLink.append(postTitle);

    const postBody = document.createElement('p');
    postBody.textContent = post.body;

    const postImageContainer = document.createElement('div');

    let postImageUrl = post.media ?? DEFAULT_PROFILE_IMAGE_URL;
    const postImage = document.createElement('img');
    postImage.src = postImageUrl;

    postImageContainer.append(postImage);

    postContainer.append(postLink, postBody, postImageContainer);

    return postContainer;
}

