import React, { useState } from 'react';
import '../styles/progressive-image.css';

const ProgressiveImage = ({
  src,
  alt,
  className = '',
  aspectRatio = '16/10',
  fallbackText = 'Loading...'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoaded(true);
    // Set fallback image
    e.target.src = `https://via.placeholder.com/800x600/2a2a2a/888888?text=${encodeURIComponent(fallbackText)}`;
  };

  return (
    <div
      className={`progressive-image-container ${className}`}
      style={{ aspectRatio }}
    >
      {/* Skeleton Loader */}
      <div className={`skeleton-loader ${isLoaded ? 'hidden' : ''}`}>
        <div className="skeleton-pulse"></div>
      </div>

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`progressive-image ${isLoaded ? 'loaded' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default ProgressiveImage;
