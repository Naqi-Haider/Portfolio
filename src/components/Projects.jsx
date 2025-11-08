import React, { useEffect, useRef } from 'react';
import '../styles/projects.css';

const Projects = () => {
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

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const projectsData = [
    {
      id: 1,
      title: 'YouTube Clone',
      description: 'A fully functional YouTube clone built with modern web technologies. Features include video playback, search functionality, responsive design, and a clean user interface mimicking YouTube\'s layout.',
      image: 'https://www.researchgate.net/publication/376956293/figure/fig3/AS:11431281217094493@1705029863831/YouTube-homepage-for-User-A-trained-with-positive-video-set.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Naqi-Haider/youtube-clone',
      live: '#'
    },
    {
      id: 2,
      title: 'Movie Ticket Booking System',
      description: 'A comprehensive movie ticket booking system developed in C++. Includes features for browsing movies, selecting seats, booking tickets, and managing reservations with a command-line interface.',
      image: '../public/assets/Movie-Ticket-Booking-System.png', // Cinema theme
      technologies: ['C++', 'OOP', 'Data Structures'],
      github: 'https://github.com/Naqi-Haider/movie-ticket-booking',
      live: '#'
    },
    {
      id: 3,
      title: 'Amazon RawJS',
      description: 'An Amazon e-commerce clone built with vanilla JavaScript. Features product listings, shopping cart functionality, user authentication, and a complete checkout process without using any frameworks.',
      image: '../public/assets/JavaScript Amazon RawJS Clone.png', // Shopping/ecommerce theme
      technologies: ['JavaScript', 'HTML', 'CSS', 'Local Storage'],
      github: 'https://github.com/Naqi-Haider/amazon-rawjs',
      live: '#'
    },
    {
      id: 4,
      title: 'Shopify Store Clone',
      description: 'A complete Shopify store clone featuring product catalogs, shopping cart, checkout process, and admin dashboard. Built with modern web technologies and responsive design principles.',
      image: '../public/assets/JonesRoadClone.png', // Online store theme
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/Naqi-Haider/shopify-store-clone',
      live: '#'
    }
  ];

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title fade-in">Projects & Work</h2>

        {/* Projects Grid - Large Cards */}
        <div className="projects-grid-large">
          {projectsData.map((project, index) => (
            <article 
              key={project.id} 
              className="project-card-large fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image-large">
                <img src={project.image} alt={project.title} />
              </div>
              
              <div className="project-content-large">
                <h3 className="project-title-large">{project.title}</h3>
                <p className="project-description-large">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* GitHub Contributions Section */}
        <div className="github-section fade-in">
          <h3 className="github-title">
            <span className="github-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </span>
            GitHub Contributions
          </h3>
          
          <div className="github-stats-compact">
            <div className="github-stat-compact">
              <div className="stat-number-compact">4</div>
              <div className="stat-label-compact">Public Repos</div>
            </div>
            <div className="github-stat-compact">
              <div className="stat-number-compact">1</div>
              <div className="stat-label-compact">Followers</div>
            </div>
            <div className="github-stat-compact">
              <div className="stat-number-compact">5</div>
              <div className="stat-label-compact">Following</div>
            </div>
            <div className="github-stat-compact">
              <div className="stat-number-compact">2023</div>
              <div className="stat-label-compact">Joined</div>
            </div>
          </div>

          {/* GitHub Native Calendar - Exact Match */}
          <div className="github-graph">
            <img 
              src="https://ghchart.rshah.org/39d353/Naqi-Haider" 
              alt="GitHub Contributions Graph"
              className="contributions-graph-native"
            />
          </div>

          <a 
            href="https://github.com/Naqi-Haider" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn github-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Visit My GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;