// Splash Screen Animation
window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('splash-screen').style.display = 'none';
    }, 3000); // 3 seconds
  });
  
  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });