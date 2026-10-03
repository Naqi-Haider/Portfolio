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
      title: 'Backend & Databases',
      description: 'Building robust backend architectures, REST APIs, real-time services, and relational/document databases.',
      skills: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Redis', 'Socket.IO', 'Supabase', 'Prisma', 'MongoDB']
    },
    {
      title: 'Frontend & Architectures',
      description: 'Developing highly interactive web user interfaces, component systems, and state-driven client architectures.',
      skills: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'State Management', 'HTML5', 'CSS3']
    },
    {
      title: 'E-commerce & Interactive',
      description: 'Engineering customizable Shopify themes, Liquid templates, storefront APIs, and interactive game builds in Unity.',
      skills: ['Shopify', 'Liquid', 'Custom Themes', 'Metafields', 'Cart API', 'Section Rendering API', 'Unity', 'C#']
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