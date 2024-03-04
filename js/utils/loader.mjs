/**
 * Shows a loader spinner on the screen.
 */
export function showLoader() {
  const spinner = document.createElement("div");
  spinner.className = "spinner-border text-info";
  spinner.setAttribute("role", "status");

  const srOnly = document.createElement("span");
  srOnly.className = "visually-hidden";
  srOnly.textContent = "Loading...";

  const loaderContainer = document.createElement("div");
  loaderContainer.className =
    "loader-container position-fixed top-50 start-50 translate-middle-x";
  loaderContainer.style.zIndex = "1050"; // Ensure it's above other elements
  loaderContainer.appendChild(spinner);
  loaderContainer.appendChild(srOnly);

  document.body.appendChild(loaderContainer);
}
/**
 * Hides the loader spinner from the screen.
 */
export function hideLoader() {
  const loaderContainer = document.querySelector(".loader-container");
  if (loaderContainer) {
    document.body.removeChild(loaderContainer);
  }
}
