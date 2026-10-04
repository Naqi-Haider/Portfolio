import React, { useState, useEffect } from 'react';
import '../styles/scroll-to-top.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      if (scrollTop > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // SVG Ring calculation (r = 20, circumference = 2 * PI * 20 ≈ 125.66)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg className="progress-ring" width="52" height="52" viewBox="0 0 52 52">
        <circle
          className="progress-ring-bg"
          stroke="rgba(255, 255, 227, 0.2)"
          strokeWidth="3"
          fill="transparent"
          r={radius}
          cx="26"
          cy="26"
        />
        <circle
          className="progress-ring-circle"
          stroke="var(--accent-color)"
          strokeWidth="3"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="26"
          cy="26"
        />
      </svg>
      <svg className="scroll-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
};

export default ScrollToTop;