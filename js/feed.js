import { bragPosts } from "../data.js";

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("image-container");
  const template = document.getElementById("image-template").innerHTML;

  bragPosts.forEach(({ image, braggerName, time }) => {
    let html = template
      .replace("IMAGE_SRC", image)
      .replace("BRAGGER_NAME", braggerName)
      .replace("TIME_AGO", time);
    container.innerHTML += html;
  });
});
