import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

export function showMessage(message, type) {
  // Create a modal element
  const modalElement = document.createElement("div");
  modalElement.classList.add("modal", "fade");

  // Set modal content
  modalElement.innerHTML = `
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content bg-${type}">
        <div class="modal-body text-white">${message}</div>
    </div>
</div>
    `;

  // Append modal to the body
  document.body.appendChild(modalElement);

  // Activate modal
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // Close modal after 5 seconds
  setTimeout(() => {
    modal.hide();
    modalElement.remove();
  }, 5000);
}
