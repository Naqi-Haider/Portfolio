import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

const ProjectGallery = ({ gallery, onInteraction }) => {
  // Extract unique groups and group labels dynamically
  const groups = useMemo(() => {
    const unique = [];
    gallery.forEach((item) => {
      const g = item.group || 'default';
      if (!unique.includes(g)) {
        unique.push(g);
      }
    });
    return unique;
  }, [gallery]);

  // Initial group: default to first item's group or 'doctor' if present
  const initialGroup = useMemo(() => {
    if (groups.includes('doctor')) return 'doctor';
    return groups[0] || 'default';
  }, [groups]);

  const [activeTab, setActiveTab] = useState(initialGroup);

  // Initial screenshot: default to id: 1 (Doctor Overview for NeuroHaven, Clinician Portal for CogDrift)
  const initialImageId = useMemo(() => {
    const hasOne = gallery.find((item) => item.id === 1);
    if (hasOne) return 1;
    return gallery[0]?.id ?? 0;
  }, [gallery]);

  const [activeImageId, setActiveImageId] = useState(initialImageId);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Sync active tab/image if gallery changes (e.g. carousel slide change)
  useEffect(() => {
    setActiveTab(initialGroup);
    setActiveImageId(initialImageId);
  }, [gallery, initialGroup, initialImageId]);

  const visibleScreenshots = useMemo(() => {
    if (groups.length <= 1) return gallery;
    return gallery.filter((item) => (item.group || 'default') === activeTab);
  }, [gallery, activeTab, groups]);

  const activeScreenshot = useMemo(() => {
    return gallery.find((item) => item.id === activeImageId) || visibleScreenshots[0] || gallery[0];
  }, [gallery, activeImageId, visibleScreenshots]);

  // Tab switching
  const handleTabChange = (groupKey) => {
    setActiveTab(groupKey);
    if (onInteraction) onInteraction();
    const itemsInGroup = gallery.filter((item) => (item.group || 'default') === groupKey);
    if (itemsInGroup.length > 0) {
      setActiveImageId(itemsInGroup[0].id);
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
    if (nextItem.group && nextItem.group !== activeTab) {
      setActiveTab(nextItem.group);
    }
  }, [gallery, activeImageId, activeTab]);

  const goToPrevLightbox = useCallback(() => {
    const currentIndex = gallery.findIndex((item) => item.id === activeImageId);
    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    const prevItem = gallery[prevIndex];
    setActiveImageId(prevItem.id);
    if (prevItem.group && prevItem.group !== activeTab) {
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
      {/* Sub-tabs if multiple groups exist */}
      {groups.length > 1 && (
        <div className="gallery-subtabs">
          {groups.map((groupKey) => {
            const count = gallery.filter((item) => (item.group || 'default') === groupKey).length;
            const item = gallery.find((item) => (item.group || 'default') === groupKey);
            const label = item?.groupLabel || (groupKey.charAt(0).toUpperCase() + groupKey.slice(1));
            return (
              <button
                key={groupKey}
                type="button"
                className={`gallery-subtab-btn ${activeTab === groupKey ? 'active' : ''}`}
                onClick={() => handleTabChange(groupKey)}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Main Preview with Click to Enlarge */}
      <div
        className="gallery-preview-wrapper"
        onClick={openLightbox}
        role="button"
        tabIndex={0}
        aria-label="Click to enlarge screenshot in full-screen theater lightbox"
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

      {/* Full-Screen Theater Mode Lightbox via React Portal */}
      {isLightboxOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="gallery-lightbox-overlay theater-mode"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot Fullscreen Lightbox"
        >
          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Lightbox Header Bar */}
            <div className="lightbox-header">
              <div className="lightbox-title-group">
                <span className="lightbox-group-badge">
                  {activeScreenshot.groupLabel || (activeScreenshot.group === 'doctor' ? 'Doctor Dashboard' : 'Admin Console')}
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
                      if (item.group && item.group !== activeTab) setActiveTab(item.group);
                    }}
                    aria-label={`Jump to slide ${idx + 1}: ${item.title}`}
                  >
                    <img src={item.image} alt={item.title} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProjectGallery;
