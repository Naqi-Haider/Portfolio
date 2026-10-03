import React, { useState, useEffect, useCallback, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';
import '../styles/projects.css';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('selected'); // 'selected' | 'shopify'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Filtered Selected Work Data (Shopify Clone Store hidden)
  const selectedWorkData = [
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
      title: 'Learning Management System (LMS)',
      description: 'A multi-role admin, instructor, and student role-based simplified LMS system featuring course enrollment, assignment progression tracking, and comprehensive educational management attributes.',
      image: '/LMS Multi.webp',
      category: 'FULLSTACK LMS APP',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com/Naqi-Haider/LMS',
      live: 'https://learningmanagementsystem-naqi.netlify.app/'
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
    }
  ];

  // 3 Shopify Theme Projects
  const shopifyProjectsData = [
    {
      id: 1,
      title: '1. Tiered Free Gift Cart Drawer',
      tagline: 'A cart drawer that unlocks free gifts at spend milestones, with a live progress bar.',
      description: 'A custom cart drawer feature built on Dawn that rewards customers with free gifts at two spend thresholds. At $60, a free gift (gloves) is added automatically, and at $100 a second one (a beanie). Both are backed by Buy X Get Y automatic discounts in the Shopify admin. The merchant can choose any product as the gift for each tier and change the threshold amounts from the theme editor, with no code changes.',
      bullets: [
        'A progress bar with tier markers and a live "Add $X more to unlock…" message.',
        'Free Gift badges with the original price struck through.',
        'A "You saved with free gifts" line once gifts are applied.',
        'Safe reverting: if the cart drops below a threshold, the gift is removed automatically and a loader shows while the cart updates.'
      ],
      note: 'Built with Liquid, JavaScript, the Cart API, and Shopify automatic discounts.',
      category: 'SHOPIFY THEME FEATURE',
      technologies: ['Liquid', 'JavaScript', 'Cart API', 'Automatic Discounts', 'Theme Editor Settings'],
      videoUrl: 'https://youtu.be/rRrfYAfhp3k'
    },
    {
      id: 2,
      title: '2. Linked Product Swatches (Cross-Product Switching)',
      tagline: 'Switch between related products, such as shirt colors, without a page reload.',
      description: 'A custom swatch selector for products that are listed separately but belong together, such as the same shirt in brown, blue, red, and yellow. Related products are connected through a "Linked products" metafield (list of products) on each product. On a product page, the swatches show the other linked products. Clicking one fetches that product\'s template with the Section Rendering API and swaps in its media, title, price, and details, with no full page refresh and the URL updating to the new product. Built with Liquid, JavaScript, metafields, and the Section Rendering API.',
      bullets: [],
      note: '',
      category: 'SHOPIFY THEME FEATURE',
      technologies: ['Liquid', 'JavaScript', 'Metafields', 'Section Rendering API'],
      videoUrl: 'https://youtu.be/_3M6osuuCQs'
    },
    {
      id: 3,
      title: '3. Voluspa Product Page Recreation',
      tagline: 'A premium product page rebuilt as an editable Dawn template, with a custom related-products section.',
      description: 'A recreation of the Voluspa product page inside a Dawn theme, built to practice turning a real-world design into editable theme sections and blocks. It covers the layout, responsive styling, and a custom related-products section made just for this template. The merchant adds products from the theme editor, and the section is styled to match the original\'s related-products layout. Built with Liquid, HTML/CSS, and JavaScript. This is a learning project and isn\'t affiliated with the brand.',
      bullets: [],
      note: '',
      category: 'SHOPIFY TEMPLATE RECREATION',
      technologies: ['Liquid', 'HTML/CSS', 'JavaScript', 'Custom Sections'],
      videoUrl: 'https://youtu.be/rXeda9wYzV8'
    }
  ];

  const activeProjectsList = activeTab === 'selected' ? selectedWorkData : shopifyProjectsData;

  // Reset index when tab switches
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  // Helper to extract embeddable YouTube URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    const trimmed = url.trim();
    if (!trimmed) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = trimmed.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?rel=0`;
    }
    return trimmed;
  };

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
      setCurrentIndex((prev) => (prev + 1) % activeProjectsList.length);
    }, 20000);
  }, [clearAutoPlay, activeProjectsList.length, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      startAutoPlay();
    }
    return () => clearAutoPlay();
  }, [startAutoPlay, clearAutoPlay, isMobile, activeTab]);

  const goToNext = useCallback(() => {
    clearAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % activeProjectsList.length);
    startAutoPlay();
  }, [clearAutoPlay, startAutoPlay, activeProjectsList.length]);

  const goToPrev = useCallback(() => {
    clearAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + activeProjectsList.length) % activeProjectsList.length);
    startAutoPlay();
  }, [clearAutoPlay, startAutoPlay, activeProjectsList.length]);

  const goToSlide = useCallback((index) => {
    if (index === currentIndex) return;
    clearAutoPlay();
    setCurrentIndex(index);
    startAutoPlay();
  }, [currentIndex, clearAutoPlay, startAutoPlay]);

  const currentProject = activeProjectsList[currentIndex] || activeProjectsList[0];

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

  // Helper render for Right Side media (Image vs YouTube Video)
  const renderMediaPane = (project) => {
    if (activeTab === 'shopify') {
      const embedUrl = getYouTubeEmbedUrl(project.videoUrl);
      if (embedUrl) {
        return (
          <div className="video-embed-container">
            <iframe
              src={embedUrl}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="youtube-embed-iframe"
            />
          </div>
        );
      }
      return (
        <div className="video-placeholder-container">
          <div className="video-placeholder-inner">
            <div className="youtube-play-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <span className="placeholder-title">Demo Video Walkthrough</span>
            <span className="placeholder-sub">Provide YouTube URL to activate video embed</span>
          </div>
        </div>
      );
    }

    return (
      <a
        href={project.live || project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="project-image-wrapper"
      >
        <ProgressiveImage
          src={project.image}
          alt={project.title}
          fallbackText={project.title}
          aspectRatio="16/10"
        />
      </a>
    );
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <section className="section-card projects-card projects-mobile" id="projects" ref={sectionRef}>
        <div className="projects-container">
          <div className="projects-header-wrapper">
            <span className="section-label">Projects</span>
            <h2 className="section-title">Projects Portfolio</h2>

            {/* Tab Switcher */}
            <div className="projects-tab-switcher">
              <button
                className={`tab-switch-btn ${activeTab === 'selected' ? 'active' : ''}`}
                onClick={() => handleTabChange('selected')}
              >
                Selected Work
              </button>
              <button
                className={`tab-switch-btn ${activeTab === 'shopify' ? 'active' : ''}`}
                onClick={() => handleTabChange('shopify')}
              >
                Shopify Projects
              </button>
            </div>
          </div>

          {/* Mobile Horizontal Scroll Track */}
          <div className="mobile-carousel-container" ref={scrollContainerRef}>
            <div className="mobile-carousel-track">
              {activeProjectsList.map((project) => (
                <div key={project.id} className="mobile-project-card">
                  <div className="mobile-project-image">
                    {renderMediaPane(project)}
                  </div>

                  <div className="mobile-project-content">
                    <span className="project-category">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                    {project.tagline && <p className="project-tagline">{project.tagline}</p>}
                    <p className="project-description">{project.description}</p>

                    {project.bullets && project.bullets.length > 0 && (
                      <ul className="project-bullet-list">
                        {project.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}

                    {project.note && <p className="project-note">{project.note}</p>}

                    <div className="project-tech-stack">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="skill-chip-dark">{tech}</span>
                      ))}
                    </div>

                    {activeTab === 'selected' && (
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
                            Live
                          </a>
                        )}
                      </div>
                    )}
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
        {/* Header and Tab Switcher */}
        <div className="projects-header-wrapper">
          <div className="projects-title-group">
            <span className="section-label">Projects</span>
            <h2 className="section-title">
              {activeTab === 'selected' ? 'Selected Work' : 'Shopify Theme Projects'}
            </h2>
          </div>

          {/* Premium Pill Tab Switcher */}
          <div className="projects-tab-switcher">
            <button
              className={`tab-switch-btn ${activeTab === 'selected' ? 'active' : ''}`}
              onClick={() => handleTabChange('selected')}
            >
              Selected Work
            </button>
            <button
              className={`tab-switch-btn ${activeTab === 'shopify' ? 'active' : ''}`}
              onClick={() => handleTabChange('shopify')}
            >
              Shopify Projects
            </button>
          </div>
        </div>

        <div className="project-carousel-wrapper fade-in">
          {/* Carousel Content */}
          <div className="project-carousel">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${currentIndex}`}
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
                  {currentProject.tagline && (
                    <p className="project-tagline">{currentProject.tagline}</p>
                  )}

                  <p className="project-description">{currentProject.description}</p>

                  {currentProject.bullets && currentProject.bullets.length > 0 && (
                    <ul className="project-bullet-list">
                      {currentProject.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {currentProject.note && (
                    <p className="project-note">{currentProject.note}</p>
                  )}

                  <div className="project-tech-stack">
                    {currentProject.technologies.map((tech, i) => (
                      <span key={i} className="skill-chip-dark">{tech}</span>
                    ))}
                  </div>

                  {activeTab === 'selected' && (
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
                          Live
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Column - Project Media (Image vs YouTube Embed) */}
                {renderMediaPane(currentProject)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Pagination */}
          <div className="carousel-bottom-nav">
            <div className="pagination-dots">
              {activeProjectsList.map((_, index) => (
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
                <span className="total">{String(activeProjectsList.length).padStart(2, '0')}</span>
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