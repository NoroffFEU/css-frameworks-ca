(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // If form is valid, redirect to the desired location
        window.location.href = 'feed/index.html';
        event.preventDefault(); // Prevent default form submission behavior
      }

      form.classList.add('was-validated');
    }, false);
  });
})();
