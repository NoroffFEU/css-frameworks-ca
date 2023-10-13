import commentPost from "./commentPost.js";
import { renderComments } from "./renderPost.js";

export default function commentButton() {
  document.querySelectorAll("[data-comment-id]").forEach((button) =>
    button.addEventListener("click", () => {
      const id = button.dataset.commentId;
      console.log(id);
      const message = document.querySelector(`#commentInput${id}`).value;
      commentPost(message, id);
      renderComments(
        document.querySelector(`#comment-row--${id}`),
        message,
        "",
        {
          name: JSON.parse(localStorage.getItem("currentUser")),
          avatar: JSON.parse(localStorage.getItem("avatar")),
        }
      );
    })
  );
}
