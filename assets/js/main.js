document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const body = document.body;
  
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', sidebar.classList.contains('open'));
    });
    
    document.addEventListener('click', function(e) {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || 
        (currentPath === '/' && href === '/index.html') ||
        (currentPath.includes(href) && href !== '#')) {
      link.classList.add('active');
    }
  });
});
