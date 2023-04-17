(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');
  const password = document.querySelector('.password');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity() && password.value.trim().length >= 8) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()




// const form = document.querySelector("#logInForm");
// const email = document.querySelector("#email");
// const password = document.querySelector("#password");


// function validateForm(event) {
//   event.preventDefault();

//   if (password.value.trim().length >= 8 && validateEmail(email.value)) {
//     passwordError.style.display = "none";
//     emailError.style.display = "none";

//     successMessage.innerHTML = "Thank you!";

//   } else {
//     passwordError.style.display = "block";
//     emailError.style.display = "block";
//   }
// }

// form.addEventListener("submit", validateForm);

// function validateEmail(email) {
//   const emailValidation = /\S+@\S+\.\S+/;
//   const testMatch = emailValidation.test(email);
//   return testMatch;
// }