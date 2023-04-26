(function () {
  "use strict";
  var form = document.querySelector(".needs-validation");
  var submitBtn = document.querySelector("#submit-btn");

  // Disable default HTML5 form validation
  form.setAttribute("novalidate", "");

  // Validate form on submit
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    },
    false
  );

  // Validate form on input change
  form.addEventListener(
    "input",
    function (event) {
      if (event.target.tagName === "INPUT") {
        if (event.target.checkValidity()) {
          event.target.classList.add("is-valid");
          event.target.classList.remove("is-invalid");
        } else {
          event.target.classList.remove("is-valid");
          event.target.classList.add("is-invalid");
        }
      }
    },
    false
  );

  // Disable submit button until form is valid
  submitBtn.disabled = true;
  form.addEventListener(
    "input",
    function () {
      if (form.checkValidity()) {
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    },
    false
  );
})();
