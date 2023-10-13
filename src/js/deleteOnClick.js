import endpointObject from "./endpoints.js";
import optionFactory from "./optionFactory.js";
import callApi from "./callApi.js";
export default function deletePost() {
    const endpoint = endpointObject(JSON.parse(localStorage.getItem("currentUser")));
    const deleteOption = optionFactory("DELETE", {}, endpoint);
    document.querySelectorAll("[data-delete-id]").forEach((button) => button.addEventListener("click", () => {
        const id = button.dataset.deleteId;
        callApi(endpoint.getId(id), deleteOption);
        document.querySelector(`#div${id}`).style.display = "none";
    }));
}
