import React, { useState, useEffect, useCallback } from 'react';

const ProjectGallery = ({ gallery, onInteraction }) => {
  const [activeTab, setActiveTab] = useState('doctor'); // 'doctor' | 'admin'
  // Default to the Doctor Overview screenshot (id: 1)
  const [activeImageId, setActiveImageId] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Group items
  const doctorScreenshots = gallery.filter((item) => item.group === 'doctor');
  const adminScreenshots = gallery.filter((item) => item.group === 'admin');

  const visibleScreenshots = activeTab === 'doctor' ? doctorScreenshots : adminScreenshots;

  const activeScreenshot = gallery.find((item) => item.id === activeImageId) || gallery[1] || gallery[0];

  // Handle Tab Change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onInteraction) onInteraction();
    if (tab === 'doctor') {
      // Default to Doctor Overview (id: 1) when switching to Doctor
      setActiveImageId(1);
    } else {
      // Default to first admin screen (id: 6)
      if (adminScreenshots.length > 0) {
        setActiveImageId(adminScreenshots[0].id);
      }
    }
  };

  const handleSelectImage = (id) => {
    setActiveImageId(id);
    if (onInteraction) onInteraction();
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
    if (onInteraction) onInteraction();
  };

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const goToNextLightbox = useCallback(() => {
    const currentIndex = gallery.findIndex((item) => item.id === activeImageId);
    const nextIndex = (currentIndex + 1) % gallery.length;
    const nextItem = gallery[nextIndex];
    setActiveImageId(nextItem.id);
    if (nextItem.group !== activeTab) {
      setActiveTab(nextItem.group);
    }
  }, [gallery, activeImageId, activeTab]);

  const goToPrevLightbox = useCallback(() => {
    const currentIndex = gallery.findIndex((item) => item.id === activeImageId);
    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    const prevItem = gallery[prevIndex];
    setActiveImageId(prevItem.id);
    if (prevItem.group !== activeTab) {
      setActiveTab(prevItem.group);
    }
  }, [gallery, activeImageId, activeTab]);

  // Keyboard navigation & body scroll lock for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        goToNextLightbox();
      } else if (e.key === 'ArrowLeft') {
        goToPrevLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, closeLightbox, goToNextLightbox, goToPrevLightbox]);

  const currentGalleryIndex = gallery.findIndex((item) => item.id === activeImageId);

  return (
    <div className="gallery-pane-container">
      {/* Sub-tabs: Doctor (n) and Admin (n) */}
      <div className="gallery-subtabs">
        <button
          type="button"
          className={`gallery-subtab-btn ${activeTab === 'doctor' ? 'active' : ''}`}
          onClick={() => handleTabChange('doctor')}
        >
          Doctor ({doctorScreenshots.length})
        </button>
        <button
          type="button"
          className={`gallery-subtab-btn ${activeTab === 'admin' ? 'active' : ''}`}
          onClick={() => handleTabChange('admin')}
        >
          Admin ({adminScreenshots.length})
        </button>
      </div>

      {/* Main Preview with Click to Enlarge */}
      <div
        className="gallery-preview-wrapper"
        onClick={openLightbox}
        role="button"
        tabIndex={0}
        aria-label="Click to enlarge screenshot in full-screen lightbox"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox();
          }
        }}
      >
        <img
          src={activeScreenshot.image}
          alt={activeScreenshot.title}
          className="gallery-preview-img"
          loading="eager"
        />

        {/* Zoom Overlay Indicator */}
        <div className="gallery-preview-overlay">
          <div className="gallery-zoom-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <span>Click to enlarge</span>
          </div>
        </div>
      </div>

      {/* One-line Caption Under Preview */}
      <div className="gallery-caption-wrapper">
        <p className="gallery-caption-text">
          &ldquo;{activeScreenshot.caption}&rdquo;
        </p>
      </div>

      {/* Thumbnail Strip */}
      <div className="gallery-thumbnails-strip" role="tablist" aria-label="Screenshot thumbnails">
        {visibleScreenshots.map((item) => {
          const isSelected = item.id === activeImageId;
          return (
            <button
              key={item.id}
              type="button"
              className={`gallery-thumb-btn ${isSelected ? 'active' : ''}`}
              onClick={() => handleSelectImage(item.id)}
              aria-label={`View ${item.title}`}
              aria-selected={isSelected}
            >
              <img src={item.image} alt={item.title} className="gallery-thumb-img" />
              <span className="gallery-thumb-label">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="gallery-lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot Lightbox"
        >
          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Lightbox Header Bar */}
            <div className="lightbox-header">
              <div className="lightbox-title-group">
                <span className="lightbox-group-badge">
                  {activeScreenshot.group === 'doctor' ? 'Doctor Dashboard' : 'Admin Console'}
                </span>
                <span className="lightbox-counter">
                  {currentGalleryIndex + 1} / {gallery.length}
                </span>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close Lightbox (Esc)"
              >
                <span>✕</span>
                <span className="lightbox-esc-hint">Esc</span>
              </button>
            </div>

            {/* Lightbox Image Viewport */}
            <div className="lightbox-viewport">
              <button
                type="button"
                className="lightbox-nav-btn prev"
                onClick={goToPrevLightbox}
                aria-label="Previous screenshot"
              >
                ‹
              </button>

              <div className="lightbox-image-container">
                <img
                  src={activeScreenshot.image}
                  alt={activeScreenshot.title}
                  className="lightbox-active-img"
                />
              </div>

              <button
                type="button"
                className="lightbox-nav-btn next"
                onClick={goToNextLightbox}
                aria-label="Next screenshot"
              >
                ›
              </button>
            </div>

            {/* Lightbox Caption & Thumbnails Scrub */}
            <div className="lightbox-footer">
              <p className="lightbox-caption">&ldquo;{activeScreenshot.caption}&rdquo;</p>
              <div className="lightbox-strip">
                {gallery.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`lightbox-mini-thumb ${item.id === activeImageId ? 'active' : ''}`}
                    onClick={() => {
                      setActiveImageId(item.id);
                      if (item.group !== activeTab) setActiveTab(item.group);
                    }}
                    aria-label={`Jump to slide ${idx + 1}`}
                  >
                    <img src={item.image} alt={item.title} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
