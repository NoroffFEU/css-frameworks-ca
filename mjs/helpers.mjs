// new post

// const formPost = document.getElementById("formPost");

// document.getElementById("postBtn").addEventListener("click", (event) => {
//     event.preventDefault();

//     const titlePost = formPost.elements[0];
//     const messagePost = formPost.elements[1];
//     const mediaPost = formPost.elements[2];

//     const userTitlePost = titlePost.value;
//     const userMessagePost = messagePost.value;
//     const userMediaPost = mediaPost.value;

//     const newPost = newPostValuesToObject(userTitlePost, userMessagePost, userMediaPost);
//     newPostToApiFunksjon(postsUrl, newPost);
// });

function newPostValuesToObject(title, message, media) {
    const postToApi = {
        "title": title,
        "body": message,
        "media": media
    };
    return postToApi;
}

async function newPostToApiFunksjon(url, post) {
    try {
        const token = localStorage.getItem("accessToken");
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(post),
        };
        const response = await fetch(url, postData);
        const json = await response.json();
    } catch (error) {
        console.log(error)
    }
}










function isMediaValid(media) {
    if (media === null || media === "") {
        return false;
    }

    return (media.includes(".jpg") || media.includes(".jpeg") || media.includes(".png"));
}

function processCommentsForPost(comments) {
    let commentsHtml = "";
    if (comments.length === 0) {
        commentsHtml = `
        <div>There are no comments</div>
         `;
    }
    for (let i = 0; i < comments.length; i++) {
        commentsHtml += `
        <div>${comments[i].body}</div>
        `;
    }
    return commentsHtml;
}

function processReactionsForPost(reactions) {
    let reactionsHtml = "";
    if (reactions.length === 0) {
        reactionsHtml = `
        <div>There are no reactions</div>
         `;
    }
    for (let i = 0; i < reactions.length; i++) {
        reactionsHtml += `
        <div>${reactions[i].symbol}</div>
        `;
    }
    return reactionsHtml;
}

// // show comments

// function showComments() {
//     const commentBtns = document.querySelectorAll('[id^="btnShowComments"]');

//     commentBtns.forEach((btn) => {
//         btn.addEventListener("click", function () {
//             document.getElementById(`showComments${btn.dataset.postid}`).style.display = "block";
//         })
//     })
// }

// // show reactions
// function showReactions() {
//     const reactionsBtns = document.querySelectorAll('[id^="btnShowReactions"]');

//     reactionsBtns.forEach((btn) => {
//         btn.addEventListener("click", function () {
//             document.getElementById(`showReactions${btn.dataset.postid}`).style.display = "block";
//         })
//     })
// }

export { newPostValuesToObject, newPostToApiFunksjon, isMediaValid, processCommentsForPost, processReactionsForPost };