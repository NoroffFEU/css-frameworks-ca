
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

toggleDarkModeButton.addEventListener('click', () => {
  document.body.classList.toggle('bg-dark');
  document.body.classList.toggle('text-white');
  document.querySelectorAll('.card-body').forEach(cardBody => {
    cardBody.classList.toggle('card-body-dark');
  });
  document.querySelectorAll('.card').forEach(card => {
    card.classList.toggle('card-dark');
  });
});

const loginButton = document.getElementById('login-button');
const passwordInput = document.getElementById('password');

loginButton.addEventListener('click', (event) => {
  if (passwordInput.value.length >= 8) {
    event.preventDefault();
    window.location.href = '/profile/index.html';
  }
});

