// import { deletePost } from "../api/posts/index.js";

const deletePostButton = document.querySelectorAll(".delete-post");

  // Clicking the Delete button in the cogwheel, targets the closest post and grabs the ID
  // and feeds it into the deletePost function.

  deletePostButton.forEach((e) => {
    e.addEventListener("click", (i) => {
      // Get the post ID from the post however you have that added, and pass it into your delete function
      deletePost(postId);
    });
  });


// function setDeletePostListener() {
//     const deleteBtn = document.getElementsByClassName("btn-delete");
//     deleteBtn.setAttribute("data-id", id);
//     deleteBtn.addEventListener("click", deletePost);
// }
// setDeletePostListener();


// function setDeletePostListener() {
   
//     const deleteBtns = document.getElementsByClassName("btn-delete");
    
//     for(var i = 0; i < deleteBtns.length; i++) {
//         (function(index) {
//             deleteBtns[index].addEventListener("click", function() {
//              console.log("Clicked index: " + index);
//            })
//         })(i);
//         console.log("foi");
//       }
// }
// setDeletePostListener()
// // alerta();
// handlerAlerta()