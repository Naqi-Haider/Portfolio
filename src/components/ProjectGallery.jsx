import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

export default function ProjectGallery({
  gallery,
  onInteraction,
  hideThumbnails = false,
  hideCounts = false
}) {
  const lightboxRef = useRef(null);

  const groups = useMemo(() => {
    const unique = [];
    gallery.forEach((item) => {
      const g = item.group || 'default';
      if (!unique.includes(g)) unique.push(g);
    });
    return unique;
  }, [gallery]);

  const isSinglePerGroup = useMemo(() => {
    return groups.every((g) => gallery.filter((i) => (i.group || 'default') === g).length === 1);
  }, [gallery, groups]);

  const shouldHideCounts = hideCounts || isSinglePerGroup;
  const shouldHideThumbnails = hideThumbnails || isSinglePerGroup;

  const initialGroup = useMemo(() => (groups.includes('doctor') ? 'doctor' : groups[0] || 'default'), [groups]);
  const [activeTab, setActiveTab] = useState(initialGroup);

  const initialImageId = useMemo(() => {
    return gallery[0]?.id ?? 0;
  }, [gallery]);

  const [activeImageId, setActiveImageId] = useState(initialImageId);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Sync state if gallery changes
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

  const openLightbox = () => {
    setIsLightboxOpen(true);
    lightboxRef.current?.showModal();
    if (onInteraction) onInteraction();
  };

  const closeLightbox = useCallback(() => {
    if (lightboxRef.current?.open) {
      lightboxRef.current.close();
    }
    setIsLightboxOpen(false);
  }, []);

  // Cleanup on unmount so lightbox never lingers in top-layer
  useEffect(() => {
    return () => {
      if (lightboxRef.current?.open) {
        lightboxRef.current.close();
      }
    };
  }, []);

  // Handle Esc key on the lightbox without bubbling to the drawer
  const handleLightboxCancel = (e) => {
    e.stopPropagation();
    closeLightbox();
  };

  const goToNextLightbox = useCallback(() => {
    const currentIndex = gallery.findIndex((item) => item.id === activeImageId);
    const nextIndex = (currentIndex + 1) % gallery.length;
    const nextItem = gallery[nextIndex];
    setActiveImageId(nextItem.id);
    if (nextItem.group && nextItem.group !== activeTab) setActiveTab(nextItem.group);
  }, [gallery, activeImageId, activeTab]);

  const goToPrevLightbox = useCallback(() => {
    const currentIndex = gallery.findIndex((item) => item.id === activeImageId);
    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    const prevItem = gallery[prevIndex];
    setActiveImageId(prevItem.id);
    if (prevItem.group && prevItem.group !== activeTab) setActiveTab(prevItem.group);
  }, [gallery, activeImageId, activeTab]);

  // Restored keyboard arrow navigation when Lightbox is active
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.stopPropagation();
        goToNextLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        goToPrevLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, goToNextLightbox, goToPrevLightbox]);

  const currentGalleryIndex = gallery.findIndex((item) => item.id === activeImageId);

  return (
    <div className="gallery-pane-container">
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
                onClick={() => {
                  setActiveTab(groupKey);
                  const itemsInGroup = gallery.filter((i) => (i.group || 'default') === groupKey);
                  if (itemsInGroup.length > 0) setActiveImageId(itemsInGroup[0].id);
                  if (onInteraction) onInteraction();
                }}
              >
                {label}{shouldHideCounts ? '' : ` (${count})`}
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
        <div className="gallery-preview-overlay">
          <div className="gallery-zoom-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <span>Click to enlarge</span>
          </div>
        </div>
      </div>

      <div className="gallery-caption-wrapper">
        <p className="gallery-caption-text">&ldquo;{activeScreenshot.caption}&rdquo;</p>
      </div>

      {!shouldHideThumbnails && visibleScreenshots.length > 1 && (
        <div className="gallery-thumbnails-strip" role="tablist" aria-label="Screenshot thumbnails">
          {visibleScreenshots.map((item) => {
            const isSelected = item.id === activeImageId;
            return (
              <button
                key={item.id}
                type="button"
                className={`gallery-thumb-btn ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  setActiveImageId(item.id);
                  if (onInteraction) onInteraction();
                }}
                aria-label={`View ${item.title}`}
                aria-selected={isSelected}
              >
                <img src={item.image} alt={item.title} className="gallery-thumb-img" />
                <span className="gallery-thumb-label">{item.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Native Dialog Lightbox (Stacks in Top-Layer Above Drawer) */}
      <dialog
        ref={lightboxRef}
        className="gallery-lightbox-dialog"
        onCancel={handleLightboxCancel}
        onClick={(e) => e.target === lightboxRef.current && closeLightbox()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
          <div className="lightbox-header">
            <div className="lightbox-title-group">
              <span className="lightbox-group-badge">{activeScreenshot.groupLabel}</span>
              {!shouldHideCounts && (
                <span className="lightbox-counter">
                  {currentGalleryIndex + 1} / {gallery.length}
                </span>
              )}
            </div>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close Lightbox (Esc)"
            >
              ✕ <span className="lightbox-esc-hint">Esc</span>
            </button>
          </div>

          <div className="lightbox-stage">
            <button
              type="button"
              className="lightbox-arrow prev"
              onClick={goToPrevLightbox}
              aria-label="Previous image (Left Arrow)"
            >
              ‹
            </button>
            <img src={activeScreenshot.image} alt={activeScreenshot.title} className="lightbox-main-img" />
            <button
              type="button"
              className="lightbox-arrow next"
              onClick={goToNextLightbox}
              aria-label="Next image (Right Arrow)"
            >
              ›
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
