import { getSinglePost } from "../../api/posts/getSinglePost.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { updatePost } from "../../api/posts/updatePost.js";
import { getParamFromUrl } from "../../utils/helpers/getParams.js";

/**
 * Handles the editing of a post.
 *
 * It retrieves the post ID from the URL, fetches the post with that ID, and populates the edit form with the post's data.
 * If the fetch fails, the post ID is not found in the URL, or the form is not found, it displays an error message to the user.
 */

export async function editPostHandler() {
  const id = getParamFromUrl("id");

  if (!id) {
    throw new Error("Sorry, we couldn't find the post you're looking for.");
  }

  try {
    const post = await getSinglePost(id);
    console.log(post);
    const form = document.querySelector("#editPostForm");
    form.id.value = post.id;
    document.getElementById("formTitle").value = post.title;
    document.getElementById("formMediaUrl").value = post.media;
    document.getElementById("newPost").value = post.body;
    form.addEventListener("submit", editPost);
  } catch {
    console.log(Error);
    messageForUser("#messageForUser", "danger", "sorry, we couldn't load editing form.");
  }
}

document.addEventListener("DOMContentLoaded", editPostHandler);

//should i move this function out??????
async function editPost(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  let post = {};
  formData.forEach((value, key) => {
    post[key] = value;
  });

  const id = getParamFromUrl("id");
  if (!id) {
    throw new Error("Sorry, we couldn't find the post you're looking for.");
  }

  console.log(post);
  try {
    await updatePost(post);
    document.querySelector("form#editPostForm").style.display = "none";
    document.querySelector("h1").innerHTML = "";
    messageForUser("#messageForUser", "success", "Post updated successfully.");

    setTimeout(() => {
      window.location.href = "/profile/";
    }, 3000);
  } catch (error) {
    console.log(error);
    messageForUser("#messageForUser", "danger", "Sorry, we couldn't update the post.");
  }
}
