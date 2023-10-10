import callApi from "./callApi.js";
import endpoint from "./endpoints.js";
import optionFactory from "./optionFactory.js";

const endpoints = endpoint("jarle");
const options = optionFactory("GET", {}, endpoints);
const searchSelect = document.querySelector(
  "#select--search--feed"
) as HTMLSelectElement;
const searchInput = document.querySelector("#search--feed") as HTMLInputElement;
const searchButton = document.querySelector(
  "#search--button"
) as HTMLButtonElement;

type searchCategory = "user" | "created" | "title" | "tags";

searchButton?.addEventListener("click", () => {
  const category:searchCategory = searchSelect.value;
  const query: string = searchInput.value;
  callApi(
    endpoints.searchFor(category, query),
    (data) => {
      console.log(data);
    },
    options
  );
});
