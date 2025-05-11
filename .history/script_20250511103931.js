// Splash Screen Animation
window.addEventListener('load', () => {
  setTimeout(() => {
      document.getElementById('splash-screen').style.display = 'none';
  }, 3000);
});

// Smooth Scrolling for both click and touch
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Lightbox Functionality with touch support
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  // Add both click and touch event listeners
  item.addEventListener('click', handleLightbox);
  item.addEventListener('touchend', handleLightbox);
});

function handleLightbox(e) {
  // Prevent default behavior for touch events
  if (e.type === 'touchend') {
      e.preventDefault();
  }
  
  const imgSrc = this.querySelector('img').src;
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

  // Close on both click and touch
  lightbox.addEventListener('click', () => {
      document.body.removeChild(lightbox);
  });
  lightbox.addEventListener('touchend', () => {
      document.body.removeChild(lightbox);
  });
}

// Toggle Side Navigation with touch support
const navToggle = document.getElementById('nav-toggle');
const sideNav = document.getElementById('side-nav');

// Add both click and touch event listeners
navToggle.addEventListener('click', toggleNav);
navToggle.addEventListener('touchend', toggleNav);

function toggleNav(e) {
  if (e.type === 'touchend') {
      e.preventDefault();
  }
  sideNav.classList.toggle('active');
}

// Close Side Navigation When Clicking/Touching Outside
document.addEventListener('click', (event) => {
  if (!sideNav.contains(event.target) && !navToggle.contains(event.target)) {
      sideNav.classList.remove('active');
  }
});

document.addEventListener('touchend', (event) => {
  if (!sideNav.contains(event.target) && !navToggle.contains(event.target)) {
      sideNav.classList.remove('active');
  }
});

// Close Side Navigation When a Link is Clicked/Touched
const navLinks = document.querySelectorAll('#side-nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
      sideNav.classList.remove('active');
  });
  link.addEventListener('touchend', (e) => {
      e.preventDefault();
      sideNav.classList.remove('active');
      // Trigger the click after a small delay to allow the nav to close
      setTimeout(() => {
          link.click();
      }, 100);
  });
});

// Enhanced Testimonial Carousel with touch and scroll control
const carouselTrack = document.querySelector('.carousel-track');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

// Touch event listeners
carouselTrack.addEventListener('touchstart', touchStart);
carouselTrack.addEventListener('touchend', touchEnd);
carouselTrack.addEventListener('touchmove', touchMove);

// Mouse event listeners for desktop
carouselTrack.addEventListener('mousedown', touchStart);
carouselTrack.addEventListener('mouseup', touchEnd);
carouselTrack.addEventListener('mouseleave', touchEnd);
carouselTrack.addEventListener('mousemove', touchMove);

// Auto-scroll variables
let autoScrollInterval;
const autoScrollSpeed = 1; // pixels per frame (adjust for speed)
let isAutoScrolling = true;

// Initialize auto-scroll
startAutoScroll();

function touchStart(e) {
  if (e.type === 'mousedown') {
      isDragging = true;
      startPos = e.clientX;
  } else {
      isDragging = true;
      startPos = e.touches[0].clientX;
  }
  
  // Stop auto-scroll when user interacts
  stopAutoScroll();
  cancelAnimationFrame(animationID);
  prevTranslate = currentTranslate;
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  
  // Determine if we should snap to a card
  const movedBy = currentTranslate - prevTranslate;
  
  if (movedBy < -100 && currentIndex < carouselTrack.children.length / 2 - 1) {
      currentIndex += 1;
  }
  
  if (movedBy > 100 && currentIndex > 0) {
      currentIndex -= 1;
  }
  
  setPositionByIndex();
  
  // Restart auto-scroll after a delay
  setTimeout(startAutoScroll, 3000);
}

function touchMove(e) {
  if (!isDragging) return;
  
  let currentPosition;
  if (e.type === 'mousemove') {
      currentPosition = e.clientX;
  } else {
      currentPosition = e.touches[0].clientX;
  }
  
  currentTranslate = prevTranslate + currentPosition - startPos;
  updateCarouselPosition();
}

function updateCarouselPosition() {
  carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -320; // 300px card + 20px margin
  updateCarouselPosition();
}

function startAutoScroll() {
  isAutoScrolling = true;
  autoScrollInterval = setInterval(() => {
      currentTranslate -= autoScrollSpeed;
      updateCarouselPosition();
      
      // Reset position when we've scrolled enough
      if (currentTranslate < -carouselTrack.scrollWidth / 2) {
          currentTranslate = 0;
          updateCarouselPosition();
      }
  }, 16); // ~60fps
}

function stopAutoScroll() {
  isAutoScrolling = false;
  clearInterval(autoScrollInterval);
}

// Pause carousel on hover (desktop only)
carouselTrack.addEventListener('mouseenter', () => {
  stopAutoScroll();
});

carouselTrack.addEventListener('mouseleave', () => {
  startAutoScroll();
});

// Enhanced Pinterest-style Gallery with Lightbox
document.addEventListener('DOMContentLoaded', () => {
  // Initialize gallery items after page load
  initGallery();
  
  // Handle window resize for responsive adjustments
  window.addEventListener('resize', adjustGallery);
});

function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Add event listeners for lightbox
  galleryItems.forEach(item => {
    // Add both click and touch event listeners
    item.addEventListener('click', handleLightbox);
    item.addEventListener('touchend', handleLightbox);
    
    // Add loading="lazy" attribute to images for better performance
    const img = item.querySelector('img');
    if (img) {
      img.setAttribute('loading', 'lazy');
    }
  });
  
  // Apply varied heights to images for Pinterest-like effect
  applyVariedHeights();
}



function adjustGallery() {
  // Reapply heights on window resize
  applyVariedHeights();
}

function handleLightbox(e) {
  // Prevent default behavior for touch events
  if (e.type === 'touchend') {
    e.preventDefault();
  }
  
  const imgSrc = this.querySelector('img').src;
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
  lightboxImg.style.objectFit = 'contain'; // Show entire image in lightbox

  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);

  // Close on both click and touch
  lightbox.addEventListener('click', () => {
    document.body.removeChild(lightbox);
  });
  lightbox.addEventListener('touchend', (e) => {
    e.preventDefault();
    document.body.removeChild(lightbox);
  });
}
// Proper masonry layout with image height detection
function setupMasonry() {
  const grid = document.querySelector('.gallery-grid');
  if (!grid) return;

  // Reset previous styles
  grid.style.gridAutoRows = 'auto';
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => item.style.gridRowEnd = '');

  // Calculate proper row spans after images load
  const images = document.querySelectorAll('.gallery-item img');
  images.forEach(img => {
    if (img.complete) {
      setRowSpan(img);
    } else {
      img.addEventListener('load', () => setRowSpan(img));
    }
  });
}

function setRowSpan(img) {
  const rowHeight = 10; // Base row height in pixels
  const rowSpan = Math.ceil(img.clientHeight / rowHeight);
  img.closest('.gallery-item').style.gridRowEnd = `span ${rowSpan}`;
}

// Initialize
window.addEventListener('load', setupMasonry);
window.addEventListener('resize', setupMasonry);