document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var togglePasswordButtons = document.querySelectorAll(".toggle-password");
  togglePasswordButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var iconClasses = this.classList;
      iconClasses.toggle("fa-eye");
      iconClasses.toggle("fa-eye-slash");

      var input = document.querySelector(this.getAttribute("toggle"));
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    });
  });
});
