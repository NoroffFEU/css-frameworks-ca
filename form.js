const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); 
  const password = loginForm.querySelector('input[name="password"]').value; 
  if (password.length < 8) {
    alert('Password must be at least 8 characters long.');
  } else {
    window.location.href = '/profile/index.html'; 
  }
});

const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('register-submit', function(event) {
  event.preventDefault(); 
  const password = registerForm.querySelector('input[name="password"]').value; 
  if (password.length < 8) {
    alert('Password must be at least 8 characters long.');
  } else {
    window.location.href = '/profile/index.html'; 
  }
});

