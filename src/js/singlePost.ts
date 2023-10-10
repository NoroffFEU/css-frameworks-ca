import callApi from "./callApi.js";
import endpointObject from "./endpoints.js";
import optionFactory from "./optionFactory.js";
import renderPosts from "./renderPost.js";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const endpoint = endpointObject("Jarle");
const getId = optionFactory("GET", {}, endpoint);

(async () => {
  const data = await callApi(endpoint.getId(id), getId);
  console.log("data:", data);
  renderPosts(document.querySelector("#postContainer"), data);
})();
