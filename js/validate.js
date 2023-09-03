var form = document.getElementById("login-form");

form.addEventListener("submit", function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    localStorage.setItem("formValidated", "true");
  }

  form.classList.add("was-validated");
});

var mymodal = document.getElementById("mymodal");

var modal = new bootstrap.Modal(mymodal);

if (localStorage.getItem("formValidated") !== "true") {
  modal.show();
}
