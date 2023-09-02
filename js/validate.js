document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = form.querySelector('#email');
    const password = form.querySelector('#password');

    email.classList.remove('is-valid', 'is-invalid');
    password.classList.remove('is-valid', 'is-invalid');

    let valid = true;

    if (email.value === "") {
      email.classList.add('is-invalid');
      valid = false;
    } else {
      email.classList.add('is-valid');
    }

    if (password.value === "") {
          password.classList.add('is-invalid');
          valid = false;
    } else {
      password.classList.add('is-valid');
    }

    if (valid) {
      form.submit();
    }
  });
});
