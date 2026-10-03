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

          <div className="hero-subheading-wrapper">
            <span className="hero-subheading-tag">
              Full-Stack Developer |{' '}
              <span className="scribble-target">
                Shopify Theme Developer
                <svg className="scribble-underline" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8M10 10C70 5 140 5 190 10" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </div>

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

        {/* Right Column - Profile Card + Orbit Graphic */}
        <div className="hero-image-pane">
          <div className="hero-orbit-wrapper" aria-hidden="true">
            <svg className="hero-orbit-svg" viewBox="0 0 300 300">
              <circle cx="150" cy="150" r="120" stroke="rgba(255, 255, 227, 0.15)" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
              <g className="orbit-group">
                {/* Node 1: Web */}
                <g className="orbit-node">
                  <circle cx="150" cy="30" r="18" fill="#2D3748" stroke="var(--accent-color)" strokeWidth="2" />
                  <text x="150" y="34" fill="#FFFFE3" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">Web</text>
                </g>
                {/* Node 2: Shopify */}
                <g className="orbit-node">
                  <circle cx="254" cy="210" r="20" fill="#2D3748" stroke="#10B981" strokeWidth="2" />
                  <text x="254" y="214" fill="#FFFFE3" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">Shopify</text>
                </g>
                {/* Node 3: Game */}
                <g className="orbit-node">
                  <circle cx="46" cy="210" r="18" fill="#2D3748" stroke="#6D8196" strokeWidth="2" />
                  <text x="46" y="214" fill="#FFFFE3" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">Game</text>
                </g>
              </g>
            </svg>
          </div>

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
