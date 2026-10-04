import React, { useState, useEffect, useRef } from 'react';
import ProjectGallery from './ProjectGallery';
import { VideoFacade } from './VideoFacade';

export default function ProjectDrawer({ project, onClose, onPrev, onNext }) {
  const dialogRef = useRef(null);
  const drawerBodyRef = useRef(null);
  const dragStartRef = useRef(null);
  const exitTimerRef = useRef(null);

  // Keep last rendered project during exit transition so sheet doesn't slide down blank
  const [renderedProject, setRenderedProject] = useState(project);

  // Handle open / close transitions with multiple safety nets
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      setRenderedProject(project);
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }

      // Check prefers-reduced-motion: if reduced motion is active, unmount immediately
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        setRenderedProject(null);
      } else {
        // Fallback timer: guarantees renderedProject is cleared even if transitionend never fires
        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
        exitTimerRef.current = setTimeout(() => {
          setRenderedProject(null);
          exitTimerRef.current = null;
        }, 380);
      }
    }

    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
    };
  }, [project]);

  // Cleanly clear renderedProject on transitionend or animationend
  const handleExitAnimationEnd = (e) => {
    if (e.target === dialogRef.current && !project) {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      setRenderedProject(null);
    }
  };

  // Guarded: Reset scroll only on project open/switch, NEVER on drawer close
  useEffect(() => {
    if (project && drawerBodyRef.current) {
      drawerBodyRef.current.scrollTop = 0;
    }
  }, [project?.slug]);

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleTouchStart = (e) => {
    const isDragHandle = e.target.closest('.drawer__drag-handle');
    const isTop = drawerBodyRef.current?.scrollTop <= 0;
    if (isDragHandle || isTop) {
      dragStartRef.current = e.touches[0].clientY;
    } else {
      dragStartRef.current = null;
    }
  };

  const handleTouchEnd = (e) => {
    if (dragStartRef.current === null) return;
    const deltaY = e.changedTouches[0].clientY - dragStartRef.current;
    if (deltaY > 85) {
      onClose();
    }
    dragStartRef.current = null;
  };

  return (
    <dialog
      ref={dialogRef}
      className="project-drawer"
      aria-labelledby="drawer-title"
      onCancel={handleCancel}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTransitionEnd={handleExitAnimationEnd}
      onAnimationEnd={handleExitAnimationEnd}
      data-lenis-prevent
    >
      {renderedProject && (
        <div className="drawer__container">
          <div className="drawer__drag-handle" aria-hidden="true">
            <div className="drag-indicator" />
          </div>

          <header className="drawer__header">
            <div className="drawer__header-meta">
              <span className="drawer__label">{renderedProject.label}</span>
              <h2 id="drawer-title" className="drawer__title">{renderedProject.title}</h2>
            </div>
            <button
              type="button"
              className="drawer__close-btn"
              onClick={onClose}
              aria-label="Close project details (Esc)"
            >
              ✕
            </button>
          </header>

          <div className="drawer__body" ref={drawerBodyRef} data-lenis-prevent>
            {/* key={renderedProject.slug} resets playing video facade & gallery */}
            <div className="drawer__media" key={renderedProject.slug}>
              {renderedProject.videoUrl ? (
                <VideoFacade
                  videoUrl={renderedProject.videoUrl}
                  title={renderedProject.title}
                  caption={renderedProject.videoCaption}
                  customCover={renderedProject.cover}
                  isActive={Boolean(project)}
                />
              ) : renderedProject.gallery ? (
                <ProjectGallery
                  gallery={renderedProject.gallery}
                  hideThumbnails={renderedProject.galleryOptions?.hideThumbnails}
                  hideCounts={renderedProject.galleryOptions?.hideCounts}
                />
              ) : (
                <img
                  src={renderedProject.drawerImage || renderedProject.cover}
                  alt={renderedProject.title}
                  className="drawer__single-img"
                  width="800"
                  height="500"
                />
              )}
            </div>

            <div className="drawer__details">
              {renderedProject.tagline && <p className="drawer__tagline">{renderedProject.tagline}</p>}
              <p className="drawer__description">{renderedProject.description}</p>

              {renderedProject.bullets?.length > 0 && (
                <ul className="drawer__bullet-list">
                  {renderedProject.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}

              <div className="drawer__chips">
                {renderedProject.technologies.map((tech) => (
                  <span key={tech} className="skill-chip-dark">{tech}</span>
                ))}
              </div>

              {(renderedProject.links?.github || renderedProject.links?.live) && (
                <div className="drawer__actions">
                  {renderedProject.links.github && (
                    <a
                      href={renderedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn btn-source"
                    >
                      {renderedProject.links.githubLabel || 'Source Code'}
                    </a>
                  )}
                  {renderedProject.links.live && (
                    <a
                      href={renderedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn live-btn"
                    >
                      {renderedProject.links.liveLabel || 'Live Demo'}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <footer className="drawer__footer">
            <button type="button" className="drawer__nav-btn" onClick={onPrev}>
              ← Previous Project
            </button>
            <button type="button" className="drawer__nav-btn" onClick={onNext}>
              Next Project →
            </button>
          </footer>
        </div>
      )}
    </dialog>
  );
}
