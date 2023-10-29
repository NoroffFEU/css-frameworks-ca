export function afterDeleteTemplate() {
    postContainer.innerHTML = "";
    const afterDeleteBox = document.createElement("div");
    afterDeleteBox.innerHTML = `<div class="d-flex mt-5">
                                    <i class="bi bi-check-circle-fill h1 text-success me-2"></i>
                                    <h1>Your post was deleted!</h1>
                                </div>`;
    postContainer.appendChild(afterDeleteBox);

    return;
}

export function afterDeleteTemplateError() {
    postContainer.innerHTML = "";
    const afterDeleteBox = document.createElement("div");
    afterDeleteBox.innerHTML = `<h1>Sorry, post not found</h1>`;
    postContainer.appendChild(afterDeleteBox);

    return;
}
