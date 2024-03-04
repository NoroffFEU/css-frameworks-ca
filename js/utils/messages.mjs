import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

/**
 * Shows a message modal with the specified message and type.
 * @param {string|Error} message - The message to display.
 * @param {string} type - The type of message (success, error, warning, or info).
 */
export function showMessage(message, type) {
  if (!showMessage.errorMessageDisplayed) {
    showMessage.errorMessageDisplayed = true; // Set flag to true to prevent showing multiple messages

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

    const modalElement = document.createElement("div");
    modalElement.classList.add("modal", "fade");

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog", "modal-dialog-centered");
    modalDialog.setAttribute("role", "document");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", bgColor);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalBody.classList.add(bgColor);
    modalBody.textContent = message;

    // Check if the message is an Error object and extract the error message
    if (message instanceof Error) {
      modalBody.textContent = message.message;
    } else {
      modalBody.textContent = message;
    }

    modalContent.appendChild(modalBody);
    modalDialog.appendChild(modalContent);
    modalElement.appendChild(modalDialog);

    document.body.appendChild(modalElement);

    // Activate modal
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    // Close modal after timeout
    setTimeout(() => {
      modal.hide();
      modalElement.remove();
      showMessage.errorMessageDisplayed = false;
    }, 3000);
  }
}

showMessage.errorMessageDisplayed = false;
