/**
 * Handles the scroll to top button.
 *
 * When the window is scrolled more than 300px from the top, it shows the scroll to top button.
 * When the scroll to top button is clicked, it smoothly scrolls the page to the top.
 */

export function handleScrollButton() {
  const scrollTopButton = document.getElementById("scrollTopButton");

  if (scrollTopButton) {
    window.addEventListener("scroll", function () {
      if (document.documentElement.scrollTop > 300) {
        scrollTopButton.classList.add("show");
      } else {
        scrollTopButton.classList.remove("show");
      }
    });

    scrollTopButton.addEventListener("click", function () {
      document.body.scrollIntoView({ behavior: "smooth" });
    });
  }
}
