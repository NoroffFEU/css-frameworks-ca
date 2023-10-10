import callApi from "./callApi.js";
import endpoint from "./endpoints.js";
import optionFactory from "./optionFactory.js";
const endpoints = endpoint("jarle");
const options = optionFactory("GET", {}, endpoints);
const searchSelect = document.querySelector("#select--search--feed");
const searchInput = document.querySelector("#search--feed");
const searchButton = document.querySelector("#search--button");
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", () => {
    const category = searchSelect.value;
    const query = searchInput.value;
    callApi(endpoints.searchFor(category, query), (data) => {
        console.log(data);
    }, options);
});
