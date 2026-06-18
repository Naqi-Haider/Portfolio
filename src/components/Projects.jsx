import React, { useState, useEffect, useCallback, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';
import '../styles/projects.css';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const projectsData = [
    {
      id: 1,
      title: 'Typing Sprint Game (Fullstack Project)',
      description: 'Interactive utility to test and improve typing speed and accuracy, featuring live typing metrics (WPM/accuracy), database-backed leaderboard systems, and clean game state transitions.',
      image: '/typing-sprint thumbnail.webp',
      category: 'FULLSTACK GAMEPLAY',
      technologies: ['React', 'CSS', 'Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com/Naqi-Haider/TypingSprint',
      live: 'https://typing-sprint.netlify.app'
    },
    {
      id: 2,
      title: 'YouTube Clone (HTML / CSS Learning Project)',
      description: 'A fully functional video player layout replicating search inputs, recommendation feeds, channel profiles, and responsive video streaming layouts. Built as a HTML/CSS stylesheet learning playground.',
      image: '/Youtube-clone.webp',
      category: 'HTML & CSS PRACTICE',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
      github: 'https://github.com/Naqi-Haider/youtube-clone'
    },
    {
      id: 3,
      title: 'Movie Ticket Booking System (C++ / OOP)',
      description: 'A comprehensive backend seat reservation engine managing cinema database states, seat maps, checkouts, and transactional receipts. Built to practice pure OOP concepts and algorithms.',
      image: '/Movie-Ticket-Booking-System.webp',
      category: 'OOP SYSTEM',
      technologies: ['C++', 'OOP', 'Data Structures', 'Algorithms'],
      github: 'https://github.com/Naqi-Haider/movie-ticket-booking'
    },
    {
      id: 4,
      title: 'Amazon Clone (Vanilla JS Learning Project)',
      description: 'A modular vanilla Javascript frontend storefront replica featuring dynamic shopping cart state synchronization, search filtering, catalogs, local database integration, and order audits.',
      image: '/JavaScript Amazon RawJS Clone.webp',
      category: 'JAVASCRIPT DEVELOPMENT',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Data Storage'],
      github: 'https://github.com/Naqi-Haider/amazon-rawjs'
    },
    {
      id: 5,
      title: 'Shopify Clone Store (React / Node.js / MongoDB)',
      description: 'A custom retail store replica implementing product catalogs, cart models, full checkouts, and an admin dashboard to add/remove products and review store performance.',
      image: '/JonesRoadClone.webp',
      category: 'SHOPIFY REPLICA',
      technologies: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
      github: 'https://github.com/Naqi-Haider/shopify-store-clone'
    }
  ];

  // Mobile layout checker
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const clearAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (isMobile) return;
    clearAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    }, 20000);
  }, [clearAutoPlay, projectsData.length, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      startAutoPlay();
    }
    return () => clearAutoPlay();
  }, [startAutoPlay, clearAutoPlay, isMobile]);

  const goToNext = useCallback(() => {
    clearAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    startAutoPlay();
  }, [clearAutoPlay, startAutoPlay, projectsData.length]);

  const goToPrev = useCallback(() => {
    clearAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    startAutoPlay();
  }, [clearAutoPlay, startAutoPlay, projectsData.length]);

  const goToSlide = useCallback((index) => {
    if (index === currentIndex) return;
    clearAutoPlay();
    setCurrentIndex(index);
    startAutoPlay();
  }, [currentIndex, clearAutoPlay, startAutoPlay]);

  const currentProject = projectsData[currentIndex];

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 }
  };

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

  // Responsive Mobile Layout: Desktop horizontal carousel scroll matching
  if (isMobile) {
    return (
      <section className="section-card projects-card projects-mobile" id="projects" ref={sectionRef}>
        <div className="projects-container">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Selected Work</h2>

          {/* Mobile Horizontal Scroll Track */}
        <div className="mobile-carousel-container" ref={scrollContainerRef}>
          <div className="mobile-carousel-track">
            {projectsData.map((project) => (
              <div key={project.id} className="mobile-project-card">
                <div className="mobile-project-image">
                  <ProgressiveImage
                    src={project.image}
                    alt={project.title}
                    fallbackText={project.title}
                    aspectRatio="16/10"
                  />
                </div>

                <div className="mobile-project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech-stack">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="skill-chip-dark">{tech}</span>
                    ))}
                  </div>

                  <div className="project-button-group">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn btn-source"
                    >
                      GitHub
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn live-btn"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="swipe-indicator fade-in">
          <span>← Swipe to view projects →</span>
        </div>
        </div>
      </section>
    );
  }

  // Desktop Carousel View
  return (
    <section className="section-card projects-card" id="projects" ref={sectionRef}>
      <div className="projects-container">
        <span className="section-label">Projects</span>
        <h2 className="section-title">Selected Work</h2>

        <div className="project-carousel-wrapper fade-in">
          {/* Carousel Content */}
          <div className="project-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="project-slide"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {/* Left Column - Project Info */}
              <div className="project-info">
                <span className="project-category">{currentProject.category}</span>
                <h3 className="project-title">{currentProject.title}</h3>
                <p className="project-description">{currentProject.description}</p>

                <div className="project-tech-stack">
                  {currentProject.technologies.map((tech, i) => (
                    <span key={i} className="skill-chip-dark">{tech}</span>
                  ))}
                </div>

                <div className="project-button-group">
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn btn-source"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Source Code
                  </a>
                  {currentProject.live && (
                    <a
                      href={currentProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn live-btn"
                    >
                      Live Demo
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column - Project Image */}
              <a
                href={currentProject.live || currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-image-wrapper"
              >
                <ProgressiveImage
                  src={currentProject.image}
                  alt={currentProject.title}
                  fallbackText={currentProject.title}
                  aspectRatio="16/10"
                />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Pagination */}
        <div className="carousel-bottom-nav">
          <div className="pagination-dots">
            {projectsData.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <div className="slide-counter-wrapper">
            <button className="nav-arrow-inline prev" onClick={goToPrev} aria-label="Previous project">
              ←
            </button>
            <div className="slide-counter">
              <span className="current">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="divider">/</span>
              <span className="total">{String(projectsData.length).padStart(2, '0')}</span>
            </div>
            <button className="nav-arrow-inline next" onClick={goToNext} aria-label="Next project">
              →
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Projects;