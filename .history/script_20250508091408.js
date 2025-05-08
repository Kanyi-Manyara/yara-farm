// Splash Screen Animation
window.addEventListener('load', () => {
  setTimeout(() => {
      document.getElementById('splash-screen').style.display = 'none';
  }, 3000); // 3 seconds
});

// Horizontal Scrolling Setup
let isScrolling = false;
let startX = 0;
let scrollLeft = 0;
let scrollTimeout;

// Initialize horizontal scrolling
function initHorizontalScroll() {
  // Set initial active section
  updateActiveNav();
  
  // Handle wheel events for horizontal scrolling
  document.addEventListener('wheel', handleWheel, { passive: false });
  
  // Touch events for mobile devices
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Update active nav on scroll
  window.addEventListener('scroll', handleScroll);
}

// Wheel event handler for horizontal scrolling
function handleWheel(e) {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      // Allow vertical scrolling within sections
      return;
  }
  
  // Prevent default horizontal scroll to use our smooth scrolling
  e.preventDefault();
  
  // Smooth horizontal scrolling
  window.scrollBy({
      left: e.deltaY * 2,
      behavior: 'smooth'
  });
  
  // Update active nav after scroll
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(updateActiveNav, 100);
}

// Touch event handlers
function handleTouchStart(e) {
  isScrolling = true;
  startX = e.touches[0].pageX;
  scrollLeft = window.scrollX;
}

function handleTouchMove(e) {
  if (!isScrolling) return;
  e.preventDefault();
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 2;
  window.scrollTo({
      left: scrollLeft - walk,
      behavior: 'auto'
  });
}

function handleTouchEnd() {
  isScrolling = false;
  snapToNearestSection();
}

// Snap to nearest section
function snapToNearestSection() {
  const sections = document.querySelectorAll('section');
  let closestSection = null;
  let minDistance = Infinity;
  
  sections.forEach(section => {
      const distance = Math.abs(section.offsetLeft - window.scrollX);
      if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
      }
  });
  
  if (closestSection) {
      closestSection.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
      });
  }
  
  updateActiveNav();
}

// Update active navigation based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('#side-nav ul li a');
  let current = '';
  
  sections.forEach(section => {
      const sectionLeft = section.offsetLeft;
      if (window.scrollX >= sectionLeft - (window.innerWidth / 2)) {
          current = section.getAttribute('id');
      }
  });
  
  navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
      }
  });
}

// Handle scroll events
function handleScroll() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(updateActiveNav, 100);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'start'
              });
          }
      });
  });
}

// Lightbox Functionality
function setupLightbox() {
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
}

// Toggle Side Navigation
function setupSideNav() {
  const navToggle = document.getElementById('nav-toggle');
  const sideNav = document.getElementById('side-nav');
  
  if (navToggle && sideNav) {
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
              sideNav.classList.remove('active');
          });
      });
  }
}

// Pause carousel on hover
function setupCarousel() {
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
      carouselTrack.addEventListener('mouseenter', () => {
          carouselTrack.style.animationPlayState = 'paused';
      });
      
      carouselTrack.addEventListener('mouseleave', () => {
          carouselTrack.style.animationPlayState = 'running';
      });
  }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  initHorizontalScroll();
  setupSmoothScrolling();
  setupLightbox();
  setupSideNav();
  setupCarousel();
});