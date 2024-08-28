/**
 * This script is for the profile page tabs functionality.
 * It is responsible for showing  and hiding the tab content based on the tab clicked.
 * It also handles the initial/default tab and the tab based on the hash in the URL.
 * It also renders the images in the profile page.
 **/

import { bragPosts } from "../data.js";

// This code is for rendering the images in the profile page
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("image-container");
  const template = document.getElementById("image-template").innerHTML;

  bragPosts.splice(0, 7).forEach(({ image }) => {
    let html = template.replace("IMAGE_SRC", image);
    container.innerHTML += html;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-link");
  const tabPanes = document.querySelectorAll(".tab-pane");

  // This function is for removing active class from all tabs and hide all tab content
  function resetTabs() {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
      tab.style.backgroundImage = "none";
      tab.style.color = "";
    });
    tabPanes.forEach((pane) => (pane.style.display = "none"));
  }

  // This function is for activating the tab and showing the tab content
  function activateTab(tab) {
    const targetPane = document.querySelector(
      `#${tab.getAttribute("data-tab")}`
    );
    tab.classList.add("active");
    tab.style.backgroundImage = "linear-gradient(to right, #e6a4fd, #fff59f)";
    tab.style.color = "#000";
    targetPane.style.display = "block";
  }

  // This is for adding click event to the tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      resetTabs();
      activateTab(tab);
    });
  });

  // For the initial load, activate the default tab
  const defaultTab = document.querySelector('.tab-link[href="#tab1"]');
  if (!location.hash) {
    activateTab(defaultTab);
  } else {
    // This is for activating the tab based on the hash
    const activeTab = document.querySelector(
      `.tab-link[href="${location.hash}"]`
    );
    if (activeTab) {
      activateTab(activeTab);
    }
  }
});
