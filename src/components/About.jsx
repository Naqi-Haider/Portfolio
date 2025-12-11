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
    { label: 'Availability', value: 'Freelance' }
  ];

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        {/* Two Column Layout */}
        <div className="about-grid fade-in">
          {/* Left Column - Headline */}
          <div className="about-headline">
            <span className="about-label">About Me</span>
            <h2 className="about-title">
              Freelance<br />
              <span className="highlight">Full Stack</span> &<br />
              Shopify Developer
            </h2>
          </div>

          {/* Right Column - Bio & Meta */}
          <div className="about-content">
            <p className="about-bio">
              Hello! I'm <strong>Muhammad Naqi Haider</strong>, a passionate developer who loves turning ideas into reality through clean, efficient code and beautiful user interfaces.
            </p>
            <p className="about-bio">
              With a strong foundation in both front-end and back-end technologies, I specialize in building modern web applications and custom Shopify stores. I thrive on solving complex problems and creating seamless digital experiences.
            </p>
            <p className="about-bio">
              I believe in writing code that not only works but is also maintainable, scalable, and elegant. Let's build something amazing together.
            </p>

            {/* Meta Data Labels */}
            <div className="about-meta">
              {metaData.map((item, index) => (
                <div key={index} className="meta-item">
                  <span className="meta-label">{item.label}</span>
                  <span className="meta-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row fade-in">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.type === 'success' ? 'success-card' : ''}`}>
              {stat.icon ? (
                <div className="stat-icon-wrapper">
                  <svg className="trophy-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 17H12.01" />
                    <path d="M6 3H18V9C18 14.5228 14.5228 21 12 21C9.47715 21 6 14.5228 6 9V3Z" />
                    <path d="M6 9C3 9 2 6 2 4.5C2 4.22386 2.22386 4 2.5 4H6" />
                    <path d="M18 9C21 9 22 6 22 4.5C22 4.22386 21.7761 4 21.5 4H18" />
                  </svg>
                  <span className="stat-number">{stat.number}</span>
                </div>
              ) : (
                <span className="stat-number">{stat.number}</span>
              )}
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;