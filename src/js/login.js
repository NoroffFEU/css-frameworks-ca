document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');

    togglePasswordBtn.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide';
    });
});