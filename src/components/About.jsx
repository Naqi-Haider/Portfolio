import React, { useEffect, useRef } from 'react';
import '../styles/About.css';

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-content">
        <h2 className="section-title fade-in">About Me</h2>
        
        {/* Top Grid: Who I Am (Left) + Highlight Cards (Right) */}
        <div className="about-top-grid fade-in">
          {/* Left Side - Who I Am */}
          <div className="glass-card about-card">
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
                Hello! I'm <strong>Muhammad Naqi Haider</strong>, a passionate coding enthusiast. I love turning ideas into reality through clean, efficient code and beautiful user interfaces.
              </p>
              <p>
                My journey in software development has been driven by curiosity and a constant desire to learn. I believe in writing code that not only works but is also maintainable, scalable, and elegant.
              </p>
              <p>
                With a strong foundation in both front-end & back-end technologies for 
                <strong> two years</strong>, I enjoy tackling challenges that require creative problem-solving and innovative thinking.
              </p>
              <p>
                I thrive in collaborative environments where I can contribute to meaningful projects and grow alongside talented individuals. <i>Let's build something amazing together!</i>
              </p>
            </div>
          </div>

          {/* Right Side - Highlight Cards (Mission, Approach, Values) */}
          <div className="about-highlights-vertical">
            <div className="highlight-card">
              <div className="highlight-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h4>My Mission</h4>
              <p>
                To create innovative solutions that make a positive impact and help people solve real-world problems.
              </p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h4>My Approach</h4>
              <p>
                I focus on continuous learning, best practices, and staying updated with the latest technologies.
              </p>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h4>My Values</h4>
              <p>
                Clean code, user-centric design, collaborative teamwork, and a commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;