// import { API_SOCIAL_URL } from "../constants.mjs";
// import { authFetch } from "../authFetch.mjs";

import { createComment } from "../api/posts/index.mjs";

function setCreateCommentFormListener() {
    const form = document.getElementById("createCommentForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const comment = Object.fromEntries(formData.entries());

            createPost(comment);
        })
    }
};
setCreateCommentFormListener()


// // Display comments
// // const comments = post.comments;
// // const sortedComments = comments.sort((a, b) => a.id - b.id);
// // const postComments = document.querySelector(".displayComments");

// // postComments.innerHTML = "";
// //   for (let i = 0; i < comments.length; i++) {
// //     const COMMENTER_URL = `${API_SOCIAL_URL}/profiles/${sortedComments[i].owner}?_posts=true&_author=true&_following=true&_followers=true`;
// //     console.log(COMMENTER_URL);
// //     const commenterData = await getWithToken(accessToken, COMMENTER_URL);

// // postComments.innerHTML += `
// //   <div id="${sortedComments[i].id}" class="card d-flex flex-column p-3 mt-3">
// //       <a href="./profile.html?name=${sortedComments[i].owner}">
// //           <div class="d-flex align-items-center">
// //               <div class="profile-img-wrapper">
// //               ${
// //                 commenterData.avatar
// //                   ? `<img src="${commenterData.avatar}" class="rounded-circle" alt="User Image" onerror="this.src='/assets/components/icons/account-icon.png'">`
// //                   : `<img src="/assets/components/icons/account-icon.png" alt="User Image" class="rounded-circle">`
// //               }
// //               </div>
// //               <h3 class="no-style user-hover">${sortedComments[i].owner}</h3>
// //           </div>
// //       </a>
// //       <div class="ms-5">
// //           <p class="post-content">${sortedComments[i].body}</p>
// //       </div>
// //       <div class="d-flex justify-content-between">
// //           <p class="post-content text-bg green-text ms-5">
// //           </p>
// //       </div>
// //   </div>`;
// //}


// //add comment
// //POST
// // /social/posts/<id>/comment
// // This endpoint allows a comment to be made on a post. The optional replyToId property can be used to link this comment to an existing comment.


// // Post a comment
// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// let id = params.get("id");
// const form = document.getElementById("commentForm")
// const COMMENT_URL = `${API_SOCIAL_URL}/posts/${id}/comment`;
// const comment = document.querySelector("#commentInput");
// console.log(COMMENT_URL);
// const method = "post";


// function postComment(e) {

//     const userInput = {
//         body: comment.value,
//         method,
//     };

//     e.preventDefault();
//     if (userInput.body.length > 0) {
//         authFetch(COMMENT_URL, userInput);
//         form.reset();
//     } else {
//         console.log("value empty or isn't coming through");
//     }
// }

// form.addEventListener("submit", postComment);