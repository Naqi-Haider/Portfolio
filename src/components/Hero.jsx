import React, { useEffect, useRef } from 'react';
import '../styles/hero.css';

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjectsTab = (tab = 'selected') => {
    window.dispatchEvent(new CustomEvent('switch-projects-tab', { detail: tab }));
    scrollToSection('projects');
  };

  return (
    <section className="section-card home-card" id="home" ref={sectionRef}>
      <div className="hero-container fade-in">
        {/* Left Column - Name, Roles, Actions */}
        <div className="hero-content">
          <span className="hero-greeting-label">SOFTWARE ENGINEER</span>
          <h1 className="hero-name">
            Muhammad<br />Naqi Haider
          </h1>

          <span className="hero-subheading-tag">Full-Stack Developer | Shopify Theme Developer</span>

          <div className="hero-actions-container">
            <button className="btn-primary-pill" onClick={() => scrollToProjectsTab('selected')}>
              Selected Work →
            </button>
            <button className="btn-accent-pill" onClick={() => scrollToProjectsTab('shopify')}>
              Shopify Projects 🛍️
            </button>
            <a href="/Naqi_Haider_CV.pdf" download="Naqi_Haider_CV.pdf" className="btn-ghost-pill">
              Download CV ↓
            </a>
          </div>
        </div>

        {/* Right Column - Premium Profile Card */}
        <div className="hero-image-pane">
          <div className="profile-brutal-card">
            <div className="profile-img-wrapper">
              <img
                src="/linkedin-profile.webp"
                alt="Muhammad Naqi Haider"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
