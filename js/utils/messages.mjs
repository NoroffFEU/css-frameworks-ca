// messages.mjs

import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

export function showMessage(message, type) {
  let bgColor;
  switch (type) {
    case "success":
      bgColor = "bg-success";
      break;
    case "error":
      bgColor = "bg-danger";
      break;
    case "warning":
      bgColor = "bg-warning";
      break;
    default:
      bgColor = "bg-info";
  }

  // Create a modal element
  const modalElement = document.createElement("div");
  modalElement.classList.add("modal", "fade");

  // Create modal dialog
  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog", "modal-dialog-centered");
  modalDialog.setAttribute("role", "document");

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content", bgColor);

  // Create modal body
  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modalBody.classList.add(bgColor);
  modalBody.textContent = message;

  // Assemble modal
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modalElement.appendChild(modalDialog);

  // Append modal to the body
  document.body.appendChild(modalElement);

  // Activate modal
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // Close modal after 5 seconds
  setTimeout(() => {
    modal.hide();
    modalElement.remove();
  }, 5000000);
}
