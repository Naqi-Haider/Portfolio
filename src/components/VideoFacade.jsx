import React, { useState, useEffect } from 'react';

/**
 * Robust YouTube embed ID parser supporting youtu.be, shorts, embed, and watch queries
 */
export function getYouTubeEmbedId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

export function VideoFacade({ videoUrl, title, caption, customCover, isActive = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedId = getYouTubeEmbedId(videoUrl);

  // If the drawer is closing or project is deactivated, stop playing immediately
  useEffect(() => {
    if (!isActive) {
      setIsPlaying(false);
    }
  }, [isActive]);

  if (!embedId) return null;

  const defaultThumb = `https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`;
  const fallbackThumb = `https://img.youtube.com/vi/${embedId}/hqdefault.jpg`;

  if (!isPlaying) {
    return (
      <div className="shopify-video-pane">
        <button
          type="button"
          className="video-facade-btn"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play demonstration video for ${title}`}
        >
          <img
            src={customCover || defaultThumb}
            alt={title}
            className="facade-thumb"
            width="480"
            height="360"
            loading="lazy"
            onError={(e) => {
              if (e.target.src !== fallbackThumb) {
                e.target.src = fallbackThumb;
              }
            }}
          />
          <div className="facade-play-badge" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
        {caption && (
          <p className="shopify-video-caption">
            <em>{caption}</em>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="shopify-video-pane">
      <div className="video-embed-container">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="youtube-embed-iframe"
        />
      </div>
      {caption && (
        <p className="shopify-video-caption">
          <em>{caption}</em>
        </p>
      )}
    </div>
  );
}

export default VideoFacade;
