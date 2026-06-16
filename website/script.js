// Detect User Platform and Highlight corresponding download card
document.addEventListener('DOMContentLoaded', () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const cards = document.querySelectorAll('.download-card');
  
  // Clear any default active-platform class
  cards.forEach(card => card.classList.remove('active-platform'));
  
  let detectedPlatform = 'windows'; // Default fallback
  
  if (/Mac/i.test(userAgent)) {
    detectedPlatform = 'macos';
  } else if (/Linux/i.test(userAgent)) {
    detectedPlatform = 'linux';
  } else if (/Windows/i.test(userAgent)) {
    detectedPlatform = 'windows';
  }
  
  // Apply active platform styling
  if (detectedPlatform === 'windows') {
    cards[0].classList.add('active-platform');
  } else if (detectedPlatform === 'macos') {
    cards[1].classList.add('active-platform');
  } else if (detectedPlatform === 'linux') {
    cards[2].classList.add('active-platform');
  }
  
  // Simple scroll reveal animation for feature cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add active class with staggered delay
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
  });
  
  // Style for revealed element
  const style = document.createElement('style');
  style.innerHTML = `
    .feature-card.revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
