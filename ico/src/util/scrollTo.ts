export function scrollTo(targetY: number, duration: number) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = new Date().getTime();
  
    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
  
    const animation = () => {
      const currentTime = new Date().getTime();
      const elapsed = currentTime - startTime;
      const scrollY = easeInOutQuad(elapsed, startY, distance, duration);
  
      window.scrollTo(0, scrollY);
  
      if (elapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
  
    animation();
  }