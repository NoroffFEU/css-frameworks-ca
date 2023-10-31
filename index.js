// Some JS logic for password confirmation
document.addEventListener("DOMContentLoaded", function () {
     document
          .getElementById("confirmPassword")
          .addEventListener("input", function () {
               if (this.value !== document.getElementById("password").value) {
                    this.setCustomValidity("Passwords do not match");
               } else {
                    this.setCustomValidity("");
               }
          });
});

// JS for accordian front page opening just once
document.addEventListener("DOMContentLoaded", function () {
     const accordionButton = document.querySelector(".accordion-button");

     accordionButton.addEventListener("click", function () {
          setTimeout(function () {
               if (!accordionButton.classList.contains("collapsed")) {
                    accordionButton.removeAttribute("data-bs-toggle");
               }
          }, 0);
     });
});
