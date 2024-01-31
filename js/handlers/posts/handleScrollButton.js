export function handleScrollButton() {
  const scrollTopButton = document.getElementById("scrollTopButton");

  if (scrollTopButton) {
    window.addEventListener("scroll", function () {
      if (document.documentElement.scrollTop > 100) {
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
