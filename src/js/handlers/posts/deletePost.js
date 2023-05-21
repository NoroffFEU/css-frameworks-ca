import { removePost } from "../../api/posts/index.js";
import displayMessage from "../../ui/components/displayMessage.js";

export function setDeletePostListener() {
  const deleteBtns = document.getElementsByClassName("btn-delete");

  for (var i = 0; i < deleteBtns.length; i++) {
    (function (index) {
      deleteBtns[index].addEventListener("click", function () {
        const id = deleteBtns[index].getAttribute("data-id");

        try {
          removePost(id);

        } catch (error) {
          displayMessage("danger", error, "#message");
        }
      })
    })(i);
  }
}