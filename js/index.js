document.getElementById('loginForm').addEventListener('submit', function(event) {
  if (!this.checkValidity()) {
    event.preventDefault();  
    this.classList.add('was-validated'); 
  } else {
    window.location.href = 'profile.html'; 
  }
});

  