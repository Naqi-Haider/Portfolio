import React, { useState, useEffect } from 'react';
import '../styles/love-counter.css';

const LoveCounter = () => {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY = 'naqi_portfolio_liked_v1';
  const API_NAMESPACE = 'naqi-portfolio-prod';
  const API_KEY = 'likes-v1';

  // Check localStorage and fetch count on mount
  useEffect(() => {
    // Check if user has already liked
    const liked = localStorage.getItem(STORAGE_KEY);
    if (liked === 'true') {
      setHasLiked(true);
    }

    // Fetch current count (GET only, no increment)
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      // Use 'get' endpoint to fetch without incrementing
      const response = await fetch(
        `https://api.countapi.xyz/get/${API_NAMESPACE}/${API_KEY}`
      );
      const data = await response.json();

      if (data && data.value !== undefined && data.value !== null) {
        setCount(data.value);
      } else {
        // If key doesn't exist, create it with initial value 0
        await createCounter();
      }
    } catch (error) {
      console.log('CountAPI unavailable - starting at 0');
      setCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const createCounter = async () => {
    try {
      // Create a new counter starting at 0
      const response = await fetch(
        `https://api.countapi.xyz/create?namespace=${API_NAMESPACE}&key=${API_KEY}&value=0`
      );
      const data = await response.json();
      if (data && data.value !== undefined) {
        setCount(data.value);
      }
    } catch (error) {
      console.log('Failed to create counter');
      setCount(0);
    }
  };

  const incrementCount = async () => {
    // Prevent re-voting
    if (hasLiked) return;

    setIsAnimating(true);
    setHasLiked(true);
    localStorage.setItem(STORAGE_KEY, 'true');

    try {
      // Call 'hit' endpoint to increment
      const response = await fetch(
        `https://api.countapi.xyz/hit/${API_NAMESPACE}/${API_KEY}`
      );
      const data = await response.json();

      if (data && data.value !== undefined) {
        // Update UI with actual server count
        setCount(data.value);
      } else {
        // Optimistic update if API doesn't return value
        setCount(prev => prev + 1);
      }
    } catch (error) {
      console.log('Failed to update count - applying local increment');
      setCount(prev => prev + 1);
    }

    // Reset animation
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <section className="love-counter-section">
      <div className="love-counter-container">
        <p className="love-counter-text">
          If you enjoyed this portfolio, show some love!
        </p>

        <button
          className={`love-button ${hasLiked ? 'liked' : ''} ${isAnimating ? 'animating' : ''}`}
          onClick={incrementCount}
          disabled={hasLiked}
          aria-label={hasLiked ? 'Already liked' : 'Like this portfolio'}
        >
          <span className="heart-icon">
            {hasLiked ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            )}
          </span>
          <span className="count-number">
            {isLoading ? '...' : count.toLocaleString()}
          </span>
        </button>

        {hasLiked && (
          <p className="thank-you-text">Thank you for your support! 💛</p>
        )}
      </div>
    </section>
  );
};

export default LoveCounter;
