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
