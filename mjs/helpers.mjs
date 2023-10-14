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

export { isMediaValid, processCommentsForPost, processReactionsForPost };