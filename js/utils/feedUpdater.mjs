// // feedUpdater.mjs
// import { getPosts } from "../api/posts/get.mjs";
// import { renderPostTemplates } from "../templates/post.mjs";

// // Function to update the feed with post data
// export async function updateFeedFromAPI() {
//   try {
//     // Fetch posts from the API
//     const posts = await getPosts();

//     // Modify each post to include necessary fields
//     const postsWithDetails = posts.map((post) => {
//       return {
//         id: post.id,
//         title: post.title,
//         body: post.body,
//         tags: post.tags,
//         media: post.media.url,
//         author: post.author.name,
//         avatar: post.author.avatar.url,
//         timestamp: new Date(post.created).toLocaleString(),
//       };
//     });

//     // Select the container where posts will be displayed
//     const container = document.querySelector("#posts");

//     // Clear the existing content
//     container.innerHTML = "";

//     // Render post templates with post data
//     renderPostTemplates(postsWithDetails, container);
//   } catch (error) {
//     console.error("Error updating feed:", error);
//   }
// }
// // Execute profile update logic when DOM content is loaded
// document.addEventListener("DOMContentLoaded", updateFeedFromAPI);
