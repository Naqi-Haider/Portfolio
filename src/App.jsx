import React, { useEffect, useRef } from 'react';
import './App.css';
import Lenis from 'lenis';
import Header from './components/Header';
import About from './components/About';
import Jumbo from './components/Jumbo';
import Skills from './components/Skills';
import Projects from './components/Projects';
import LoveCounter from './components/LoveCounter';
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
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <About />
        <Jumbo />
        <Skills />
        <Projects />
        <LoveCounter />
        <Footer />
      </main>
      <ScrollToTop />
    </div>
  );
}

export default App;