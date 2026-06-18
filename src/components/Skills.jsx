import React, { useEffect, useRef } from 'react';
import '../styles/skills.css';

const Skills = () => {
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

  const skillCategories = [
    {
      title: 'Systems & Backend',
      description: 'Building robust backend architectures, databases, and structured object-oriented software layers.',
      skills: ['Node.js', 'Express', 'C++', 'OOP', 'Data Structures', 'MongoDB']
    },
    {
      title: 'Frontend & Architectures',
      description: 'Developing highly interactive web user interfaces, reusable systems, and state-driven behaviors.',
      skills: ['React', 'Next.js', 'JavaScript', 'HTML5', 'CSS3', 'State Management']
    },
    {
      title: 'E-commerce & Interactive',
      description: 'Engineering customizable Shopify themes, Liquid templates, and immersive game builds in Unity.',
      skills: ['Shopify', 'Liquid', 'Custom Themes', 'Unity', 'C#', 'Game Development']
    }
  ];

  return (
    <section className="section-card skills-card" id="skills" ref={sectionRef}>
      <div className="skills-container fade-in">
        <span className="section-label">Skills & Expertise</span>
        <h2 className="section-title">Technical Capabilities</h2>

        {/* Competencies Bento Grid */}
        <div className="competencies-grid">
          {skillCategories.map((cat, index) => (
            <div key={index} className="competency-box">
              <h3 className="competency-title">{cat.title}</h3>
              <p className="competency-desc">{cat.description}</p>
              
              {/* Skill chips inside categories */}
              <div className="skills-chip-row">
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;