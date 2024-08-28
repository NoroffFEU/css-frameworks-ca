/**
 * This file contains the code for the feed page.
 * It is responsible for rendering the feed page.
 * It uses the data.js file to get the data to render.
 * It uses the image-template to render the images.
 * It uses the feed.css file to style the feed page.
 **/

import { bragPosts } from "../data.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript is running");

  const friendsContainer = document.getElementById("friends-brags-container");
  const recentContainer = document.getElementById("recent-brags-container");
  const topContainer = document.getElementById("top-brags-container");
  const template = document.getElementById("image-template").innerHTML;

  // Function to render posts in a given container
  function renderPosts(posts, container) {
    console.log(`Rendering ${posts.length} posts in container`, container);
    container.innerHTML = ""; // Clear the container before adding new content
    posts.forEach(({ image, braggerName, time }) => {
      let html = template
        .replace("IMAGE_SRC", image)
        .replace("BRAGGER_NAME", braggerName)
        .replace("TIME_AGO", time);
      container.innerHTML += html;
    });
  }

  // Render posts based on the selected tab
  function renderTabContent(tab) {
    console.log(`Rendering content for the ${tab} tab`);
    switch (tab) {
      case "friends":
        renderPosts(bragPosts, friendsContainer);
        break;
      case "recent":
        const recentPosts = bragPosts.slice(6, 10);
        renderPosts(recentPosts, recentContainer);
        break;
      case "top":
        const topPosts = bragPosts.slice(3, 13);
        renderPosts(topPosts, topContainer);
        break;
      default:
        console.warn("Unknown tab selected");
        break;
    }
  }

  // Initially render the "Friends' Brags" tab content as the default tab
  renderTabContent("friends");

  // Add event listeners to tabs to switch content
  const tabs = document.querySelectorAll('[data-bs-toggle="tab"]');
  tabs.forEach((tab) => {
    tab.addEventListener("shown.bs.tab", function (event) {
      const targetId = event.target.getAttribute("data-bs-target").substring(1);
      renderTabContent(targetId);
    });
  });
});
