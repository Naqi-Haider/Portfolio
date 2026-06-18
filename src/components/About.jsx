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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '2+', label: 'Years Experience', type: 'number' },
    { number: '10+', label: 'Projects Completed', type: 'number' },
    { number: '100%', label: 'Job Success', type: 'success', icon: true }
  ];

  const metaData = [
    { label: 'Location', value: 'Pakistan' },
    { label: 'Experience', value: '2+ Years' },
    { label: 'Availability', value: 'Available' }
  ];

  return (
    <section className="section-card about-card" id="about" ref={sectionRef}>
      <div className="about-container fade-in">
        {/* Header Layout */}
        <span className="section-label">[ ABOUT ]</span>
        <h2 className="section-title">
          Building across the full stack ; web, storefronts, and game worlds.
        </h2>

        {/* Grid Content */}
        <div className="about-grid">
          {/* Left Column - Bios & Quote */}
          <div className="about-content">
            <p className="about-bio">
              Hello! I'm <strong>Muhammad Naqi Haider</strong>, a software engineer driven to solve challenging problems using whatever technology stack is best suited for the task.
            </p>
            <p className="about-bio">
              My engineering journey is unique—transitioning from a biological sciences background into Computer Science. This transition instilled in me a rigorous scientific approach to debugging, systems modeling, and algorithmic design. Currently, I focus on full-stack web architectures, custom e-commerce customizers, and interactive Unity game development.
            </p>

            {/* Adaptability Quote */}
            <div className="about-quote-container">
              <span className="quote-mark">“</span>
              <p className="about-quote">
                Adaptability is my strongest technical skill.
              </p>
            </div>
          </div>

          {/* Right Column - Meta & Stats */}
          <div className="about-sidebar">
            <div className="about-meta-card">
              {metaData.map((item, index) => (
                <div key={index} className="meta-row">
                  <span className="meta-label">{item.label}</span>
                  <span className="meta-value">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className={`stat-box ${stat.type === 'success' ? 'success-box' : ''}`}>
                  <span className="stat-num">{stat.number}</span>
                  <span className="stat-lbl">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;