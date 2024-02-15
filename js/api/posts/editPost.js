// import { updatePost } from "../../api.js";

// export async function editPost(event) {
//   event.preventDefault();

//   const form = event.target;
//   const formData = new FormData(form);

//   let post = {};
//   formData.forEach((value, key) => {
//     post[key] = value;
//   });

//   const id = getParamFromUrl("id");
//   if (!id) {
//     throw new Error("Sorry, we couldn't find the post you're looking for.");
//   }

//   post.id = id;

//   console.log(post);
//   try {
//     await updatePost(post);
//     document.querySelector("form#editPostForm").style.display = "none";
//     document.querySelector("h1").innerHTML = "";
//     messageForUser("#messageForUser", "success", "Post updated successfully.");

//     setTimeout(() => {
//       window.location.href = "/profile/";
//     }, 3000);
//   } catch (error) {
//     console.log(error);
//     messageForUser("#messageForUser", "danger", "Sorry, we couldn't update the post.");
//   }
// }
