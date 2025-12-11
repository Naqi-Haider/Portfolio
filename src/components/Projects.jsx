import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      title: 'YouTube Clone',
      description: 'A fully functional YouTube clone with video playback, search functionality, and responsive design. Built to replicate the core features of the original platform with a focus on clean UI and smooth user experience.',
      image: 'https://www.researchgate.net/publication/376956293/figure/fig3/AS:11431281217094493@1705029863831/YouTube-homepage-for-User-A-trained-with-positive-video-set.png',
      category: 'DESIGN • DEVELOPMENT',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Naqi-Haider/youtube-clone'
    },
    {
      id: 2,
      title: 'Movie Ticket Booking System',
      description: 'A comprehensive C++ based movie ticket booking system featuring seat selection, reservation management, and a user-friendly command-line interface. Demonstrates strong OOP principles.',
      image: '/Movie-Ticket-Booking-System.png',
      category: 'DEVELOPMENT • OOP',
      technologies: ['C++', 'OOP', 'Data Structures'],
      github: 'https://github.com/Naqi-Haider/movie-ticket-booking'
    },
    {
      id: 3,
      title: 'Amazon RawJS Clone',
      description: 'An Amazon e-commerce clone built with vanilla JavaScript. Features include product catalogs, shopping cart functionality, and a complete checkout process with order tracking.',
      image: '/JavaScript Amazon RawJS Clone.png',
      category: 'E-COMMERCE • FRONTEND',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      github: 'https://github.com/Naqi-Haider/amazon-rawjs'
    },
    {
      id: 4,
      title: 'Shopify Store Clone',
      description: 'A complete Shopify store clone built with modern technologies. Features product catalogs, shopping cart, user authentication, and a seamless checkout experience.',
      image: '/JonesRoadClone.png',
      category: 'E-COMMERCE • SHOPIFY',
      technologies: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/Naqi-Haider/shopify-store-clone'
    }
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Clear timer helper
  const clearAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Start auto-play (only on desktop)
  const startAutoPlay = useCallback(() => {
    if (isMobile) return;
    clearAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    }, 25000);
  }, [clearAutoPlay, projectsData.length, isMobile]);

  // Initialize auto-play
  useEffect(() => {
    if (!isMobile) {
      startAutoPlay();
    }
    return () => clearAutoPlay();
  }, [startAutoPlay, clearAutoPlay, isMobile]);

  // Navigation - clears timer immediately
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

  // Animation variants
  const slideVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  // Fade-in observer
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

  // Mobile Swipeable Carousel
  if (isMobile) {
    return (
      <section className="projects projects-mobile" id="projects" ref={sectionRef}>
        <h2 className="section-title fade-in">Featured Projects</h2>

        {/* Mobile Horizontal Scroll Carousel */}
        <div className="mobile-carousel-container" ref={scrollContainerRef}>
          <div className="mobile-carousel-track">
            {projectsData.map((project, index) => (
              <div key={project.id} className="mobile-project-card">
                <div className="mobile-project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/800x600/2a2a2a/ffffff?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                  <span className="project-category">{project.category}</span>
                </div>

                <div className="mobile-project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech-stack">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-pill">{tech}</span>
                    ))}
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    View on GitHub
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="swipe-indicator fade-in">
          <span>← Swipe to explore →</span>
        </div>
      </section>
    );
  }

  // Desktop Carousel
  return (
    <section className="projects" id="projects" ref={sectionRef}>
      {/* Section Title */}
      <h2 className="section-title fade-in">Featured Projects</h2>

      {/* Full-Width Carousel Container */}
      <div className="project-carousel-wrapper">
        {/* Navigation Arrows - Absolute Position */}
        <button
          className="nav-arrow prev"
          onClick={goToPrev}
          aria-label="Previous project"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          className="nav-arrow next"
          onClick={goToNext}
          aria-label="Next project"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Carousel Content with AnimatePresence */}
        <div className="project-carousel fade-in">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="project-slide"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Left Column - Project Info */}
              <div className="project-info">
                <span className="project-category">{currentProject.category}</span>
                <h3 className="project-title">{currentProject.title}</h3>
                <p className="project-description">{currentProject.description}</p>

                <div className="project-tech-stack">
                  {currentProject.technologies.map((tech, i) => (
                    <span key={i} className="tech-pill">{tech}</span>
                  ))}
                </div>

                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

              {/* Right Column - Project Image */}
              <div className="project-image-container">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x600/2a2a2a/ffffff?text=${encodeURIComponent(currentProject.title)}`;
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="carousel-bottom-nav fade-in">
          {/* Pagination Dots */}
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

          {/* Slide Counter */}
          <div className="slide-counter">
            <span className="current">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="divider">/</span>
            <span className="total">{String(projectsData.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;