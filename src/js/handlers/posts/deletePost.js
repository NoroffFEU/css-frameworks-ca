import { removePost } from "../../api/posts/index.js";

export function setDeletePostListener() {
  const deleteBtns = document.getElementsByClassName("btn-delete");

  for (var i = 0; i < deleteBtns.length; i++) {        
      (function (index) {
          deleteBtns[index].addEventListener("click", function () {
              const id = deleteBtns[index].getAttribute("data-id");
              removePost(id);
          })
      })(i);
  }
}