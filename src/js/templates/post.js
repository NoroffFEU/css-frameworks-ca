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
    post.classList.add("post", "card", "mb-3", "pb-3", "h-100");
    //
    const postWrap = document.createElement("div");
    postWrap.classList.add("postWrap", "col-11", "mx-auto", "pt-3");
    post.appendChild(postWrap);
    // //
    const postHeaderBox = document.createElement("div");
    postHeaderBox.classList.add("postHeaderBox", "d-flex");
    postWrap.appendChild(postHeaderBox);
    // //
    const postUserImgBox = document.createElement("div");
    postUserImgBox.classList.add("postUserImgBox");
    postHeaderBox.appendChild(postUserImgBox);

    // //
    const postTitleBox = document.createElement("div");
    postTitleBox.classList.add("postTitleBox", "ms-2");
    postHeaderBox.appendChild(postTitleBox);

    const postUserName = document.createElement("h1");
    postUserName.classList.add("feed-heading", "feed-name", "mb-0", "fs-3");
    postTitleBox.appendChild(postUserName);
    postUserName.innerText += "User Name";

    const postTitle = document.createElement("p");
    postTitle.classList.add("feed-heading", "feed-title", "fs-2", "lh-1");
    postTitleBox.appendChild(postTitle);
    postTitle.innerText += postData.title;
    // // //
    // const postMainBox = document.createElement("div");
    // postMainBox.classList.add("postMainBox", "card", "shadow-sm", "bg-light");
    // postWrap.appendChild(postMainBox);

    // post.innerText = postData.title;

    // const button = document.createElement("button");
    // post.append(button);
    // button.addEventListener("click", () => console.log(postData));

    return post;
}

export function renderPostTemplate(postData, parent) {
    parent.append(postTemplate(postData));
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplate)); //mapped an array of postData items. And for each postData item we provided a html template, and the we are passing that into the parent. So we go back to our test script in the main index.js file.
}
