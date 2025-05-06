
export const setupAnimations = () => {
  if (typeof window !== 'undefined') {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // If element is in viewport
        if (rect.top <= windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };

    // Run once on load
    animateElements();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateElements, { passive: true });
    
    // Clean up on component unmount
    return () => {
      window.removeEventListener('scroll', animateElements);
    };
  }
};
