import React, { useEffect, useRef } from 'react';
import '../styles/about.css';

const About = () => {
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

    const elements = sectionRef.current.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title fade-in">About Me</h2>
        
        <div className="about-content">
          {/* Top Section: Who I Am (Left) and Stats (Right) */}
          <div className="about-top-grid fade-in">
            <div className="about-card glass-card">
              <div className="about-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div className="about-text">
                <h3>Who I Am</h3>
                <p>
                  Hello! I'm <strong>Muhammad Naqi Haider</strong>, a passionate coding enthusiast. I love turning ideas into reality 
                  through clean, efficient code and beautiful user interfaces.
                </p>
                <p>
                  My journey in software development has been driven by curiosity and a constant 
                  desire to learn. I believe in writing code that not only works but is also 
                  maintainable, scalable, and elegant.
                </p>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h4 className="stat-number">4</h4>
                  <p className="stat-label">Public Repositories</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h4 className="stat-number">1</h4>
                  <p className="stat-label">GitHub Followers</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h4 className="stat-number">2023</h4>
                  <p className="stat-label">Coding Since</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Mission, Approach, Values */}
          <div className="about-highlights fade-in">
            <div className="highlight-card">
              <div className="highlight-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h4>My Mission</h4>
              <p>
                To create innovative solutions that make a positive impact and help 
                people solve real-world problems through technology.
              </p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
              </div>
              <h4>My Approach</h4>
              <p>
                I focus on continuous learning, best practices, and staying updated 
                with the latest technologies to deliver exceptional results.
              </p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h4>My Values</h4>
              <p>
                Clean code, user-centric design, collaborative teamwork, and a 
                commitment to excellence in everything I build.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;