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

// Example B
export function postTemplate(postData) {
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
    ///////////
    titleParagraph.textContent = postData.title;

    nameAndTitleDiv.appendChild(nameHeading);
    nameAndTitleDiv.appendChild(titleParagraph);

    dFlexDiv.appendChild(profileImageDiv);
    dFlexDiv.appendChild(nameAndTitleDiv);

    innerDiv.appendChild(dFlexDiv);

    const cardDiv = document.createElement("div");
    cardDiv.className = "card shadow-sm bg-light";

    const workoutImage = document.createElement("img");
    workoutImage.alt = "Workout image feed";
    workoutImage.title = "Workout image";
    workoutImage.className = "bd-placeholder-img card-img-top ";
    workoutImage.width = "100%";

    if (postData.media) {
        workoutImage.src = postData.media; // Use the API-provided image URL
    } else {
        workoutImage.src = "../images/man-running-jenny-hill-mQVWb7kUoOE-unsplash.jpg"; // Use the default image URL
    }

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const cardTextParagraph = document.createElement("p");
    cardTextParagraph.className = "card-text";
    cardTextParagraph.textContent =
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores doloribus consequuntur tenetur non sapiente culpa assumenda nobis totam in animi dignissimos corrupti.";

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "d-flex justify-content-between align-items-center mb-3";

    const viewMoreButton = document.createElement("button");
    viewMoreButton.type = "button";
    viewMoreButton.className = "btn btn-sm btn-secondary";
    viewMoreButton.textContent = "View more";

    const timeSmall = document.createElement("small");
    timeSmall.className = "text-muted";
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
    commentButton.textContent = "Comment";

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

    cardDiv.appendChild(workoutImage);
    cardDiv.appendChild(cardBodyDiv);

    innerDiv.appendChild(cardDiv);

    post.appendChild(innerDiv);

    return post;
}

export function renderPostTemplate(postData, parent) {
    //Put the post template inside the parent
    parent.append(postTemplate(postData));
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplate)); //mapped an array of postData items. And for each postData item we provided a html template, and the we are passing that into the parent. So we go back to our test script in the main index.js file.

    //The above is the same as:
    // postDataList.forEach(function(post) {
    //     postTemplate(post)
    // })
}

//This is what I had
// const post = document.createElement("div");
//     post.classList.add("post", "card", "mb-3", "pb-3", "h-100");
//     post.innerText = postData.title;
//
// const postWrap = document.createElement("div");
// postWrap.classList.add("postWrap", "col-11", "mx-auto", "pt-3");
// post.appendChild(postWrap);
// // //
// const postHeaderBox = document.createElement("div");
// postHeaderBox.classList.add("postHeaderBox", "d-flex");
// postWrap.appendChild(postHeaderBox);
// // //
// const postUserImgBox = document.createElement("div");
// postUserImgBox.classList.add("postUserImgBox");
// postHeaderBox.appendChild(postUserImgBox);

// // //
// const postTitleBox = document.createElement("div");
// postTitleBox.classList.add("postTitleBox", "ms-2");
// postHeaderBox.appendChild(postTitleBox);

// const postUserName = document.createElement("h1");
// postUserName.classList.add("feed-heading", "feed-name", "mb-0", "fs-3");
// postTitleBox.appendChild(postUserName);
// postUserName.innerText += "User Name";

// const postTitle = document.createElement("p");
// postTitle.classList.add("feed-heading", "feed-title", "fs-2", "lh-1");
// postTitleBox.appendChild(postTitle);
// postTitle.innerText += postData.title;
// // //
// const postMainBox = document.createElement("div");
// postMainBox.classList.add("postMainBox", "card", "shadow-sm", "bg-light");
// postWrap.appendChild(postMainBox);

// post.innerText = postData.title;
// const button = document.createElement("button");
// post.append(button);
// button.addEventListener("click", () => console.log(postData));

// return post;
