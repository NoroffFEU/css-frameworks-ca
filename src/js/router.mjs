import * as listeners from "./handlers/index.mjs";
import * as templates from "./templates/index.mjs";
import * as postMethods from "./api/posts/read.mjs";

/**
 * Setting event listener for when the DOM content is loaded.
 **/

document.addEventListener("DOMContentLoaded", async () => {
   const testTemplate = async () => {
       const posts = await postMethods.getPosts();
       const container = document.querySelector("#posts");
       if (container) {
           templates.renderPostTemplates(posts, container);
       } else {
           console.error("Cannot find container for posts!");
       }
   };

   /**
    * Adding click event listener to the posts element to handle post clicks and redirecting to single post.
    */
   const postsElement = document.getElementById('posts');
   if (postsElement) {
       postsElement.addEventListener('click', function(event) {
           const postId = event.target.closest('.post').dataset.id;
           if (postId) {
               window.location.href = `/post/index.html?id=${postId}`;
           }
       });
   } else {
       console.error("Cannot find element with id 'posts'");
   }
   
   await testTemplate();

   const path = location.pathname;
   console.log(path)

   /**
    *  Setting listeners for various forms based on the current path.
    */

   if (path === '/profile/login/index.html') {
      listeners.setLoginFormListener();
   } else if (path === '/profile/register/index.html') {
      listeners.setRegisterFormListener();
   } else if (path === '/posts/index.html') {
      listeners.setCreatePostFormListener();
   } else if (path === '/post/edit/index.html') {
      console.log('setting listener')
      listeners.setUpdatePostListener();
   } else if (path === '/profile/edit/index.html') {
      console.log('setting listener')
      listeners.setUpdateProfileListener();
   } else if (path === '/post/delete/index.html') {
      console.log('setting listener')
      listeners.setRemovePostListener();
   }
});


