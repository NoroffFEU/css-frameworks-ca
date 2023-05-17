import { removePost } from "../../api/posts/index.js";

export function setDeletePostListener() {
  console.log("alo");
    const postItem = document.getElementsByClassName("post")
console.log(postItem);
    postItem.forEach((post)=> {
      const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-warning");
    deleteBtn.textContent = "Delete";
      post.append(deleteBtn)
    })
    console.log(deleteBtn);
    for(var i = 0; i <= deleteBtn.length; i++) {
      deleteBtn[i].addEventListener("click", function() {
        console.log("Clicked index: " + i);
      }) 
      console.log("no for");
      }
}
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