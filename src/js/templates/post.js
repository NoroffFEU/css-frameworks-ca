// // Example A
// export function postTemplateA(postData) {
//     return `<div class="post" id=${postData.id}>
//     ${postData.title}
//     <button>Log post to console</button>
//     </div>`;
// }

// export function renderPostTemplateA(postData, parent) {
//     parent.innerHTML += postTemplateA(postData);

//     document.querySelector(".post > button").addEventListener("clock");
// }

// Post template for post in FEED postList
export function postTemplateForFeed(postData) {
    const post = document.createElement("div");
    post.className = "card feed-post col-12 mb-3 pb-3";

    const innerDiv = document.createElement("div");
    innerDiv.className = "col-11 mx-auto pt-3";

    const dFlexDiv = document.createElement("div");
    dFlexDiv.className = "d-flex";

    const profileImageDiv = document.createElement("div");
    profileImageDiv.className = "mx-2 mb-2";

    const profileImage = document.createElement("img");
    profileImage.src = "../images/profile-1-harry-cunningham-EPi3TRQc5Z0-unsplash.jpg";
    profileImage.alt = "Profile image";
    profileImage.title = "Profile image";
    profileImage.width = "100%";
    profileImage.className = "card shadow-sm profile-image";

    profileImageDiv.appendChild(profileImage);

    const nameAndTitleDiv = document.createElement("div");
    nameAndTitleDiv.className = "nameAndTitleDiv";

    const nameHeading = document.createElement("h1");
    nameHeading.className = "feed-heading feed-name mb-0 fs-3";
    nameHeading.textContent = "Peter Peterson";

    const titleParagraph = document.createElement("p");
    titleParagraph.className = "feed-heading feed-title fs-2 lh-1";
    titleParagraph.textContent = postData.title;

    nameAndTitleDiv.appendChild(nameHeading);
    nameAndTitleDiv.appendChild(titleParagraph);

    dFlexDiv.appendChild(profileImageDiv);
    dFlexDiv.appendChild(nameAndTitleDiv);

    innerDiv.appendChild(dFlexDiv);

    const cardDiv = document.createElement("div");
    cardDiv.className = "card shadow-sm bg-light";

    if (postData.media) {
        const workoutImage = document.createElement("img");
        workoutImage.src = postData.media; // Use the API-provided image URL
        workoutImage.alt = `Image from post with title: ${postData.title}`;
        workoutImage.title = "Workout post image";
        workoutImage.className = "bd-placeholder-img card-img-top ";
        workoutImage.width = "100%";
        cardDiv.appendChild(workoutImage);
    }
    // else {
    //     // workoutImage.src = "../images/man-running-jenny-hill-mQVWb7kUoOE-unsplash.jpg";
    //     workoutImage.src = "https://picsum.photos/600/400"; // Use the default image URL
    // }

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const cardTextParagraph = document.createElement("p");
    cardTextParagraph.className = "card-text";
    // cardTextParagraph.textContent =
    //     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores doloribus consequuntur tenetur non sapiente culpa assumenda nobis totam in animi dignissimos corrupti.";
    cardTextParagraph.textContent = postData.body;

    //Button view more in posts in feed-----------------------------------------
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "d-flex justify-content-between align-items-center mb-3";
    const viewMoreButton = document.createElement("a");
    viewMoreButton.href = `/post/index.html?id=${postData.id}`;
    viewMoreButton.className = "btn btn-sm btn-secondary";
    viewMoreButton.textContent = "View more";
    //---------------------------------------

    const timeSmall = document.createElement("small");
    timeSmall.className = "text-muted text-end";
    timeSmall.textContent = "9 mins";

    buttonDiv.appendChild(viewMoreButton);
    buttonDiv.appendChild(timeSmall);

    const commentDiv = document.createElement("div");
    commentDiv.className = "d-flex mb-3";

    const userImageDiv = document.createElement("div");
    userImageDiv.appendChild(profileImage.cloneNode(true));

    const commentParagraph = document.createElement("p");
    commentParagraph.className = "comment ms-1 p-2 w-100 mb-0";
    commentParagraph.textContent = "Hi there! Nice work! Would love to hear more about your marathon training! DM me!";

    commentDiv.appendChild(userImageDiv);
    commentDiv.appendChild(commentParagraph);

    const addCommentDiv = document.createElement("div");
    addCommentDiv.className = "add-comment input-group shadow-sm mb-1";

    const commentButton = document.createElement("button");
    commentButton.type = "button";
    commentButton.id = "button-addon1";
    commentButton.className = "btn btn-secondary";
    // commentButton.textContent = "Comment";
    commentButton.innerHTML = `<i class="bi bi-chat-dots-fill fs-6"></i>`;

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.className = "form-control";
    commentInput.placeholder = "Give some positive feedback!";
    commentInput.setAttribute("aria-label", "Example text with button addon");
    commentInput.setAttribute("aria-describedby", "button-addon1");

    addCommentDiv.appendChild(commentButton);
    addCommentDiv.appendChild(commentInput);

    cardBodyDiv.appendChild(cardTextParagraph);
    cardBodyDiv.appendChild(buttonDiv);
    cardBodyDiv.appendChild(commentDiv);
    cardBodyDiv.appendChild(addCommentDiv);

    // cardDiv.appendChild(workoutImage);
    cardDiv.appendChild(cardBodyDiv);

    innerDiv.appendChild(cardDiv);

    post.appendChild(innerDiv);

    return post;
}

// Post template for post details
export function postTemplateDetails(postData) {
    const post = document.createElement("div");
    post.className = "card feed-post col-12 mb-3 pb-3";

    const innerDiv = document.createElement("div");
    innerDiv.className = "col-11 mx-auto pt-3";

    const dFlexDiv = document.createElement("div");
    dFlexDiv.className = "d-flex";

    const profileImageDiv = document.createElement("div");
    profileImageDiv.className = "mx-2 mb-2";

    const profileImage = document.createElement("img");
    profileImage.src = "../images/profile-1-harry-cunningham-EPi3TRQc5Z0-unsplash.jpg";
    profileImage.alt = "Profile image";
    profileImage.title = "Profile image";
    profileImage.width = "100%";
    profileImage.className = "card shadow-sm profile-image";

    profileImageDiv.appendChild(profileImage);

    const nameAndTitleDiv = document.createElement("div");
    nameAndTitleDiv.className = "nameAndTitleDiv";

    const nameHeading = document.createElement("h1");
    nameHeading.className = "feed-heading feed-name mb-0 fs-3";
    nameHeading.textContent = "Peter Peterson";

    const titleParagraph = document.createElement("p");
    titleParagraph.className = "feed-heading feed-title fs-2 lh-1";
    titleParagraph.textContent = postData.title;

    nameAndTitleDiv.appendChild(nameHeading);
    nameAndTitleDiv.appendChild(titleParagraph);

    dFlexDiv.appendChild(profileImageDiv);
    dFlexDiv.appendChild(nameAndTitleDiv);

    innerDiv.appendChild(dFlexDiv);

    const cardDiv = document.createElement("div");
    cardDiv.className = "card shadow-sm bg-light";

    if (postData.media) {
        const workoutImage = document.createElement("img");
        workoutImage.src = postData.media; // Use the API-provided image URL
        workoutImage.alt = `Image from post with title: ${postData.title}`;
        workoutImage.title = "Workout post image";
        workoutImage.className = "bd-placeholder-img card-img-top ";
        workoutImage.width = "100%";
        cardDiv.appendChild(workoutImage);
    }
    // else {
    //     // workoutImage.src = "../images/man-running-jenny-hill-mQVWb7kUoOE-unsplash.jpg";
    //     workoutImage.src = "https://picsum.photos/600/400"; // Use the default image URL
    // }

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const cardTextParagraph = document.createElement("p");
    cardTextParagraph.className = "card-text";
    // cardTextParagraph.textContent =
    //     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores doloribus consequuntur tenetur non sapiente culpa assumenda nobis totam in animi dignissimos corrupti.";
    cardTextParagraph.textContent = postData.body;

    //Buttongroup for the post details page: ----------------------------------
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonDiv d-grid align-items-center mb-3";

    const updateButton = document.createElement("a");
    updateButton.href = `/post/edit/?id=${postData.id}`;
    updateButton.className = "btn btn-sm btn-secondary";
    updateButton.innerHTML = '<i class="bi bi-pencil-square"></i> Update';

    const removeButton = document.createElement("button");
    // removeButton.href = `/post/index.html?id=${postData.id}`;
    // removeButton.href = "#";
    removeButton.className = "btn btn-sm btn-primary ms-2";
    removeButton.id = "removePostButton";
    removeButton.innerHTML = '<i class="bi bi-trash-fill"></i> Remove';

    buttonDiv.appendChild(updateButton);
    buttonDiv.appendChild(removeButton);
    // console.log(removeButton);

    innerDiv.appendChild(buttonDiv);
    //Buttongroup finished---------------------------------------

    const timeSmall = document.createElement("small");
    timeSmall.className = "text-muted text-end";
    timeSmall.textContent = "9 mins";

    // buttonDiv.appendChild(viewMoreButton);
    buttonDiv.appendChild(timeSmall);

    const commentDiv = document.createElement("div");
    commentDiv.className = "d-flex mb-3";

    const userImageDiv = document.createElement("div");
    userImageDiv.appendChild(profileImage.cloneNode(true));

    const commentParagraph = document.createElement("p");
    commentParagraph.className = "comment ms-1 p-2 w-100 mb-0";
    commentParagraph.textContent = "Hi there! Nice work! Would love to hear more about your marathon training! DM me!";

    commentDiv.appendChild(userImageDiv);
    commentDiv.appendChild(commentParagraph);

    const addCommentDiv = document.createElement("div");
    addCommentDiv.className = "add-comment input-group shadow-sm mb-1";

    const commentButton = document.createElement("button");
    commentButton.type = "button";
    commentButton.id = "button-addon1";
    commentButton.className = "btn btn-secondary";
    // commentButton.textContent = "Comment";
    commentButton.innerHTML = `<i class="bi bi-chat-dots-fill fs-6"></i>`;

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.className = "form-control";
    commentInput.placeholder = "Give some positive feedback!";
    commentInput.setAttribute("aria-label", "Example text with button addon");
    commentInput.setAttribute("aria-describedby", "button-addon1");

    addCommentDiv.appendChild(commentButton);
    addCommentDiv.appendChild(commentInput);

    cardBodyDiv.appendChild(cardTextParagraph);
    cardBodyDiv.appendChild(buttonDiv);
    cardBodyDiv.appendChild(commentDiv);
    cardBodyDiv.appendChild(addCommentDiv);

    // cardDiv.appendChild(workoutImage);
    cardDiv.appendChild(cardBodyDiv);

    innerDiv.appendChild(cardDiv);

    post.appendChild(innerDiv);

    return post;
}

export function renderPostTemplate(postData, parent) {
    //Put the post template inside the parent
    parent.append(postTemplateDetails(postData));
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplateForFeed));

    //mapped an array of postData items. And for each postData item we provided a html template, and the we are passing that into the parent. So we go back to our test script in the main index.js file.

    //The above is the same as:
    // postDataList.forEach(function(post) {
    //     postTemplate(post)
    // })
}
