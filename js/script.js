// SIDEBAR //

const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
const menuTexts = document.querySelectorAll('.menu-text');

sidebarToggle.addEventListener('click', function() {
  sidebar.classList.toggle('expanded'); 
  sidebarToggle.querySelector('i').classList.toggle('fa-bars'); 
  sidebarToggle.querySelector('i').classList.toggle('fa-times'); 

  menuTexts.forEach(text => {
    text.classList.toggle('visible');
  });
});

