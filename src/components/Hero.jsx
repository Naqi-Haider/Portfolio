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

  const scrollToSection = (sectionId, offset = -70) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(element, { offset, duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjectsTab = (tab = 'selected') => {
    window.dispatchEvent(new CustomEvent('switch-projects-tab', { detail: tab }));
    setTimeout(() => {
      scrollToSection('projects');
    }, 40);
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
              Shopify Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="btn-shopify-icon"
              >
                <path d="M16 23V4L4 7.5L3 20.5L16 23Z" />
                <path d="M17.5 5.14833L16 4V23L21 21.5C21 18.8371 20.7998 16.178 20.4012 13.5451L19.1298 5.14833H17.5Z" />
                <path d="M13.0016 4.87502C13.0092 2.85785 12.239 1.26304 11.0023 1.02911C9.44084 0.73373 7.72699 2.71982 7.17435 5.46517C7.09535 5.85761 7.04435 6.24433 7.01953 6.61979" />
                <path d="M14.8665 4.33083C14.5732 3.14854 13.9527 2.31296 13.1092 2.14837C11.7258 1.8784 10.2195 3.50662 9.55469 5.8801" />
                <path d="M12.7896 9.42437C11.7896 9.0035 9.19076 8.24627 8.50372 10.266C8.1332 11.3553 8.79795 12.5183 10.2171 13.6331C12.2041 15.1939 11.867 16.524 11.5033 17.0001C10.2176 18.6837 7.64621 17.7016 6.78906 17.0001" />
              </svg>
            </button>
            <a href="/Naqi_Haider_CV_Updated.pdf" download="Naqi_Haider_CV_Updated.pdf" className="btn-ghost-pill">
              Download CV ↓
            </a>
          </div>
        </div>

        {/* Right Column - Profile Card + Orbit Graphic */}
        <div className="hero-image-pane">
          <div className="hero-orbit-wrapper" aria-hidden="true">
            <svg className="hero-orbit-svg" viewBox="0 0 440 440">
              <circle cx="220" cy="220" r="185" stroke="rgba(255, 255, 227, 0.22)" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
              <g className="orbit-group">
                {/* Node 1: Web */}
                <g className="orbit-node">
                  <circle cx="220" cy="35" r="22" fill="#2D3748" stroke="var(--accent-color)" strokeWidth="2.5" />
                  <text x="220" y="40" fill="#FFFFE3" fontSize="10.5" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">Web</text>
                </g>
                {/* Node 2: Shopify */}
                <g className="orbit-node">
                  <circle cx="380" cy="313" r="24" fill="#2D3748" stroke="#10B981" strokeWidth="2.5" />
                  <text x="380" y="318" fill="#FFFFE3" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">Shopify</text>
                </g>
                {/* Node 3: Game */}
                <g className="orbit-node">
                  <circle cx="60" cy="313" r="22" fill="#2D3748" stroke="#6D8196" strokeWidth="2.5" />
                  <text x="60" y="318" fill="#FFFFE3" fontSize="10.5" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">Game</text>
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
