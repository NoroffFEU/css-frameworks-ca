const postComponent = (post)=>{
    console.log('post component running');
    const postElement = document.createElement('div');
    postElement.classList.add('post', 'mb-4');

    const postHeader = document.createElement('div');
    postHeader.classList.add('card-header', 'd-flex', 'align-items-center');
    // const postProfileImage = document.createElement('img');
    // postProfileImage.classList.add('rounded-circle');
    // postProfileImage.src = user.image;
    // postProfileImage.alt = 'Profile picture of the user';
    const postUserName = document.createElement('h6');
    postUserName.classList.add('card-title', 'ms-3');
    postUserName.textContent = post.owner;
    postHeader.append(postUserName);

    const postBody = document.createElement('div');
    postBody.classList.add('card-body');
    // if(post?.image){
    //     const postImage = document.createElement('img');
    //     postImage.classList.add('card-img-top');
    //     postImage.src = post.image;
    //     postImage.alt = 'Post Image';
    //     postBody.append(postImage);
    // };
    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    const postTitle = document.createElement('h5');
    postTitle.classList.add('card-title', 'mt-3');
    postTitle.textContent = post.title;
    
    const postText = document.createElement('p');
    postText.classList.add('card-text');
    postText.textContent = post.body;

    postContent.append(postTitle, postText);
    postBody.append(postContent);

    const postFooter = document.createElement('div');
    postFooter.classList.add('card-footer', 'd-flex', 'justify-content-between');

    /*                 <p>
    <a class="text-decoration-none" data-bs-toggle="collapse" href="#comments1" role="button">12 Comments</a>
    </p> */

    const commentContainer = document.createElement('a');
    commentContainer.classList.add('text-decoration-none');
    commentContainer.dataset.bsToggle = 'collapse';
    commentContainer.href = `#${post.id}`
    commentContainer.role = 'button';
    
    const commentIcon = document.createElement('i');
    commentIcon.classList.add('bi', 'bi-chat-right');
    commentContainer.append(commentIcon);

    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('collapse');
    commentsContainer.id = post.id;

    const commentsPlaceholder = document.createElement('div');
    commentsPlaceholder.textContent = 'A list of comments';
    commentsContainer.append(commentsPlaceholder);

    const likesContainer = document.createElement('div');
    likesContainer.classList.add('d-flex')
    const likesIcon = document.createElement('i');
    likesIcon.classList.add('bi', 'bi-hand-thumbs-up');
    likesContainer.append(likesIcon);
    if(post.likes > 0){
        const likesCounter = document.createElement('p');
        likesCounter.classList.add('ms-3')
        likesCounter.textContent = `${post.likes} Likes`
        likesContainer.append(likesCounter);
    }
    postFooter.append(commentContainer, likesContainer)
    postElement.append(postHeader, postBody, postFooter, commentsContainer);
    return postElement;
}

export default postComponent;