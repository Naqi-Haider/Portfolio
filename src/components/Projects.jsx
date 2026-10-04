import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PROJECTS_DATA } from '../data/projects';
import ProjectDrawer from './ProjectDrawer';
import '../styles/projects.css';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedSlug, setSelectedSlug] = useState(null);

  const cardRefs = useRef({});
  const lastOpenedSlugRef = useRef(null);

  // Dynamically derive filter categories from data tags
  const filterCategories = useMemo(() => {
    const tags = new Set();
    PROJECTS_DATA.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, []);

  // Filter grid items
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.tags.includes(activeFilter));
  }, [activeFilter]);

  // Listen for custom tab switch events (e.g. from Hero buttons)
  useEffect(() => {
    const handleSwitchProjectsTab = (e) => {
      const tab = e.detail;
      if (tab === 'shopify' || tab === 'Shopify') {
        setActiveFilter('Shopify');
      } else if (tab === 'selected' || tab === 'All' || tab === 'all') {
        setActiveFilter('All');
      } else if (tab && filterCategories.includes(tab)) {
        setActiveFilter(tab);
      }
    };

    window.addEventListener('switch-projects-tab', handleSwitchProjectsTab);
    return () => window.removeEventListener('switch-projects-tab', handleSwitchProjectsTab);
  }, [filterCategories]);

  const selectedProject = useMemo(() => {
    return PROJECTS_DATA.find((p) => p.slug === selectedSlug) || null;
  }, [selectedSlug]);

  // Direct load deep linking & popstate handling
  useEffect(() => {
    const handleLocationChange = () => {
      const match = window.location.hash.match(/^#project\/([a-z0-9-]+)$/);
      if (match) {
        const found = PROJECTS_DATA.find((p) => p.slug === match[1]);
        if (found) {
          setSelectedSlug(match[1]);
          lastOpenedSlugRef.current = match[1];
        } else {
          // Reject invalid slug without opening drawer
          setSelectedSlug(null);
        }
      } else {
        setSelectedSlug(null);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Return focus to originating card when drawer closes (safari-safe)
  useEffect(() => {
    if (!selectedSlug && lastOpenedSlugRef.current) {
      cardRefs.current[lastOpenedSlugRef.current]?.focus();
      lastOpenedSlugRef.current = null;
    }
  }, [selectedSlug]);

  const openProject = (slug) => {
    lastOpenedSlugRef.current = slug;
    window.history.pushState({ projectSlug: slug, drawerPushed: true }, '', `#project/${slug}`);
    setSelectedSlug(slug);
  };

  const closeProject = () => {
    if (window.history.state?.drawerPushed === true) {
      window.history.back(); // Naturally triggers popstate and clears selectedSlug
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setSelectedSlug(null); // replaceState does not fire popstate
    }
  };

  // Prev / Next always iterates through canonical PROJECTS_DATA list
  const handleNavigate = (direction) => {
    const currentIndex = PROJECTS_DATA.findIndex((p) => p.slug === selectedSlug);
    if (currentIndex === -1) return;

    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % PROJECTS_DATA.length
        : (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;

    const nextSlug = PROJECTS_DATA[nextIndex].slug;
    const wasPushed = Boolean(window.history.state?.drawerPushed);

    window.history.replaceState(
      { projectSlug: nextSlug, drawerPushed: wasPushed },
      '',
      `#project/${nextSlug}`
    );
    setSelectedSlug(nextSlug);
    lastOpenedSlugRef.current = nextSlug;
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-header-wrapper">
          <div className="projects-title-group">
            <h2 className="section-title">Selected Work</h2>
            <p className="projects-subtitle">Full-stack systems, custom ecommerce features, and utilities.</p>
          </div>

          {/* Dynamic Filter Chips */}
          <div className="filter-chips-container" role="group" aria-label="Filter projects">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-chip ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <a
              key={project.slug}
              href={`#project/${project.slug}`}
              ref={(el) => (cardRefs.current[project.slug] = el)}
              className={`project-card ${project.featured ? 'featured-card' : ''} ${project.wide ? 'wide-card' : ''}`}
              onClick={(e) => {
                // Allow Cmd/Ctrl/Shift/Middle click to open natively in new tab
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                openProject(project.slug);
              }}
            >
              <div className="card-media">
                <img
                  src={project.cover}
                  alt={project.coverAlt}
                  width="480"
                  height="300"
                  loading="lazy"
                  onError={(e) => {
                    if (project.coverFallback && e.target.src !== project.coverFallback) {
                      e.target.src = project.coverFallback;
                    }
                  }}
                />
                <div className="card-hover-cue" aria-hidden="true">
                  <span>View details →</span>
                </div>
              </div>
              <div className="card-meta">
                <span className="card-label">{project.label}</span>
                <h3 className="card-title">{project.shortTitle ?? project.title}</h3>
                <p className="card-tagline">{project.tagline}</p>
                <div className="card-chips">
                  {project.techStackPreview.map((tech) => (
                    <span key={tech} className="skill-chip-compact">{tech}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}

          {/* Render GitHub tile ONLY when filtering by Game */}
          {activeFilter === 'Game' && (
            <a
              href="https://github.com/Naqi-Haider?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card github-more-card"
            >
              <div className="github-card-content">
                <div className="github-icon-bubble" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <span className="card-label">Open Source</span>
                <h3 className="card-title">More on GitHub</h3>
                <p className="card-tagline">Explore additional repositories, coursework, and early experiments on GitHub.</p>
                <span className="github-card-link">View Naqi-Haider Repositories →</span>
              </div>
            </a>
          )}
        </div>
      </div>

      <ProjectDrawer
        project={selectedProject}
        onClose={closeProject}
        onPrev={() => handleNavigate('prev')}
        onNext={() => handleNavigate('next')}
      />
    </section>
  );
}