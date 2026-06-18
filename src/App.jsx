import React, { useEffect, useRef } from 'react';
import './App.css';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ScrollToTop from './components/Scroll-to-top';

function App() {
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // IntersectionObserver to scale down previous cards in the sticky stack
  useEffect(() => {
    const cards = document.querySelectorAll('.section-card');
    
    const observerOptions = {
      root: null,
      threshold: [0.15, 0.9],
      rootMargin: '-80px 0px -10% 0px' // accounts for pill navbar at top
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        // Toggle the is-active class depending on scroll visibility
        if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
          entry.target.classList.add('is-active');
        } else {
          entry.target.classList.remove('is-active');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Footer />
      </main>
      <ScrollToTop />
    </div>
  );
}

export default App;