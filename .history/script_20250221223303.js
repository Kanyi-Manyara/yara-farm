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

  // Lightbox Functionality
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    const lightbox = document.createElement('div');
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = '1000';

    const lightboxImg = document.createElement('img');
    lightboxImg.src = imgSrc;
    lightboxImg.style.maxWidth = '90%';
    lightboxImg.style.maxHeight = '90%';
    lightboxImg.style.borderRadius = '15px';

    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', () => {
      document.body.removeChild(lightbox);
    });
  });
});

// Toggle Side Navigation
const navToggle = document.getElementById('nav-toggle');
const sideNav = document.getElementById('side-nav');

navToggle.addEventListener('click', () => {
  sideNav.classList.toggle('active');
});

// Close Side Navigation When Clicking Outside
document.addEventListener('click', (event) => {
  if (!sideNav.contains(event.target) && !navToggle.contains(event.target)) {
    sideNav.classList.remove('active');
  }
});

// Close Side Navigation When a Link is Clicked
const navLinks = document.querySelectorAll('#side-nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    sideNav.classList.remove('active'); // Close the side nav
  });
});

// Close Side Navigation with Close Button
const navClose = document.getElementById('nav-close');

navClose.addEventListener('click', () => {
  sideNav.classList.remove('active');
});

